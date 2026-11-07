/**
 * Module 15: Eng qisqa yo'l topish algoritmlari (Dijkstra, Bellman-Ford, Floyd-Warshall).
 */
const Module15 = {
  id: 'm15',
  title: "15. Eng qisqa yo'l algoritmlari (Dijkstra & Floyd-Warshall)",
  shortTitle: "15. Eng qisqa yo'l",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Eng Qisqa Yo'l Topish Algoritmlari (Dijkstra, Floyd-Warshall)</h2>
          <p>Dijkstra algoritmi bilan bitta uchdan barcha uchlarga eng qisqa masofalarni va aniq traektoriyani toping. Floyd-Warshall algoritmi bilan barcha juftliklar matritsasini hisoblang.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-emerald">Dijkstra</span>
          <span class="badge badge-cyan">Floyd-Warshall</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module15.switchTab('dijkstra')">⚡ Dijkstra Algoritmi</button>
        <button class="tab-btn" onclick="Module15.switchTab('floyd')">📊 Floyd-Warshall Matritsasi</button>
        <button class="tab-btn" onclick="Module15.switchTab('theory')">📖 Nazariya va Taqqoslash</button>
      </div>

      <!-- Tab 1: Dijkstra -->
      <div id="m15-tab-dijkstra" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #10b981;">Graf va Yo'l Sozlamalari</h3>

            <div class="form-group">
              <label class="form-label">Uchlar (V):</label>
              <input type="text" id="m15-nodes" class="glass-input" value="A, B, C, D, E, F">
            </div>

            <div class="form-group">
              <label class="form-label">Vaznli Qirralar (u, v, vazn):
                <span class="form-hint">Musbat butun sonlar</span>
              </label>
              <textarea id="m15-edges" class="glass-input" rows="4">(A,B,7), (A,C,9), (A,F,14), (B,C,10), (B,D,15), (C,D,11), (C,F,2), (D,E,6), (E,F,9)</textarea>
            </div>

            <div class="grid-2col">
              <div class="form-group">
                <label class="form-label">Boshlang'ich uch (Start):</label>
                <input type="text" id="m15-start-node" class="glass-input" value="A">
              </div>
              <div class="form-group">
                <label class="form-label">Mo'ljaldagi uch (End):</label>
                <input type="text" id="m15-end-node" class="glass-input" value="E">
              </div>
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor tarmoqlar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module15.loadPreset('standard')">Standart Tarmoq</span>
                <span class="preset-pill" onclick="Module15.loadPreset('grid')">Kvadrat panjara</span>
                <span class="preset-pill" onclick="Module15.loadPreset('highway')">Magistral yo'llar</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module15.runDijkstra()" style="width: 100%;">
              🚀 Eng Qisqa Yo'lni Hisoblash
            </button>
          </div>

          <!-- Canvas & Result -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="canvas-wrapper">
              <div class="canvas-toolbar">
                <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Optimal Yo'l Vizualizatsiyasi</span>
                <span id="m15-path-badge" class="badge badge-emerald">Dijkstra Natijasi</span>
              </div>
              <canvas id="m15-path-canvas" class="canvas-area" style="height: 340px;"></canvas>
            </div>

            <div id="m15-dijkstra-result" class="solution-box"></div>
          </div>
        </div>

        <!-- Steps Table -->
        <div class="glass-panel" style="padding: 20px; margin-top: 20px;">
          <h4 style="font-size: 15px; color: #cbd5e1; margin-bottom: 12px;">Dijkstra Algoritmining Bosqichma-bosqich Qadamlari</h4>
          <div id="m15-dijkstra-steps-table" style="overflow-x: auto;"></div>
        </div>
      </div>

      <!-- Tab 2: Floyd-Warshall -->
      <div id="m15-tab-floyd" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #38bdf8;">Floyd-Warshall Algoritmi (Barcha juftliklar orasidagi masofa)</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
            D[i][j] matritsasi har bir i va j uchlari orasidagi eng qisqa masofani ifodalaydi.
          </p>
          <div id="m15-floyd-matrix-container" style="overflow-x: auto;"></div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m15-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Dijkstra algoritmi</div>
          <div class="theory-body">
            Faqat manfiy bo'lmagan (musbat) vaznli graflarda ishlaydi. O'rtacha murakkabligi: O((V + E) log V).
            Har bir qadamda hali ko'rilmagan va boshlang'ich uchdan masofasi eng kichik bo'lgan uchi tanlanadi (greedy strategiya).
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Floyd-Warshall va Bellman-Ford farqi</div>
          <div class="theory-body">
            <ul>
              <li><strong>Bellman-Ford:</strong> Bitta uchdan qolganlariga eng qisqa yo'lni topadi va manfiy qirrali sikllarni ham aniqlay oladi. O(V · E).</li>
              <li><strong>Floyd-Warshall:</strong> Dinamik dasturlash asosida BARCHA uchlar juftligi orasidagi masofalar matritsasini hisoblaydi. O(V³).</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.runDijkstra();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m15-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m15-tab-${tabId}`).classList.add('active');
    if (tabId === 'dijkstra') {
      setTimeout(() => this.draw(), 50);
    }
  },

  loadPreset(type) {
    if (type === 'standard') {
      document.getElementById('m15-nodes').value = "A, B, C, D, E, F";
      document.getElementById('m15-edges').value = "(A,B,7), (A,C,9), (A,F,14), (B,C,10), (B,D,15), (C,D,11), (C,F,2), (D,E,6), (E,F,9)";
      document.getElementById('m15-start-node').value = "A";
      document.getElementById('m15-end-node').value = "E";
    } else if (type === 'grid') {
      document.getElementById('m15-nodes').value = "1, 2, 3, 4";
      document.getElementById('m15-edges').value = "(1,2,1), (2,4,2), (1,3,4), (3,4,1)";
      document.getElementById('m15-start-node').value = "1";
      document.getElementById('m15-end-node').value = "4";
    } else if (type === 'highway') {
      document.getElementById('m15-nodes').value = "Toshkent, Samarqand, Buxoro, Xiva";
      document.getElementById('m15-edges').value = "(Toshkent,Samarqand,300), (Samarqand,Buxoro,270), (Buxoro,Xiva,450), (Toshkent,Buxoro,600)";
      document.getElementById('m15-start-node').value = "Toshkent";
      document.getElementById('m15-end-node').value = "Xiva";
    }
    this.runDijkstra();
  },

  parseWeightedEdges(str) {
    const regex = /\(\s*([^,()]+)\s*,\s*([^,()]+)\s*,\s*(\d+)\s*\)/g;
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

  runDijkstra() {
    const rawNodes = document.getElementById('m15-nodes').value;
    const rawEdges = document.getElementById('m15-edges').value;
    const startNode = document.getElementById('m15-start-node').value.trim();
    const endNode = document.getElementById('m15-end-node').value.trim();

    const nodes = MathUtils.parseSet(rawNodes);
    const edges = this.parseWeightedEdges(rawEdges);

    this.currentData = { nodes, edges };

    const { dist, prev, steps } = MathUtils.dijkstra(nodes, edges, startNode);

    // Reconstruct path from end to start
    const path = [];
    let curr = endNode;
    while (curr) {
      path.unshift(curr);
      curr = prev[curr];
    }

    const isValidPath = path[0] === startNode && dist[endNode] !== Infinity;

    // Highlight edges along optimal path
    const pathEdgeSet = new Set();
    if (isValidPath) {
      for (let i = 0; i < path.length - 1; i++) {
        pathEdgeSet.add(`${path[i]}-${path[i + 1]}`);
        pathEdgeSet.add(`${path[i + 1]}-${path[i]}`);
      }
    }

    this.renderEdges = edges.map(e => ({
      ...e,
      highlighted: pathEdgeSet.has(`${e.from}-${e.to}`)
    }));

    // Update Result Box
    const resBox = document.getElementById('m15-dijkstra-result');
    if (isValidPath) {
      resBox.innerHTML = `
        <div class="solution-header">
          <span class="solution-title">⚡ Eng Qisqa Yo'l Topildi!</span>
          <span class="badge badge-emerald">Masofa: ${dist[endNode]}</span>
        </div>
        <div class="step-card" style="border-left-color: #10b981;">
          <div class="step-num">Traektoriya: ${startNode} → ${endNode}</div>
          <div style="font-size: 17px; font-weight: 800; color: #34d399; margin-top: 4px;">
            ${path.join('  →  ')}
          </div>
        </div>
        <div class="step-card" style="border-left-color: #38bdf8; background: rgba(56, 189, 248, 0.08);">
          <div class="step-num" style="color: #38bdf8;">Minimal Masofa (Vazn)</div>
          <div style="font-size: 22px; font-weight: 800; color: #38bdf8;">D = ${dist[endNode]}</div>
        </div>
      `;
    } else {
      resBox.innerHTML = `
        <div class="solution-header">
          <span class="solution-title">Yo'l Topilmadi</span>
          <span class="badge badge-rose">Bog'lanmagan</span>
        </div>
        <div class="step-card" style="border-left-color: #f43f5e;">
          <div class="step-num">Natija</div>
          <div class="step-desc">${startNode} dan ${endNode} ga yetib boruvchi yo'l mavjud emas.</div>
        </div>
      `;
    }

    // Steps Table
    const stepsTable = document.getElementById('m15-dijkstra-steps-table');
    stepsTable.innerHTML = `
      <table class="glass-table">
        <thead>
          <tr>
            <th>Qadam</th>
            <th>Tanlangan Eng Yaqin Uch</th>
            ${nodes.map(u => `<th>d(${u})</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${steps.map(s => `
            <tr>
              <td>${s.step}</td>
              <td><span class="badge badge-primary">${s.selectedNode}</span></td>
              ${nodes.map(u => `
                <td class="${u === s.selectedNode ? 'cell-highlight' : ''}">
                  ${s.currentDistances[u] === Infinity ? '∞' : s.currentDistances[u]}
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    this.draw();
    this.runFloydWarshall();
  },

  runFloydWarshall() {
    if (!this.currentData) return;
    const { nodes, edges } = this.currentData;
    const n = nodes.length;

    // Dist matrix
    const dist = [];
    for (let i = 0; i < n; i++) {
      dist[i] = [];
      for (let j = 0; j < n; j++) {
        dist[i][j] = i === j ? 0 : Infinity;
      }
    }

    const nodeIndex = new Map(nodes.map((u, idx) => [u, idx]));
    edges.forEach(e => {
      const u = nodeIndex.get(e.from);
      const v = nodeIndex.get(e.to);
      if (u !== undefined && v !== undefined) {
        dist[u][v] = Math.min(dist[u][v], e.weight);
        dist[v][u] = Math.min(dist[v][u], e.weight);
      }
    });

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    const container = document.getElementById('m15-floyd-matrix-container');
    container.innerHTML = `
      <table class="glass-table">
        <thead>
          <tr><th>D_min</th>${nodes.map(u => `<th>${u}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${nodes.map((rowNode, i) => `
            <tr>
              <th>${rowNode}</th>
              ${nodes.map((colNode, j) => `
                <td class="${i === j ? 'cell-zero' : (dist[i][j] !== Infinity ? 'cell-one' : '')}">
                  ${dist[i][j] === Infinity ? '∞' : dist[i][j]}
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  draw() {
    this.graphCanvas = new InteractiveGraphCanvas('m15-path-canvas', { directed: false, physics: true });
    if (this.currentData) {
      const startNode = document.getElementById('m15-start-node').value.trim();
      const endNode = document.getElementById('m15-end-node').value.trim();

      const nodeObjs = this.currentData.nodes.map(u => ({
        id: u,
        label: u,
        color: u === startNode ? '#10b981' : (u === endNode ? '#ec4899' : '#6366f1'),
        highlighted: u === startNode || u === endNode
      }));

      this.graphCanvas.setData(nodeObjs, this.renderEdges || this.currentData.edges);
    }
  }
};

window.Module15 = Module15;
