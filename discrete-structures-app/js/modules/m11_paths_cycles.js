/**
 * Module 11: Yo'l, zanjir, sikl. Eyler va Gamilton sikllari.
 */
const Module11 = {
  id: 'm11',
  title: "11. Yo'l, zanjir, sikl. Eyler va Gamilton sikllari",
  shortTitle: "11. Yo'l va Sikllar",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Yo'l, Zanjir, Sikl. Eyler va Gamilton Graflari</h2>
          <p>Königsberg ko'priklari masalasi, Eyler yo'li va sikli mavjudligini tekshirish, Hierholzer algoritmi va Gamilton siklini qidirish hamda bog'liqlik komponentlarini ajratish.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-emerald">Eyler Sikli</span>
          <span class="badge badge-purple">Gamilton Sikli</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module11.switchTab('euler')">🚲 Eyler Yo'li va Sikli</button>
        <button class="tab-btn" onclick="Module11.switchTab('hamilton')">👑 Gamilton Sikli</button>
        <button class="tab-btn" onclick="Module11.switchTab('theory')">📖 Teoremalar va Königsberg</button>
      </div>

      <!-- Tab 1: Euler -->
      <div id="m11-tab-euler" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #10b981;">Graf va Eyler Teoremasi</h3>

            <div class="form-group">
              <label class="form-label">Uchlar:</label>
              <input type="text" id="m11-euler-nodes" class="glass-input" value="A, B, C, D, E">
            </div>

            <div class="form-group">
              <label class="form-label">Qirralar:</label>
              <textarea id="m11-euler-edges" class="glass-input" rows="3">(A,B), (B,C), (C,D), (D,E), (E,A), (B,D), (B,E)</textarea>
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor namunalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module11.loadPreset('konigsberg')">Königsberg 7 ko'prigi</span>
                <span class="preset-pill" onclick="Module11.loadPreset('envelope')">Ochiq konvert (Eyler yo'li)</span>
                <span class="preset-pill" onclick="Module11.loadPreset('star')">Beshburchak Yulduz (Eyler sikli)</span>
                <span class="preset-pill" onclick="Module11.loadPreset('complete4')">K₄ To'liq Graf</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module11.checkEuler()" style="width: 100%;">
              🔍 Eyler Yo'li/Siklini Tekshirish
            </button>
          </div>

          <!-- Canvas & Result -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="canvas-wrapper">
              <div class="canvas-toolbar">
                <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Graf Ko'rinishi</span>
                <span id="m11-euler-badge" class="badge badge-emerald">Eyler Tahlili</span>
              </div>
              <canvas id="m11-euler-canvas" class="canvas-area" style="height: 320px;"></canvas>
            </div>

            <div id="m11-euler-result" class="solution-box"></div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Hamilton -->
      <div id="m11-tab-hamilton" class="tab-pane">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #a855f7;">Gamilton Sikli (Backtracking)</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
              Grafning har bir uchiga <strong>faqat bir marta</strong> tashrif buyurib, boshlangan uchga qaytuvchi yopiq yo'l.
            </p>
            <button class="glass-btn glass-btn-primary" onclick="Module11.findHamiltonCycle()" style="width: 100%;">
              👑 Gamilton Siklini Qidirish
            </button>
          </div>
          <div id="m11-hamilton-result" class="solution-box"></div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m11-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Eyler graflari teoremasi (Leonard Eyler, 1736)</div>
          <div class="theory-body">
            Bog'langan grafda qalamni qog'ozdan uzmasdan va har bir qirradan faqat bir marta o'tish:
            <ul>
              <li><strong>Eyler sikli mavjud:</strong> Agar va faqat agar barcha uchlarning darajalari JUFT bo'lsa.</li>
              <li><strong>Eyler yo'li (ochiq zanjir) mavjud:</strong> Agar va faqat agar toq darajali uchlar soni ANIQ 2 TA bo'lsa (yo'l bitta toq uchdan boshlanib ikkinchisida tugaydi).</li>
              <li>Agar toq darajali uchlar soni > 2 bo'lsa, Eyler yo'li MAVJUD EMAS.</li>
            </ul>
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Diraq va Ore teoremalari (Gamilton sikli)</div>
          <div class="theory-body">
            <ul>
              <li><strong>Diraq teoremasi (1952):</strong> Agar n ≥ 3 uchli grafda har bir uch uchun deg(v) ≥ n/2 bo'lsa, unda Gamilton sikli mavjud.</li>
              <li><strong>Ore teoremasi (1960):</strong> Agar ixtiyoriy tutashmagan (qo'shni bo'lmagan) u va v uchlar uchun deg(u) + deg(v) ≥ n bo'lsa, unda Gamilton sikli mavjud.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.checkEuler();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m11-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m11-tab-${tabId}`).classList.add('active');
    if (tabId === 'euler') {
      setTimeout(() => this.draw(), 50);
    }
  },

  loadPreset(type) {
    if (type === 'konigsberg') {
      document.getElementById('m11-euler-nodes').value = "A, B, C, D";
      document.getElementById('m11-euler-edges').value = "(A,B), (A,B), (A,C), (A,C), (A,D), (B,D), (C,D)";
    } else if (type === 'envelope') {
      document.getElementById('m11-euler-nodes').value = "1, 2, 3, 4, 5";
      document.getElementById('m11-euler-edges').value = "(1,2), (2,3), (3,4), (4,1), (1,3), (2,4), (3,5), (4,5)";
    } else if (type === 'star') {
      document.getElementById('m11-euler-nodes').value = "A, B, C, D, E";
      document.getElementById('m11-euler-edges').value = "(A,C), (C,E), (E,B), (B,D), (D,A)";
    } else if (type === 'complete4') {
      document.getElementById('m11-euler-nodes').value = "1, 2, 3, 4";
      document.getElementById('m11-euler-edges').value = "(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)";
    }
    this.checkEuler();
  },

  parseEdges(str) {
    const regex = /\(\s*([^,()]+)\s*,\s*([^,()]+)\s*\)/g;
    const edges = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      edges.push({ from: match[1].trim(), to: match[2].trim(), directed: false });
    }
    return edges;
  },

  checkEuler() {
    const rawNodes = document.getElementById('m11-euler-nodes').value;
    const rawEdges = document.getElementById('m11-euler-edges').value;

    const nodes = MathUtils.parseSet(rawNodes);
    const edges = this.parseEdges(rawEdges);

    this.currentData = { nodes, edges };

    const analysis = MathUtils.findEulerTrailOrCircuit(nodes, edges, false);

    // Calculate degrees
    const deg = {};
    nodes.forEach(u => (deg[u] = 0));
    edges.forEach(e => {
      if (deg[e.from] !== undefined) deg[e.from]++;
      if (deg[e.to] !== undefined) deg[e.to]++;
    });

    const badge = document.getElementById('m11-euler-badge');
    badge.className = analysis.type === 'circuit' ? 'badge badge-emerald' : (analysis.type === 'trail' ? 'badge badge-cyan' : 'badge badge-rose');
    badge.innerText = analysis.type === 'circuit' ? 'Eyler Sikli Bor' : (analysis.type === 'trail' ? 'Eyler Yo\'li Bor' : 'Eyler Yo\'q');

    const res = document.getElementById('m11-euler-result');
    res.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">🚲 Eyler Xulosasi</span>
        <span class="badge ${analysis.type !== 'none' ? 'badge-emerald' : 'badge-rose'}">
          ${analysis.type !== 'none' ? 'Mavjud' : 'Mavjud emas'}
        </span>
      </div>
      <div class="step-card" style="border-left-color: ${analysis.type !== 'none' ? '#10b981' : '#f43f5e'};">
        <div class="step-num">Tahlil Natijasi</div>
        <div class="step-desc" style="font-size: 14px; font-weight: 700;">
          ${analysis.message}
        </div>
      </div>
      <div class="step-card" style="border-left-color: #818cf8;">
        <div class="step-num">Uchlar Darajalari</div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
          ${nodes.map(u => `<span class="badge ${deg[u] % 2 === 0 ? 'badge-primary' : 'badge-amber'}">${u}: deg = ${deg[u]}</span>`).join('')}
        </div>
      </div>
    `;

    this.draw();
  },

  draw() {
    this.graphCanvas = new InteractiveGraphCanvas('m11-euler-canvas', { directed: false, physics: true });
    if (this.currentData) {
      const nodeObjs = this.currentData.nodes.map(u => ({ id: u, label: u }));
      this.graphCanvas.setData(nodeObjs, this.currentData.edges);
    }
  },

  findHamiltonCycle() {
    if (!this.currentData) return;
    const { nodes, edges } = this.currentData;
    const n = nodes.length;

    // Build adjacency
    const adj = {};
    nodes.forEach(u => (adj[u] = new Set()));
    edges.forEach(e => {
      adj[e.from].add(e.to);
      adj[e.to].add(e.from);
    });

    const path = [nodes[0]];
    const visited = new Set([nodes[0]]);

    function solve() {
      if (path.length === n) {
        if (adj[path[path.length - 1]].has(path[0])) {
          return true;
        }
        return false;
      }
      const curr = path[path.length - 1];
      for (const next of adj[curr]) {
        if (!visited.has(next)) {
          visited.add(next);
          path.push(next);
          if (solve()) return true;
          path.pop();
          visited.delete(next);
        }
      }
      return false;
    }

    const hasHamilton = solve();
    const res = document.getElementById('m11-hamilton-result');

    if (hasHamilton) {
      path.push(path[0]); // Complete loop
      res.innerHTML = `
        <div class="solution-header">
          <span class="solution-title">👑 Gamilton Sikli Topildi!</span>
          <span class="badge badge-emerald">Mavjud</span>
        </div>
        <div class="step-card" style="border-left-color: #34d399;">
          <div class="step-num">Sikl Ketma-ketligi</div>
          <div style="font-size: 16px; font-weight: 800; color: #34d399; margin-top: 6px;">
            ${path.join(' → ')}
          </div>
        </div>
      `;
    } else {
      res.innerHTML = `
        <div class="solution-header">
          <span class="solution-title">Gamilton Sikli Tahlili</span>
          <span class="badge badge-rose">Mavjud emas</span>
        </div>
        <div class="step-card" style="border-left-color: #f43f5e;">
          <div class="step-num">Xulosa</div>
          <div class="step-desc">Ushbu grafda barcha uchlarni bir marta aylanib o'tuvchi Gamilton sikli topilmadi.</div>
        </div>
      `;
    }
  }
};

window.Module11 = Module11;
