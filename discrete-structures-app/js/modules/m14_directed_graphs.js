/**
 * Module 14: Yo'naltirilgan graf (Digraf). Topologik saralash va SCC.
 */
const Module14 = {
  id: 'm14',
  title: "14. Yo'naltirilgan graf (Digraf) & Topologik saralash",
  shortTitle: "14. Yo'naltirilgan graf",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Yo'naltirilgan Graf (Digraf) & Topologik Saralash (DAG)</h2>
          <p>Kiruvchi va chiquvchi darajalar (in-deg, out-deg), DAG (yo'naltirilgan siklsiz graf) tekshiruvi, Kahn algoritmi yordamida topologik saralash va kuchli bog'langan komponentlar.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">DAG & Kahn</span>
          <span class="badge badge-cyan">deg⁻ va deg⁺</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module14.switchTab('topo')">🔄 Topologik Saralash (Kahn)</button>
        <button class="tab-btn" onclick="Module14.switchTab('degrees')">📊 Kiruvchi/Chiquvchi Darajalar</button>
        <button class="tab-btn" onclick="Module14.switchTab('theory')">📖 Digraf Xossalari</button>
      </div>

      <!-- Tab 1: Topological Sort -->
      <div id="m14-tab-topo" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">Yo'naltirilgan Graf Tuzilishi</h3>

            <div class="form-group">
              <label class="form-label">Uchlar (V):</label>
              <input type="text" id="m14-nodes" class="glass-input" value="1, 2, 3, 4, 5, 6">
            </div>

            <div class="form-group">
              <label class="form-label">Yo'naltirilgan Qirralar (u → v):
                <span class="form-hint">Masalan: (1,2), (1,3), (2,4), (3,4)...</span>
              </label>
              <textarea id="m14-edges" class="glass-input" rows="4">(1,2), (1,3), (2,4), (2,5), (3,4), (3,6), (4,6), (5,6)</textarea>
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor namunalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module14.loadPreset('dag')">DAG (Siklsiz Digraf)</span>
                <span class="preset-pill" onclick="Module14.loadPreset('cycle')">Siklli Digraf (Siklni ko'rsatish)</span>
                <span class="preset-pill" onclick="Module14.loadPreset('prereq')">Fanlar ketma-ketligi (Pre-requisites)</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module14.runTopologicalSort()" style="width: 100%;">
              ⚡ Topologik Saralashni Bajarish
            </button>
          </div>

          <!-- Canvas & Result -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="canvas-wrapper">
              <div class="canvas-toolbar">
                <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Digraf Chizmasi</span>
                <span id="m14-topo-badge" class="badge badge-emerald">DAG</span>
              </div>
              <canvas id="m14-digraph-canvas" class="canvas-area" style="height: 320px;"></canvas>
            </div>

            <div id="m14-topo-result" class="solution-box"></div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Degrees -->
      <div id="m14-tab-degrees" class="tab-pane">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #38bdf8;">Kiruvchi (deg⁻) va Chiquvchi (deg⁺) Darajalar</h3>
            <div id="m14-degrees-content"></div>
          </div>
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #a855f7;">Manbalar va Botqoqliklar (Sources & Sinks)</h3>
            <div id="m14-source-sink-content"></div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m14-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. DAG va Topologik Saralash nima?</div>
          <div class="theory-body">
            <strong>DAG (Directed Acyclic Graph):</strong> Birorta ham yo'naltirilgan siklga ega bo'lmagan digraf.<br>
            <strong>Topologik saralash:</strong> Grafning uchlarini shunday v₁, v₂, ..., vₙ ketma-ketlikda joylashtirishki, har bir (u, v) qirra uchun u uchi doim v dan chapda tursin.
            Faqat va faqat DAG bo'lgan graflardagina topologik saralash mavjud bo'ladi!
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.runTopologicalSort();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m14-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m14-tab-${tabId}`).classList.add('active');
    if (tabId === 'topo') {
      setTimeout(() => this.draw(), 50);
    }
  },

  loadPreset(type) {
    if (type === 'dag') {
      document.getElementById('m14-nodes').value = "1, 2, 3, 4, 5, 6";
      document.getElementById('m14-edges').value = "(1,2), (1,3), (2,4), (2,5), (3,4), (3,6), (4,6), (5,6)";
    } else if (type === 'cycle') {
      document.getElementById('m14-nodes').value = "A, B, C, D";
      document.getElementById('m14-edges').value = "(A,B), (B,C), (C,D), (D,B)";
    } else if (type === 'prereq') {
      document.getElementById('m14-nodes').value = "CS101, CS102, MATH1, CS201, CS301";
      document.getElementById('m14-edges').value = "(CS101,CS102), (CS102,CS201), (MATH1,CS201), (CS201,CS301)";
    }
    this.runTopologicalSort();
  },

  parseEdges(str) {
    const regex = /\(\s*([^,()]+)\s*,\s*([^,()]+)\s*\)/g;
    const edges = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      edges.push({ from: match[1].trim(), to: match[2].trim(), directed: true });
    }
    return edges;
  },

  runTopologicalSort() {
    const rawNodes = document.getElementById('m14-nodes').value;
    const rawEdges = document.getElementById('m14-edges').value;

    const nodes = MathUtils.parseSet(rawNodes);
    const edges = this.parseEdges(rawEdges);

    this.currentData = { nodes, edges };

    const topo = MathUtils.topologicalSort(nodes, edges);

    // Calculate in/out degrees
    const inDeg = {};
    const outDeg = {};
    nodes.forEach(u => { inDeg[u] = 0; outDeg[u] = 0; });
    edges.forEach(e => {
      if (outDeg[e.from] !== undefined) outDeg[e.from]++;
      if (inDeg[e.to] !== undefined) inDeg[e.to]++;
    });

    const badge = document.getElementById('m14-topo-badge');
    badge.className = topo.hasCycle ? 'badge badge-rose' : 'badge badge-emerald';
    badge.innerText = topo.hasCycle ? 'Sikl Bor (DAG emas)' : 'DAG (Siklsiz)';

    const res = document.getElementById('m14-topo-result');
    if (!topo.hasCycle) {
      res.innerHTML = `
        <div class="solution-header">
          <span class="solution-title">✅ Topologik Tartib Topildi</span>
          <span class="badge badge-emerald">Muvaffaqiyatli</span>
        </div>
        <div class="step-card" style="border-left-color: #10b981;">
          <div class="step-num">Ketma-ketlik (Linear Ordering)</div>
          <div style="font-size: 16px; font-weight: 800; color: #34d399; margin-top: 6px;">
            ${topo.order.join('  →  ')}
          </div>
        </div>
        <div class="step-card" style="border-left-color: #38bdf8;">
          <div class="step-num">Kahn Algoritmi Qadamlari</div>
          <div class="step-desc">
            Har bir qadamda kiruvchi darajasi 0 bo'lgan uch olinib, ro'yxatga qo'shildi va uning chiquvchi qirralari o'chirildi.
          </div>
        </div>
      `;
    } else {
      res.innerHTML = `
        <div class="solution-header">
          <span class="solution-title">❌ Topologik Saralash Imkonsiz</span>
          <span class="badge badge-rose">Sikl Mavjud</span>
        </div>
        <div class="step-card" style="border-left-color: #f43f5e;">
          <div class="step-num">Xatolik Sababi</div>
          <div class="step-desc">
            Ushbu digrafda <strong>yo'naltirilgan sikl</strong> mavjud. Qaramliklar berk halqa hosil qilgani sababli, ularni bir chiziqqa tartiblab bo'lmaydi.
          </div>
        </div>
      `;
    }

    // Render Degrees Tab
    const degCont = document.getElementById('m14-degrees-content');
    degCont.innerHTML = `
      <table class="glass-table">
        <thead>
          <tr><th>Uch (v)</th><th>Kiruvchi deg⁻(v)</th><th>Chiquvchi deg⁺(v)</th></tr>
        </thead>
        <tbody>
          ${nodes.map(u => `
            <tr>
              <td><strong>${u}</strong></td>
              <td class="${inDeg[u] === 0 ? 'cell-one' : ''}">${inDeg[u]}</td>
              <td class="${outDeg[u] === 0 ? 'cell-one' : ''}">${outDeg[u]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const sources = nodes.filter(u => inDeg[u] === 0);
    const sinks = nodes.filter(u => outDeg[u] === 0);
    const ssCont = document.getElementById('m14-source-sink-content');
    ssCont.innerHTML = `
      <div class="step-card" style="border-left-color: #34d399; margin-bottom: 12px;">
        <div class="step-num">Manbalar (Sources: deg⁻ = 0)</div>
        <div class="step-desc"><strong>{ ${sources.join(', ') || 'Yo\'q'} }</strong></div>
      </div>
      <div class="step-card" style="border-left-color: #f43f5e;">
        <div class="step-num">Botqoqliklar (Sinks: deg⁺ = 0)</div>
        <div class="step-desc"><strong>{ ${sinks.join(', ') || 'Yo\'q'} }</strong></div>
      </div>
    `;

    this.draw();
  },

  draw() {
    this.graphCanvas = new InteractiveGraphCanvas('m14-digraph-canvas', { directed: true, physics: true });
    if (this.currentData) {
      const nodeObjs = this.currentData.nodes.map(u => ({ id: u, label: u }));
      this.graphCanvas.setData(nodeObjs, this.currentData.edges);
    }
  }
};

window.Module14 = Module14;
