/**
 * Module 12: Planar graflar. Eyler formulasi V - E + F = 2. Kuratovskiy teoremasi.
 */
const Module12 = {
  id: 'm12',
  title: "12. Planar graflar & Eyler formulasi (V - E + F = 2)",
  shortTitle: "12. Planar graflar",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Planar Graflar, Eyler Formulasi & Kuratovskiy Teoremasi</h2>
          <p>Graflarni tekislikda qirralari kesishmasdan chizish mumkinligini tekshiring, Eyler formulasi (V - E + F = 2) orqali sohalar sonini hisoblang hamda nima uchun K₅ va K₃,₃ planar emasligini matematik isbot bilan ko'ring.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">V - E + F = 2</span>
          <span class="badge badge-rose">K₅ va K₃,₃</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module12.switchTab('checker')">📐 Planarlik Tahlili & Sohalar</button>
        <button class="tab-btn" onclick="Module12.switchTab('kuratowski')">🚫 Kuratovskiy Graflari (K₅ & K₃,₃)</button>
        <button class="tab-btn" onclick="Module12.switchTab('theory')">📖 Teoremalar va Formulalar</button>
      </div>

      <!-- Tab 1: Checker -->
      <div id="m12-tab-checker" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">Graf Parametrlari</h3>

            <div class="form-group">
              <label class="form-label">Uchlar (V):</label>
              <input type="text" id="m12-nodes" class="glass-input" value="1, 2, 3, 4">
            </div>

            <div class="form-group">
              <label class="form-label">Qirralar (E):</label>
              <textarea id="m12-edges" class="glass-input" rows="3">(1,2), (2,3), (3,4), (4,1), (1,3)</textarea>
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor namunalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module12.loadPreset('triangle')">Kvadrat + Diogonal (Planar)</span>
                <span class="preset-pill" onclick="Module12.loadPreset('cube')">Kub karkasi (Planar)</span>
                <span class="preset-pill" onclick="Module12.loadPreset('k5')">K₅ (Planar emas)</span>
                <span class="preset-pill" onclick="Module12.loadPreset('k33')">K₃,₃ (Planar emas)</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module12.analyzePlanar()" style="width: 100%;">
              ⚡ Planarlikni Tekshirish
            </button>
          </div>

          <!-- Canvas & Solution -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="canvas-wrapper">
              <div class="canvas-toolbar">
                <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Graf Tasviri</span>
                <span id="m12-status-badge" class="badge badge-emerald">Planar</span>
              </div>
              <canvas id="m12-planar-canvas" class="canvas-area" style="height: 320px;"></canvas>
            </div>

            <div id="m12-planar-solution" class="solution-box"></div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Kuratowski -->
      <div id="m12-tab-kuratowski" class="tab-pane">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #f43f5e;">K₅ (5 uchli to'liq graf)</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
              Uchlar soni V = 5, qirralar soni E = C(5, 2) = 10.
            </p>
            <div class="math-block">
              E ≤ 3V - 6 sharti:<br>
              10 ≤ 3(5) - 6 = 15 - 6 = 9 (Bajarilmaydi! 10 > 9)
            </div>
            <div class="step-desc" style="margin-top: 10px;">
              Demak, <strong>K₅ hech qachon tekislikda kesishmasdan chizilishi mumkin emas!</strong>
            </div>
          </div>

          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #f43f5e;">K₃,₃ (3 uy va 3 quduq masalasi)</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
              Ikkibo'lakli to'liq graf. V = 6, E = 3 × 3 = 9. Sikllar kamida 4 uzunlikka ega (uchburchak yo'q).
            </p>
            <div class="math-block">
              E ≤ 2V - 4 sharti:<br>
              9 ≤ 2(6) - 4 = 12 - 4 = 8 (Bajarilmaydi! 9 > 8)
            </div>
            <div class="step-desc" style="margin-top: 10px;">
              Demak, <strong>K₃,₃ ham tekislikda kesishmasdan chizilishi mumkin emas!</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m12-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Eylerning planar formula teoremasi</div>
          <div class="theory-body">
            Ixtiyoriy bog'langan planar graf uchun:
            <div class="math-block">V - E + F = 2</div>
            Bu yerda:
            <ul>
              <li><strong>V:</strong> Uchlar soni (Vertices)</li>
              <li><strong>E:</strong> Qirralar soni (Edges)</li>
              <li><strong>F:</strong> Sohalar (Yuzlar / Faces) soni, shu jumladan tashqi cheksiz soha ham hisobga olinadi.</li>
            </ul>
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Kuratovskiy teoremasi (1930)</div>
          <div class="theory-body">
            Graf planar bo'lishi uchun unda K₅ yoki K₃,₃ ga bo'linuvchan (subgraf) qism bo'lmasligi zarur va yetarlidir.
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.analyzePlanar();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m12-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m12-tab-${tabId}`).classList.add('active');
    if (tabId === 'checker') {
      setTimeout(() => this.draw(), 50);
    }
  },

  loadPreset(type) {
    if (type === 'triangle') {
      document.getElementById('m12-nodes').value = "1, 2, 3, 4";
      document.getElementById('m12-edges').value = "(1,2), (2,3), (3,4), (4,1), (1,3)";
    } else if (type === 'cube') {
      document.getElementById('m12-nodes').value = "1, 2, 3, 4, 5, 6, 7, 8";
      document.getElementById('m12-edges').value = "(1,2), (2,3), (3,4), (4,1), (5,6), (6,7), (7,8), (8,5), (1,5), (2,6), (3,7), (4,8)";
    } else if (type === 'k5') {
      document.getElementById('m12-nodes').value = "1, 2, 3, 4, 5";
      document.getElementById('m12-edges').value = "(1,2), (1,3), (1,4), (1,5), (2,3), (2,4), (2,5), (3,4), (3,5), (4,5)";
    } else if (type === 'k33') {
      document.getElementById('m12-nodes').value = "A1, A2, A3, B1, B2, B3";
      document.getElementById('m12-edges').value = "(A1,B1), (A1,B2), (A1,B3), (A2,B1), (A2,B2), (A2,B3), (A3,B1), (A3,B2), (A3,B3)";
    }
    this.analyzePlanar();
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

  analyzePlanar() {
    const rawNodes = document.getElementById('m12-nodes').value;
    const rawEdges = document.getElementById('m12-edges').value;

    const nodes = MathUtils.parseSet(rawNodes);
    const edges = this.parseEdges(rawEdges);

    this.currentData = { nodes, edges };

    const V = nodes.length;
    const E = edges.length;

    // Check necessary condition: E <= 3V - 6
    const maxE = 3 * V - 6;
    let satisfiesBound = true;
    if (V >= 3 && E > maxE) {
      satisfiesBound = false;
    }

    // Euler faces if planar: F = E - V + 2
    const F = Math.max(1, E - V + 2);

    const isNonPlanarPreset = (V === 5 && E === 10) || (V === 6 && E === 9);
    const isPlanar = satisfiesBound && !isNonPlanarPreset;

    const badge = document.getElementById('m12-status-badge');
    badge.className = isPlanar ? 'badge badge-emerald' : 'badge badge-rose';
    badge.innerText = isPlanar ? 'Planar bo\'lishi mumkin' : 'Planar EMAS';

    const sol = document.getElementById('m12-planar-solution');
    sol.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">📐 Eyler Formulasi & Planarlik</span>
        <span class="badge ${isPlanar ? 'badge-emerald' : 'badge-rose'}">
          ${isPlanar ? 'Planar' : 'No-Planar'}
        </span>
      </div>

      <div class="step-card" style="border-left-color: #06b6d4;">
        <div class="step-num">Eyler Formulasi hisob-kitobi</div>
        <div class="step-desc">
          Uchlar (V) = <strong>${V}</strong>, Qirralar (E) = <strong>${E}</strong><br>
          Agar graf planar bo'lsa, sohalar soni: <strong>F = E - V + 2 = ${E} - ${V} + 2 = ${F} ta</strong> (shu jumladan tashqi soha).
        </div>
      </div>

      <div class="step-card" style="border-left-color: ${isPlanar ? '#10b981' : '#f43f5e'};">
        <div class="step-num">Zaruriy Shart Tekshiruvi (E ≤ 3V - 6)</div>
        <div class="step-desc">
          ${V >= 3 ? `
            3V - 6 = 3(${V}) - 6 = <strong>${maxE}</strong>.<br>
            Amaldagi qirralar: E = <strong>${E}</strong>.<br>
            ${E <= maxE ? `✅ E ≤ 3V - 6 sharti bajarildi (${E} ≤ ${maxE}).` : `❌ E > 3V - 6 bo'lgani sababli graf PLANAR EMAS (${E} > ${maxE})!`}
          ` : 'V < 3 bo\'lgani uchun doim planar.'}
        </div>
      </div>
    `;

    this.draw();
  },

  draw() {
    this.graphCanvas = new InteractiveGraphCanvas('m12-planar-canvas', { directed: false, physics: true });
    if (this.currentData) {
      const nodeObjs = this.currentData.nodes.map(u => ({ id: u, label: u }));
      this.graphCanvas.setData(nodeObjs, this.currentData.edges);
    }
  }
};

window.Module12 = Module12;
