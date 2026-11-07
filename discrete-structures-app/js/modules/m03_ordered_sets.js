/**
 * Module 3: Tartiblangan to'plamlar. Kortejlar. Xasse diagrammasi.
 */
const Module03 = {
  id: 'm03',
  title: "3. Tartiblangan to'plamlar va Xasse diagrammasi",
  shortTitle: "3. Tartiblangan to'plamlar",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Tartiblangan to'plamlar, Kortejlar va Xasse Diagrammasi</h2>
          <p>Kortejlar, leksikografik tartib, qisman tartiblangan to'plamlar (Poset), bo'linish munosabati va qism-to'plamlar panjarasi bo'yicha Xasse diagrammasini chizing hamda minimal, maksimal, eng katta va eng kichik elementlarni aniqlang.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-purple">Poset (Xasse)</span>
          <span class="badge badge-cyan">Panjara (Lattice)</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module03.switchTab('hasse')">🌳 Xasse Diagrammasi & Poset</button>
        <button class="tab-btn" onclick="Module03.switchTab('tuples')">📦 Kortejlar va Dekart Ko'paytma</button>
        <button class="tab-btn" onclick="Module03.switchTab('theory')">📖 Nazariya va Qoidalar</button>
      </div>

      <!-- Tab 1: Hasse & Poset -->
      <div id="m03-tab-hasse" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #a855f7;">Poset va Munosabat sozlamalari</h3>

            <div class="form-group">
              <label class="form-label">Misol turini tanlang:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module03.loadPreset('div12')">D₁₂ (12 ning bo'luvchilari)</span>
                <span class="preset-pill" onclick="Module03.loadPreset('div24')">D₂₄ (24 ning bo'luvchilari)</span>
                <span class="preset-pill" onclick="Module03.loadPreset('div30')">D₃₀ (30 ning bo'luvchilari)</span>
                <span class="preset-pill" onclick="Module03.loadPreset('div36')">D₃₆ (36 ning bo'luvchilari)</span>
                <span class="preset-pill" onclick="Module03.loadPreset('powerset')">P({a, b, c}) Qism-to'plamlar</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Elementlar to'plami:
                <span class="form-hint">Vergul bilan ajrating</span>
              </label>
              ${typeof SymbolHelper !== 'undefined' ? SymbolHelper.getToolbarHtml('m03-elements', 'relations') : ''}
              <input type="text" id="m03-elements" class="glass-input" value="1, 2, 3, 4, 6, 12">
            </div>

            <div class="form-group">
              <label class="form-label">Munosabat turi:</label>
              <select id="m03-rel-type" class="glass-input" onchange="Module03.calculateHasse()">
                <option value="divisibility">Bo'linish munosabati (a | b, a soni b ni bo'ladi)</option>
                <option value="subset">To'plam osti munosabati (A ⊆ B)</option>
                <option value="lessEqual">Kichik yoki teng (a ≤ b sonlar)</option>
              </select>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module03.calculateHasse()" style="width: 100%;">
              ✨ Xasse Diagrammasini Qurish
            </button>
          </div>

          <!-- Canvas & Properties -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="canvas-wrapper">
              <div class="canvas-toolbar">
                <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Xasse Diagrammasi</span>
                <span class="badge badge-primary">Qatlamlar bo'yicha</span>
              </div>
              <canvas id="m03-hasse-canvas" class="canvas-area" style="height: 360px;"></canvas>
            </div>

            <div id="m03-properties" class="solution-box">
              <!-- Properties populated here -->
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Tuples -->
      <div id="m03-tab-tuples" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #38bdf8;">Kortejlar va Leksikografik Tartiblash</h3>
          <div class="form-group">
            <label class="form-label">To'plam A:
              <span class="form-hint">Masalan: 1, 2, 3</span>
            </label>
            <input type="text" id="m03-tuple-a" class="glass-input" value="0, 1">
          </div>
          <div class="form-group">
            <label class="form-label">Daraja n (Aⁿ kortejlar):</label>
            <input type="number" id="m03-tuple-n" class="glass-input" value="3" min="1" max="5">
          </div>
          <button class="glass-btn glass-btn-primary" onclick="Module03.generateTuples()">
            🚀 Barcha kortejlarni leksikografik hosil qilish
          </button>
          <div id="m03-tuple-results" style="margin-top: 16px;"></div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m03-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Qisman tartiblangan to'plam (Poset)</div>
          <div class="theory-body">
            A to'plamdagi R munosabat quyidagi 3 shartni bajarsa, qisman tartib deyiladi:
            <ul>
              <li><strong>Refleksivlik:</strong> ∀a ∈ A: (a, a) ∈ R</li>
              <li><strong>Antisimetriklik:</strong> (a, b) ∈ R va (b, a) ∈ R bo'lsa, a = b</li>
              <li><strong>Tranzitivlik:</strong> (a, b) ∈ R va (b, c) ∈ R bo'lsa, (a, c) ∈ R</li>
            </ul>
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Xasse diagrammasi nima?</div>
          <div class="theory-body">
            Xasse diagrammasi — qisman tartib munosabatining soddalashtirilgan graf tasviri:
            <ul>
              <li>Refleksiv halqalar (a, a) chizilmaydi.</li>
              <li>Tranzitiv yo'llar (a < b va b < c bo'lsa, a < c) to'g'ridan-to'g'ri chizilmaydi (qisqartiriladi).</li>
              <li>Agar a < b bo'lsa, b elementi a dan YUQORIDA joylashtiriladi va orasi chiziq bilan tutashtiriladi.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.calculateHasse();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m03-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m03-tab-${tabId}`).classList.add('active');
    if (tabId === 'hasse') {
      setTimeout(() => this.drawHasse(), 50);
    }
  },

  loadPreset(preset) {
    if (preset === 'div12') {
      document.getElementById('m03-elements').value = "1, 2, 3, 4, 6, 12";
      document.getElementById('m03-rel-type').value = "divisibility";
    } else if (preset === 'div24') {
      document.getElementById('m03-elements').value = "1, 2, 3, 4, 6, 8, 12, 24";
      document.getElementById('m03-rel-type').value = "divisibility";
    } else if (preset === 'div30') {
      document.getElementById('m03-elements').value = "1, 2, 3, 5, 6, 10, 15, 30";
      document.getElementById('m03-rel-type').value = "divisibility";
    } else if (preset === 'div36') {
      document.getElementById('m03-elements').value = "1, 2, 3, 4, 6, 9, 12, 18, 36";
      document.getElementById('m03-rel-type').value = "divisibility";
    } else if (preset === 'powerset') {
      document.getElementById('m03-elements').value = "∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}";
      document.getElementById('m03-rel-type').value = "subset";
    }
    this.calculateHasse();
  },

  calculateHasse() {
    const rawElements = document.getElementById('m03-elements').value;
    const relType = document.getElementById('m03-rel-type').value;
    let elements = MathUtils.parseSet(rawElements);

    if (elements.length === 0) return;

    // Build pairs based on relation
    const pairs = [];
    if (relType === 'divisibility') {
      const numElements = elements.map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
      elements = numElements.map(String);
      for (const a of numElements) {
        for (const b of numElements) {
          if (b % a === 0) {
            pairs.push([String(a), String(b)]);
          }
        }
      }
    } else if (relType === 'subset') {
      const parseSubset = (s) => {
        if (s === '∅') return new Set();
        return new Set(s.replace(/[{}]/g, '').split(',').map(x => x.trim()).filter(Boolean));
      };
      for (const a of elements) {
        const setA = parseSubset(a);
        for (const b of elements) {
          const setB = parseSubset(b);
          let isSub = true;
          for (const item of setA) {
            if (!setB.has(item)) { isSub = false; break; }
          }
          if (isSub) pairs.push([a, b]);
        }
      }
    } else {
      // lessEqual
      const numElements = elements.map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
      elements = numElements.map(String);
      for (let i = 0; i < elements.length; i++) {
        for (let j = i; j < elements.length; j++) {
          pairs.push([elements[i], elements[j]]);
        }
      }
    }

    // Transitive reduction for Hasse diagram
    const hasseEdges = MathUtils.posetTransitiveReduction(elements, pairs);

    // Compute poset properties
    // In-degree & Out-degree in hasseEdges
    const strictSmaller = {};
    const strictGreater = {};
    elements.forEach(x => {
      strictSmaller[x] = [];
      strictGreater[x] = [];
    });
    for (const [u, v] of pairs) {
      if (u !== v) {
        strictSmaller[v].push(u);
        strictGreater[u].push(v);
      }
    }

    // Minimal elements: no element is strictly smaller
    const minimalElements = elements.filter(x => strictSmaller[x].length === 0);
    // Maximal elements: no element is strictly greater
    const maximalElements = elements.filter(x => strictGreater[x].length === 0);

    // Least (eng kichik) element: compares smaller to ALL other elements
    const leastElement = minimalElements.length === 1 ? minimalElements[0] : 'Mavjud emas';
    // Greatest (eng katta) element: compares greater to ALL other elements
    const greatestElement = maximalElements.length === 1 ? maximalElements[0] : 'Mavjud emas';

    this.hasseData = { elements, pairs, hasseEdges, minimalElements, maximalElements, leastElement, greatestElement };

    // Update properties view
    const propBox = document.getElementById('m03-properties');
    propBox.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">📐 Poset Tahlili Natijalari</span>
        <span class="badge badge-purple">Qisman Tartib</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="step-card" style="border-left-color: #34d399;">
          <div class="step-num">Minimal elementlar</div>
          <div class="step-desc"><strong>{ ${minimalElements.join(', ')} }</strong></div>
        </div>
        <div class="step-card" style="border-left-color: #f43f5e;">
          <div class="step-num">Maksimal elementlar</div>
          <div class="step-desc"><strong>{ ${maximalElements.join(', ')} }</strong></div>
        </div>
        <div class="step-card" style="border-left-color: #06b6d4;">
          <div class="step-num">Eng kichik (Least) element</div>
          <div class="step-desc"><strong>${leastElement}</strong></div>
        </div>
        <div class="step-card" style="border-left-color: #a855f7;">
          <div class="step-num">Eng katta (Greatest) element</div>
          <div class="step-desc"><strong>${greatestElement}</strong></div>
        </div>
      </div>
      <div class="step-card" style="margin-top: 10px; border-left-color: #f59e0b;">
        <div class="step-num">Panjara (Lattice) ekanligi</div>
        <div class="step-desc">
          ${leastElement !== 'Mavjud emas' && greatestElement !== 'Mavjud emas' 
            ? '✅ <strong>Ha, bu to\'plam Panjara (Lattice) tashkil qiladi</strong> (Har bir juftlik uchun sup va inf mavjud).' 
            : '⚠️ <strong>To\'liq panjara emas</strong> (Yagona eng katta yoki eng kichik element mavjud emas).'}
        </div>
      </div>
    `;

    this.drawHasse();
  },

  drawHasse() {
    const canvas = document.getElementById('m03-hasse-canvas');
    if (!canvas || !this.hasseData) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : 750;
    const w = parentW > 50 ? parentW : 750;
    const h = 360;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, w, h);

    const { elements, hasseEdges, pairs } = this.hasseData;

    // Calculate levels (topological rank)
    const level = {};
    elements.forEach(x => (level[x] = 0));

    // Iteratively update level based on hasseEdges
    for (let iter = 0; iter < elements.length; iter++) {
      for (const [u, v] of hasseEdges) {
        if (level[v] <= level[u]) {
          level[v] = level[u] + 1;
        }
      }
    }

    const maxLevel = Math.max(...Object.values(level), 0);
    const levelNodes = [];
    for (let l = 0; l <= maxLevel; l++) {
      levelNodes.push(elements.filter(x => level[x] === l));
    }

    // Assign positions
    const pos = {};
    const paddingY = 45;
    const usableH = h - 2 * paddingY;
    const levelStep = maxLevel > 0 ? usableH / maxLevel : 0;

    levelNodes.forEach((nodesInLevel, l) => {
      const y = h - paddingY - l * levelStep;
      const count = nodesInLevel.length;
      const stepX = w / (count + 1);
      nodesInLevel.forEach((node, idx) => {
        pos[node] = { x: stepX * (idx + 1), y };
      });
    });

    // Draw Edges
    ctx.lineWidth = 2;
    for (const [u, v] of hasseEdges) {
      const p1 = pos[u];
      const p2 = pos[v];
      if (p1 && p2) {
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // Draw Nodes
    const r = 20;
    for (const node of elements) {
      const p = pos[node];
      if (!p) continue;

      ctx.save();
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 12;

      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node, p.x, p.y);
      ctx.restore();
    }
  },

  generateTuples() {
    const rawA = document.getElementById('m03-tuple-a').value;
    const n = parseInt(document.getElementById('m03-tuple-n').value) || 2;
    const A = MathUtils.parseSet(rawA);

    if (A.length === 0) return;

    let tuples = [[]];
    for (let i = 0; i < n; i++) {
      const next = [];
      for (const t of tuples) {
        for (const item of A) {
          next.push([...t, item]);
        }
      }
      tuples = next;
    }

    const container = document.getElementById('m03-tuple-results');
    container.innerHTML = `
      <div class="step-card">
        <div class="step-num">Leksikografik Tartibdagi Kortejlar (Jami: ${tuples.length} ta)</div>
        <div class="step-desc" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
          ${tuples.map(t => `<span class="badge badge-primary">(${t.join(', ')})</span>`).join('')}
        </div>
      </div>
    `;
  }
};

window.Module03 = Module03;
