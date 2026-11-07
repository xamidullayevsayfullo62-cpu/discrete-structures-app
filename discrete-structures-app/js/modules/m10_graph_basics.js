/**
 * Module 10: Graflar nazariyasining asosiy tushunchalari.
 * Qo'shnilik/insidentlik matritsalari, darajalar, Handshaking lemma.
 */
const Module10 = {
  id: 'm10',
  title: "10. Graflar nazariyasi asoslari & Matritsalar",
  shortTitle: "10. Graflar asoslari",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Graflar Nazariyasining Asosiy Tushunchalari</h2>
          <p>Uchlar darajasi (deg), Handshaking lemma, Qo'shnilik (Adjacency) va Insidentlik (Incidence) matritsalari. Interaktiv canvas orqali grafni sudrang, tahrirlang va tahlil qiling.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">∑ deg(v) = 2|E|</span>
          <span class="badge badge-cyan">Interaktiv Canvas</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module10.switchTab('graph')">🌐 Interaktiv Graf & Matritsalar</button>
        <button class="tab-btn" onclick="Module10.switchTab('theory')">📖 Teoremalar va Qoidalar</button>
      </div>

      <!-- Tab 1: Graph -->
      <div id="m10-tab-graph" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">Graf Konfiguratsiyasi</h3>

            <div class="form-group">
              <label class="form-label">Uchlar (Vertices):</label>
              <input type="text" id="m10-nodes-input" class="glass-input" value="1, 2, 3, 4, 5">
            </div>

            <div class="form-group">
              <label class="form-label">Qirralar (Edges):
                <span class="form-hint">Masalan: (1,2), (1,3), (2,3), (3,4), (4,5)</span>
              </label>
              <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                <button type="button" class="symbol-pill-btn" onclick="SymbolHelper.insertSymbol('(', 'm10-edges-input')">(</button>
                <button type="button" class="symbol-pill-btn" onclick="SymbolHelper.insertSymbol(')', 'm10-edges-input')">)</button>
                <button type="button" class="symbol-pill-btn" onclick="SymbolHelper.insertSymbol(',', 'm10-edges-input')">,</button>
                <button type="button" class="symbol-pill-btn" onclick="SymbolHelper.insertSymbol('(1,2), ', 'm10-edges-input')">+ Juftlik</button>
                <button type="button" class="symbol-pill-btn" onclick="SymbolHelper.openModal()">🔣 Barcha Belgilar</button>
              </div>
              <textarea id="m10-edges-input" class="glass-input" rows="3">(1,2), (1,3), (2,3), (3,4), (4,5), (5,1)</textarea>
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor namunalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module10.loadPreset('k5')">K₅ To'liq Graf</span>
                <span class="preset-pill" onclick="Module10.loadPreset('k33')">K₃,₃ Ikkibo'lakli</span>
                <span class="preset-pill" onclick="Module10.loadPreset('petersen')">Petersen Grafi</span>
                <span class="preset-pill" onclick="Module10.loadPreset('cube')">Kub Grafi (Q₃)</span>
                <span class="preset-pill" onclick="Module10.loadPreset('wheel')">G'ildirak Grafi (W₆)</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module10.buildGraph()" style="width: 100%;">
              🚀 Grafni Chizish va Tahlil Qilish
            </button>
          </div>

          <!-- Canvas -->
          <div class="canvas-wrapper">
            <div class="canvas-toolbar">
              <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Interaktiv Graf Vizualizatori</span>
              <button class="glass-btn glass-btn-secondary glass-btn-sm" onclick="Module10.graphCanvas && Module10.graphCanvas.startPhysics()">
                🔄 Qayta tekislash (Physics)
              </button>
            </div>
            <canvas id="m10-graph-canvas" class="canvas-area" style="height: 380px;"></canvas>
            <div class="canvas-legend">
              <div class="legend-item"><span class="legend-dot" style="background:#6366f1;"></span> Uchlar (Vertices)</div>
              <div class="legend-item"><span class="legend-dot" style="background:#22d3ee;"></span> Qirralar (Edges)</div>
              <span style="color: #64748b;">(Tugunlarni sichqoncha bilan sudrashingiz mumkin)</span>
            </div>
          </div>
        </div>

        <!-- Degrees & Matrices -->
        <div class="grid-2col" style="margin-top: 20px;">
          <!-- Degrees & Lemma -->
          <div id="m10-degrees-box" class="solution-box">
            <!-- Degrees rendered here -->
          </div>

          <!-- Adjacency Matrix -->
          <div id="m10-matrix-box" class="glass-panel" style="padding: 20px; overflow-x: auto;">
            <!-- Matrix rendered here -->
          </div>
        </div>
      </div>

      <!-- Tab 2: Theory -->
      <div id="m10-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Handshaking Lemma (Salomlashish lemmasi)</div>
          <div class="theory-body">
            Ixtiyoriy yo'naltirilmagan grafda barcha uchlarning darajalari yig'indisi qirralar sonining ikkilanganiga teng:
            <div class="math-block">∑ deg(v) = 2 · |E|</div>
            <strong>Muhim natija:</strong> Har qanday grafda toq darajali uchlar soni doim <em>JUFT</em> bo'ladi!
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Qo'shnilik va Insidentlik matritsalari</div>
          <div class="theory-body">
            <ul>
              <li><strong>Qo'shnilik matritsasi (A):</strong> O'lchami |V| × |V|. A[i, j] = 1 agar (i, j) qirra bo'lsa, aks holda 0.</li>
              <li><strong>Insidentlik matritsasi (B):</strong> O'lchami |V| × |E|. B[i, e] = 1 agar i uchi e qirrasiga tegishli bo'lsa, aks holda 0.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.buildGraph();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m10-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m10-tab-${tabId}`).classList.add('active');
    if (tabId === 'graph') {
      setTimeout(() => this.draw(), 50);
    }
  },

  loadPreset(type) {
    if (type === 'k5') {
      document.getElementById('m10-nodes-input').value = "1, 2, 3, 4, 5";
      document.getElementById('m10-edges-input').value = "(1,2), (1,3), (1,4), (1,5), (2,3), (2,4), (2,5), (3,4), (3,5), (4,5)";
    } else if (type === 'k33') {
      document.getElementById('m10-nodes-input').value = "A1, A2, A3, B1, B2, B3";
      document.getElementById('m10-edges-input').value = "(A1,B1), (A1,B2), (A1,B3), (A2,B1), (A2,B2), (A2,B3), (A3,B1), (A3,B2), (A3,B3)";
    } else if (type === 'petersen') {
      document.getElementById('m10-nodes-input').value = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9";
      // Outer 0-4, Inner 5-9
      document.getElementById('m10-edges-input').value = "(0,1), (1,2), (2,3), (3,4), (4,0), (0,5), (1,6), (2,7), (3,8), (4,9), (5,7), (7,9), (9,6), (6,8), (8,5)";
    } else if (type === 'cube') {
      document.getElementById('m10-nodes-input').value = "000, 001, 010, 011, 100, 101, 110, 111";
      document.getElementById('m10-edges-input').value = "(000,001), (000,010), (000,100), (001,011), (001,101), (010,011), (010,110), (011,111), (100,101), (100,110), (101,111), (110,111)";
    } else if (type === 'wheel') {
      document.getElementById('m10-nodes-input').value = "C, 1, 2, 3, 4, 5";
      document.getElementById('m10-edges-input').value = "(1,2), (2,3), (3,4), (4,5), (5,1), (C,1), (C,2), (C,3), (C,4), (C,5)";
    }
    this.buildGraph();
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

  buildGraph() {
    const rawNodes = document.getElementById('m10-nodes-input').value;
    const rawEdges = document.getElementById('m10-edges-input').value;

    const nodes = MathUtils.parseSet(rawNodes);
    const edges = this.parseEdges(rawEdges);

    this.currentData = { nodes, edges };

    // Calculate degrees
    const deg = {};
    nodes.forEach(u => (deg[u] = 0));
    edges.forEach(e => {
      if (deg[e.from] !== undefined) deg[e.from]++;
      if (deg[e.to] !== undefined) deg[e.to]++;
    });

    const sumDeg = Object.values(deg).reduce((acc, v) => acc + v, 0);
    const oddNodes = nodes.filter(u => deg[u] % 2 !== 0);

    // Render Degrees Box
    const degBox = document.getElementById('m10-degrees-box');
    degBox.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">📐 Uchlar Darajalari & Lemma</span>
        <span class="badge badge-emerald">∑ deg = ${sumDeg}</span>
      </div>

      <div class="step-card" style="border-left-color: #06b6d4;">
        <div class="step-num">Har bir uchning darajasi (deg)</div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;">
          ${nodes.map(u => `<span class="badge badge-primary">deg(${u}) = ${deg[u]}</span>`).join('')}
        </div>
      </div>

      <div class="step-card" style="border-left-color: #34d399;">
        <div class="step-num">Handshaking Lemma Tekshiruvi</div>
        <div class="step-desc">
          ∑ deg(v) = <strong>${sumDeg}</strong> = 2 · |E| = 2 · ${edges.length} = <strong>${2 * edges.length}</strong> ✅<br>
          Toq darajali uchlar soni: <strong>${oddNodes.length} ta</strong> (Juft son bo'lishi shart edi: ${oddNodes.length % 2 === 0 ? 'Bajarildi ✅' : 'Xato ❌'})
        </div>
      </div>
    `;

    // Render Adjacency Matrix
    const matrixBox = document.getElementById('m10-matrix-box');
    const edgeSet = new Set(edges.map(e => `${e.from},${e.to}`).concat(edges.map(e => `${e.to},${e.from}`)));

    let matrixHtml = `
      <div style="font-weight: 700; font-size: 13px; color: #cbd5e1; margin-bottom: 8px;">Qo'shnilik Matritsasi (Adjacency Matrix)</div>
      <table class="glass-table">
        <thead>
          <tr><th>A</th>${nodes.map(u => `<th>${u}</th>`).join('')}</tr>
        </thead>
        <tbody>
    `;
    nodes.forEach(row => {
      matrixHtml += `<tr><th>${row}</th>`;
      nodes.forEach(col => {
        const isConnected = edgeSet.has(`${row},${col}`);
        matrixHtml += `<td class="${isConnected ? 'cell-one' : 'cell-zero'}">${isConnected ? 1 : 0}</td>`;
      });
      matrixHtml += `</tr>`;
    });
    matrixHtml += `</tbody></table>`;
    matrixBox.innerHTML = matrixHtml;

    this.draw();
  },

  draw() {
    this.graphCanvas = new InteractiveGraphCanvas('m10-graph-canvas', { directed: false, physics: true });
    if (this.currentData) {
      const nodeObjs = this.currentData.nodes.map(u => ({ id: u, label: u }));
      this.graphCanvas.setData(nodeObjs, this.currentData.edges);
    }
  }
};

window.Module10 = Module10;
