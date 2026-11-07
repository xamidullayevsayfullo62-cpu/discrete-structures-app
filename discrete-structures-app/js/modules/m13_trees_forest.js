/**
 * Module 13: O'rmon. Daraxtlar. Minimal qamrovchi daraxt (MST: Kruskal & Prim).
 */
const Module13 = {
  id: 'm13',
  title: "13. O'rmon. Daraxtlar & Minimal Qamrovchi Daraxt (MST)",
  shortTitle: "13. Daraxtlar & MST",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>O'rmon, Daraxtlar va Minimal Qamrovchi Daraxt (MST)</h2>
          <p>Daraxt xossalari (|E| = |V| - 1), siklsizlik, ildizli daraxtlar va Kruskal hamda Prim algoritmlari orqali minimal vaznli qamrovchi daraxtni qadamma-qadam vizual toping.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-emerald">Kruskal (DSU)</span>
          <span class="badge badge-cyan">Prim Algoritmi</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module13.switchTab('mst')">🌲 Kruskal Algoritmi (MST)</button>
        <button class="tab-btn" onclick="Module13.switchTab('theory')">📖 Daraxt Xossalari & O'rmon</button>
      </div>

      <!-- Tab 1: MST -->
      <div id="m13-tab-mst" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #10b981;">Vaznli Graf Sozlamalari</h3>

            <div class="form-group">
              <label class="form-label">Uchlar (V):</label>
              <input type="text" id="m13-nodes" class="glass-input" value="A, B, C, D, E, F">
            </div>

            <div class="form-group">
              <label class="form-label">Vaznli Qirralar (from, to, weight):
                <span class="form-hint">Masalan: (A,B,4), (A,C,2), ...</span>
              </label>
              <textarea id="m13-edges" class="glass-input" rows="4">(A,B,4), (A,C,2), (B,C,1), (B,D,5), (C,D,8), (C,E,10), (D,E,2), (D,F,6), (E,F,3)</textarea>
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor vaznli graflar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module13.loadPreset('standard')">Standart 6-uchli Graf</span>
                <span class="preset-pill" onclick="Module13.loadPreset('simple')">Oddiy 4-uchli Graf</span>
                <span class="preset-pill" onclick="Module13.loadPreset('star')">Yulduzsimon vaznli</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module13.runKruskal()" style="width: 100%;">
              ⚡ Kruskal Algoritmini Ishga Tushirish
            </button>
          </div>

          <!-- Canvas & Result -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="canvas-wrapper">
              <div class="canvas-toolbar">
                <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Minimal Qamrovchi Daraxt (MST)</span>
                <span id="m13-mst-badge" class="badge badge-emerald">Minimal Vazn</span>
              </div>
              <canvas id="m13-mst-canvas" class="canvas-area" style="height: 340px;"></canvas>
            </div>

            <div id="m13-mst-summary" class="solution-box"></div>
          </div>
        </div>

        <!-- Kruskal Step-by-Step Table -->
        <div class="glass-panel" style="padding: 20px; margin-top: 20px;">
          <h4 style="font-size: 15px; color: #cbd5e1; margin-bottom: 12px;">Kruskal Algoritmi Bosqichlari (Qirralarni saralash va DSU tekshiruvi)</h4>
          <div id="m13-kruskal-steps-container" style="overflow-x: auto;"></div>
        </div>
      </div>

      <!-- Tab 2: Theory -->
      <div id="m13-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Daraxt (Tree) va O'rmon (Forest) ta'rifi</div>
          <div class="theory-body">
            <ul>
              <li><strong>Daraxt:</strong> Sikllarga ega bo'lmagan bog'langan yo'naltirilmagan graf.</li>
              <li>Daraxtning n ta uchi bo'lsa, unda qat'iy ravishda <strong>n - 1</strong> ta qirra bo'ladi (|E| = |V| - 1).</li>
              <li>Daraxtdagi ixtiyoriy ikki uch orasida yagona oddiy yo'l mavjud.</li>
              <li><strong>O'rmon:</strong> Sikllarga ega bo'lmagan, lekin bir nechta bog'langan komponentlardan (daraxtlardan) iborat graf. Agar k ta daraxt bo'lsa, |E| = |V| - k bo'ladi.</li>
            </ul>
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Kruskal algoritmi printsipi</div>
          <div class="theory-body">
            1. Barcha qirralar vaznlari bo'yicha o'sish tartibida saralanadi.<br>
            2. Eng arzon qirradan boshlab grafga qo'shiladi.<br>
            3. Agar navbatdagi qirra sikl hosil qilsa (ikkala uchi ham bitta komponentda bo'lsa), u tashlab yuboriladi.<br>
            4. Tanlangan qirralar soni n - 1 taga yetganda algoritm to'xtaydi.
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.runKruskal();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m13-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m13-tab-${tabId}`).classList.add('active');
    if (tabId === 'mst') {
      setTimeout(() => this.draw(), 50);
    }
  },

  loadPreset(type) {
    if (type === 'standard') {
      document.getElementById('m13-nodes').value = "A, B, C, D, E, F";
      document.getElementById('m13-edges').value = "(A,B,4), (A,C,2), (B,C,1), (B,D,5), (C,D,8), (C,E,10), (D,E,2), (D,F,6), (E,F,3)";
    } else if (type === 'simple') {
      document.getElementById('m13-nodes').value = "1, 2, 3, 4";
      document.getElementById('m13-edges').value = "(1,2,1), (2,3,4), (3,4,2), (4,1,5), (1,3,3)";
    } else if (type === 'star') {
      document.getElementById('m13-nodes').value = "C, 1, 2, 3, 4, 5";
      document.getElementById('m13-edges').value = "(C,1,3), (C,2,5), (C,3,2), (C,4,8), (C,5,1), (1,2,7), (2,3,4), (3,4,6), (4,5,9)";
    }
    this.runKruskal();
  },

  parseWeightedEdges(str) {
    const regex = /\(\s*([^,()]+)\s*,\s*([^,()]+)\s*,\s*(-?\d+)\s*\)/g;
    const edges = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      edges.push({
        from: match[1].trim(),
        to: match[2].trim(),
        weight: parseInt(match[3]),
        directed: false
      });
    }
    return edges;
  },

  runKruskal() {
    const rawNodes = document.getElementById('m13-nodes').value;
    const rawEdges = document.getElementById('m13-edges').value;

    const nodes = MathUtils.parseSet(rawNodes);
    const edges = this.parseWeightedEdges(rawEdges);

    this.currentData = { nodes, edges };

    const { mstEdges, totalWeight, steps } = MathUtils.kruskalMST(nodes, edges);

    // Highlight MST edges in graph
    const mstEdgeSet = new Set(
      mstEdges.map(e => `${e.from}-${e.to}`).concat(mstEdges.map(e => `${e.to}-${e.from}`))
    );

    this.renderEdges = edges.map(e => ({
      ...e,
      highlighted: mstEdgeSet.has(`${e.from}-${e.to}`)
    }));

    // Summary view
    const sumBox = document.getElementById('m13-mst-summary');
    sumBox.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">🌲 Kruskal Natijasi</span>
        <span class="badge badge-emerald">Jami Vazn: ${totalWeight}</span>
      </div>
      <div class="step-card" style="border-left-color: #10b981;">
        <div class="step-num">MST ga kirgan qirralar (${mstEdges.length} ta)</div>
        <div style="font-size: 14px; font-weight: 700; color: #34d399; margin-top: 4px;">
          ${mstEdges.map(e => `(${e.from} - ${e.to}: ${e.weight})`).join(', ')}
        </div>
      </div>
      <div class="step-card" style="border-left-color: #38bdf8; background: rgba(56, 189, 248, 0.08);">
        <div class="step-num" style="color: #38bdf8;">Minimal Umumiy Vazn</div>
        <div style="font-size: 22px; font-weight: 800; color: #38bdf8;">W = ${totalWeight}</div>
      </div>
    `;

    // Steps table
    const stepsCont = document.getElementById('m13-kruskal-steps-container');
    stepsCont.innerHTML = `
      <table class="glass-table">
        <thead>
          <tr>
            <th>Qadam</th>
            <th>Qirra (u - v)</th>
            <th>Vazni</th>
            <th>Qaror</th>
            <th>Sababi</th>
          </tr>
        </thead>
        <tbody>
          ${steps.map((s, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td><strong>${s.edge.from} - ${s.edge.to}</strong></td>
              <td>${s.edge.weight}</td>
              <td><span class="badge ${s.accepted ? 'badge-emerald' : 'badge-rose'}">${s.accepted ? 'Tanlandi' : 'Rad etildi'}</span></td>
              <td style="color: ${s.accepted ? '#34d399' : '#94a3b8'};">${s.reason}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    this.draw();
  },

  draw() {
    this.graphCanvas = new InteractiveGraphCanvas('m13-mst-canvas', { directed: false, physics: true });
    if (this.currentData) {
      const nodeObjs = this.currentData.nodes.map(u => ({ id: u, label: u }));
      this.graphCanvas.setData(nodeObjs, this.renderEdges || this.currentData.edges);
    }
  }
};

window.Module13 = Module13;
