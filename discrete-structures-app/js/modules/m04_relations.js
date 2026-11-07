/**
 * Module 4: Munosabatlar turlari. Binar munosabatlar va ularning xossalari.
 */
const Module04 = {
  id: 'm04',
  title: "4. Munosabatlar turlari va xossalari",
  shortTitle: "4. Munosabatlar",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Munosabatlar turlari, Ekvivalentlik va Tranzitiv Yopilma</h2>
          <p>Binar munosabatlarni refleksivlik, simmetriklik, antisimetriklik va tranzitivlikka to'liq tekshiring. Ekvivalentlik sinflarini, faktor-to'plamni toping va Uorshall algoritmi bilan tranzitiv yopilmani hosil qiling.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">Ekvivalentlik</span>
          <span class="badge badge-emerald">Uorshall (Warshall)</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module04.switchTab('checker')">🔍 Munosabat Tahlili & Grafi</button>
        <button class="tab-btn" onclick="Module04.switchTab('warshall')">⚡ Tranzitiv Yopilma (Uorshall)</button>
        <button class="tab-btn" onclick="Module04.switchTab('theory')">📖 Xossalar Qoidalari</button>
      </div>

      <!-- Tab 1: Checker -->
      <div id="m04-tab-checker" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">To'plam va Munosabat Juftliklari</h3>

            <div class="form-group">
              <label class="form-label">To'plam A:
                <span class="form-hint">Elementlar vergul bilan</span>
              </label>
              <input type="text" id="m04-set-a" class="glass-input" value="1, 2, 3, 4">
            </div>

            <div class="form-group">
              <label class="form-label">Munosabat R juftliklari:
                <span class="form-hint">Masalan: (1,1), (1,2), (2,1), (2,2), (3,3), (4,4)</span>
              </label>
              ${typeof SymbolHelper !== 'undefined' ? SymbolHelper.getToolbarHtml('m04-pairs', 'relations') : ''}
              <textarea id="m04-pairs" class="glass-input" rows="3" style="resize: vertical;">(1,1), (1,2), (2,1), (2,2), (3,3), (4,4)</textarea>
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor namunalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module04.loadPreset('equivalence')">Ekvivalentlik munosabati</span>
                <span class="preset-pill" onclick="Module04.loadPreset('poset')">Qisman tartib (Poset)</span>
                <span class="preset-pill" onclick="Module04.loadPreset('strictly')">Qat'iy tartib (Tranzitiv, Asimmetrik)</span>
                <span class="preset-pill" onclick="Module04.loadPreset('modulo')">Mod 2 bo'yicha tenglik</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module04.analyzeRelation()" style="width: 100%;">
              🚀 Munosabatni Tekshirish va Grafni Chizish
            </button>
          </div>

          <!-- Canvas & Matrix -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="canvas-wrapper">
              <div class="canvas-toolbar">
                <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Munosabat Or-grafi</span>
                <span id="m04-type-badge" class="badge badge-emerald">Ekvivalentlik</span>
              </div>
              <canvas id="m04-graph-canvas" class="canvas-area" style="height: 320px;"></canvas>
            </div>

            <div id="m04-matrix-box" class="glass-panel" style="padding: 16px; overflow-x: auto;">
              <!-- Matrix rendered here -->
            </div>
          </div>
        </div>

        <!-- Full Analysis Report -->
        <div id="m04-analysis-report" class="solution-box" style="margin-top: 20px;">
          <!-- Detailed breakdown -->
        </div>
      </div>

      <!-- Tab 2: Warshall -->
      <div id="m04-tab-warshall" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #38bdf8;">Uorshall (Warshall) algoritmi bilan Tranzitiv Yopilma (R⁺)</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
            Algoritm qadamma-qadam oraliq uchlar orqali o'tuvchi barcha yo'llarni aniqlab, munosabatni minimal yangi juftliklar qo'shish bilan tranzitiv holatga keltiradi.
          </p>
          <div id="m04-warshall-steps"></div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m04-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Binar munosabatlarning 4 ta asosiy xossasi</div>
          <div class="theory-body">
            <ul>
              <li><strong>Refleksivlik:</strong> Har bir a ∈ A uchun (a, a) ∈ R. Matritsada bosh diogonal to'liq 1 lardan iborat bo'ladi.</li>
              <li><strong>Simmetriklik:</strong> Agar (a, b) ∈ R bo'lsa, u holda (b, a) ∈ R. Matritsa bosh diogonalga nisbatan simmetrik: M = Mᵀ.</li>
              <li><strong>Antisimetriklik:</strong> Agar (a, b) ∈ R va (b, a) ∈ R bo'lsa, faqat a = b bo'lgandagina mumkin. Ya'ni a ≠ b da qarama-qarshi yo'nalish bo'lishi mumkin emas.</li>
              <li><strong>Tranzitivlik:</strong> Agar (a, b) ∈ R va (b, c) ∈ R bo'lsa, albatta (a, c) ∈ R bo'lishi shart.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.analyzeRelation();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m04-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m04-tab-${tabId}`).classList.add('active');
    if (tabId === 'checker') {
      setTimeout(() => this.drawGraph(), 50);
    }
  },

  loadPreset(type) {
    if (type === 'equivalence') {
      document.getElementById('m04-set-a').value = "1, 2, 3, 4";
      document.getElementById('m04-pairs').value = "(1,1), (2,2), (3,3), (4,4), (1,2), (2,1), (3,4), (4,3)";
    } else if (type === 'poset') {
      document.getElementById('m04-set-a').value = "1, 2, 3";
      document.getElementById('m04-pairs').value = "(1,1), (2,2), (3,3), (1,2), (2,3), (1,3)";
    } else if (type === 'strictly') {
      document.getElementById('m04-set-a').value = "1, 2, 3, 4";
      document.getElementById('m04-pairs').value = "(1,2), (2,3), (3,4), (1,3), (1,4), (2,4)";
    } else if (type === 'modulo') {
      document.getElementById('m04-set-a').value = "1, 2, 3, 4, 5";
      // Mod 2: juftlar o'zaro, toqlar o'zaro
      document.getElementById('m04-pairs').value = "(1,1), (1,3), (1,5), (3,1), (3,3), (3,5), (5,1), (5,3), (5,5), (2,2), (2,4), (4,2), (4,4)";
    }
    this.analyzeRelation();
  },

  parsePairs(str) {
    const regex = /\(\s*([^,()]+)\s*,\s*([^,()]+)\s*\)/g;
    const pairs = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      pairs.push([match[1].trim(), match[2].trim()]);
    }
    return pairs;
  },

  analyzeRelation() {
    const rawA = document.getElementById('m04-set-a').value;
    const rawPairs = document.getElementById('m04-pairs').value;

    const elements = MathUtils.parseSet(rawA);
    const pairs = this.parsePairs(rawPairs);

    if (elements.length === 0) return;

    const props = MathUtils.checkRelationProperties(elements, pairs);
    this.currentData = { elements, pairs, props };

    // Update Type badge
    const badge = document.getElementById('m04-type-badge');
    if (props.isEquivalence) {
      badge.className = 'badge badge-emerald';
      badge.innerText = 'Ekvivalentlik munosabati';
    } else if (props.isPartialOrder) {
      badge.className = 'badge badge-purple';
      badge.innerText = 'Qisman tartib (Poset)';
    } else {
      badge.className = 'badge badge-primary';
      badge.innerText = 'Oddiy binar munosabat';
    }

    // Render Matrix
    this.renderMatrix(elements, pairs);

    // Render Report
    const report = document.getElementById('m04-analysis-report');
    report.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">📋 To'liq Xossalar Tahlili</span>
        <span class="badge ${props.isEquivalence ? 'badge-emerald' : 'badge-primary'}">
          ${props.isEquivalence ? 'Ekvivalentlik' : 'Tahlil yakunlandi'}
        </span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div class="step-card" style="border-left-color: ${props.reflexive ? '#10b981' : '#f43f5e'};">
          <div class="step-num">1. Refleksivlik</div>
          <div class="step-desc">
            ${props.reflexive ? '✅ <strong>Refleksiv:</strong> Barcha (a, a) juftliklar mavjud.' : `❌ <strong>Refleksiv emas:</strong> Yetishmayotgan juftliklar: ${props.missingReflexive.join(', ')}`}
          </div>
        </div>

        <div class="step-card" style="border-left-color: ${props.symmetric ? '#10b981' : '#f43f5e'};">
          <div class="step-num">2. Simmetriklik</div>
          <div class="step-desc">
            ${props.symmetric ? '✅ <strong>Simmetrik:</strong> Har bir (a, b) uchun (b, a) mavjud.' : `❌ <strong>Simmetrik emas:</strong> ${props.nonSymmetricPairs.slice(0, 2).join('; ')}`}
          </div>
        </div>

        <div class="step-card" style="border-left-color: ${props.antisymmetric ? '#10b981' : '#f43f5e'};">
          <div class="step-num">3. Antisimetriklik</div>
          <div class="step-desc">
            ${props.antisymmetric ? '✅ <strong>Antisimetrik:</strong> Bir vaqtda (a, b) va (b, a) (a ≠ b) juftliklar yo\'q.' : `❌ <strong>Antisimetrik emas:</strong> ${props.nonAntisymmetricPairs.slice(0, 2).join('; ')}`}
          </div>
        </div>

        <div class="step-card" style="border-left-color: ${props.transitive ? '#10b981' : '#f43f5e'};">
          <div class="step-num">4. Tranzitivlik</div>
          <div class="step-desc">
            ${props.transitive ? '✅ <strong>Tranzitiv:</strong> (a, b) va (b, c) mavjud bo\'lganda (a, c) ham mavjud.' : `❌ <strong>Tranzitiv emas:</strong> ${props.missingTransitive.slice(0, 2).join('; ')}`}
          </div>
        </div>
      </div>

      ${props.isEquivalence ? `
        <div class="step-card" style="margin-top: 14px; border-left-color: #34d399;">
          <div class="step-num">Ekvivalentlik sinflari va Faktor-to'plam A / R</div>
          <div class="step-desc">
            <strong>Ekvivalentlik sinflari:</strong><br>
            ${props.equivalenceClasses.map(cls => `<span class="badge badge-cyan" style="margin: 4px;">[${cls[0]}] = { ${cls.join(', ')} }</span>`).join('')}<br><br>
            <strong>Faktor-to'plam:</strong> A / R = { ${props.equivalenceClasses.map(cls => `{${cls.join(', ')}}`).join(', ')} }
          </div>
        </div>
      ` : ''}
    `;

    this.drawGraph();
    this.calculateWarshall();
  },

  renderMatrix(elements, pairs) {
    const pairSet = new Set(pairs.map(p => `${p[0]},${p[1]}`));
    const container = document.getElementById('m04-matrix-box');

    let html = `
      <div style="font-weight: 700; font-size: 13px; color: #cbd5e1; margin-bottom: 8px;">Munosabat Matritsasi (M_R)</div>
      <table class="glass-table">
        <thead>
          <tr>
            <th>R</th>
            ${elements.map(e => `<th>${e}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    elements.forEach(row => {
      html += `<tr><th>${row}</th>`;
      elements.forEach(col => {
        const has = pairSet.has(`${row},${col}`);
        html += `<td class="${has ? 'cell-one' : 'cell-zero'}">${has ? 1 : 0}</td>`;
      });
      html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  },

  drawGraph() {
    this.graphCanvas = new InteractiveGraphCanvas('m04-graph-canvas', { directed: true });
    if (this.currentData) {
      const nodes = this.currentData.elements.map(e => ({ id: e, label: e }));
      const edges = this.currentData.pairs.map(p => ({ from: p[0], to: p[1], directed: true }));
      this.graphCanvas.setData(nodes, edges);
    }
  },

  calculateWarshall() {
    if (!this.currentData) return;
    const { elements, pairs } = this.currentData;
    const n = elements.length;
    const pairSet = new Set(pairs.map(p => `${p[0]},${p[1]}`));

    // Initial 0/1 matrix
    const matrix = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(pairSet.has(`${elements[i]},${elements[j]}`) ? 1 : 0);
      }
      matrix.push(row);
    }

    const { closure, steps } = MathUtils.transitiveClosureWarshall(matrix);

    const stepsContainer = document.getElementById('m04-warshall-steps');
    stepsContainer.innerHTML = `
      <div class="step-card" style="border-left-color: #10b981; margin-bottom: 16px;">
        <div class="step-num">Tranzitiv Yopilma Matritsasi M_R⁺ (Yakuniy)</div>
        <div style="margin-top: 10px; overflow-x: auto;">
          <table class="glass-table">
            <thead>
              <tr><th>R⁺</th>${elements.map(e => `<th>${e}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${closure.map((row, i) => `
                <tr>
                  <th>${elements[i]}</th>
                  ${row.map(val => `<td class="${val ? 'cell-one' : 'cell-zero'}">${val}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div style="font-size: 13px; font-weight: 700; color: #cbd5e1; margin-bottom: 8px;">Uorshall algoritmi bosqichlari (W⁽ᵏ⁾):</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;">
        ${steps.map(s => `
          <div class="glass-panel" style="padding: 12px;">
            <div style="font-size: 12px; font-weight: 700; color: #818cf8; margin-bottom: 6px;">
              Qadam k = ${s.step} (Oraliq uch: ${elements[s.pivot]})
            </div>
            <table class="glass-table" style="font-size: 11px;">
              ${s.matrix.map(row => `
                <tr>${row.map(val => `<td class="${val ? 'cell-one' : 'cell-zero'}">${val}</td>`).join('')}</tr>
              `).join('')}
            </table>
          </div>
        `).join('')}
      </div>
    `;
  }
};

window.Module04 = Module04;
