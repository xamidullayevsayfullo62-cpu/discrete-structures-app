/**
 * Module 8: Mantiq qonunlari. Mantiq funksiyalari uchun rostlik jadvalini tuzish.
 * SDNF, SKNF va Jegalqin ko'phadi.
 */
const Module08 = {
  id: 'm08',
  title: "8. Mantiq qonunlari, Rostlik jadvali, SDNF va SKNF",
  shortTitle: "8. Rostlik jadvali",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Rostlik Jadvali Generator, SDNF, SKNF & Jegalqin Ko'phadi</h2>
          <p>Ixtiyoriy formulani kiriting: dastur to'liq rostlik jadvalini tuzadi, tavtologiya yoki ziddiyat ekanligini aniqlaydi, Mukammal DNS (SDNF), Mukammal KNS (SKNF) va Jegalqin ko'phadini avtomatik quradi.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">SDNF / SKNF</span>
          <span class="badge badge-purple">Jegalqin (⊕)</span>
          <span class="badge badge-cyan">Karno Xaritasi</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module08.switchTab('table')">📊 Rostlik Jadvali & Kanonik Shakllar</button>
        <button class="tab-btn" onclick="Module08.switchTab('karnaugh')">🗺️ Karno Xaritasi (K-Map)</button>
        <button class="tab-btn" onclick="Module08.switchTab('laws')">📖 Asosiy Mantiq Qonunlari</button>
      </div>

      <!-- Tab 1: Truth Table -->
      <div id="m08-tab-table" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">Mantiqiy Funksiyani Kiritish</h3>

            <div class="form-group">
              <label class="form-label">Formula (A, B, C, D o'zgaruvchilari):
                <span class="form-hint">Amallar: and, or, not, xor, ->, <-></span>
              </label>
              ${typeof SymbolHelper !== 'undefined' ? SymbolHelper.getToolbarHtml('m08-input-formula', 'logic') : ''}
              <input type="text" id="m08-input-formula" class="glass-input" value="(A -> B) and (B -> C) -> (A -> C)">
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Klassik mantiq qonunlari namunalari:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module08.loadFormula('(A -> B) and (B -> C) -> (A -> C)')">Tranzitivlik qonuni (Tavtologiya)</span>
                <span class="preset-pill" onclick="Module08.loadFormula('not (A and B) <-> (not A or not B)')">De Morgan 1-qonuni</span>
                <span class="preset-pill" onclick="Module08.loadFormula('(A -> B) <-> (not B -> not A)')">Kontrapozitsiya</span>
                <span class="preset-pill" onclick="Module08.loadFormula('A and not A')">Ziddiyat (Contradiction)</span>
                <span class="preset-pill" onclick="Module08.loadFormula('(A and B) or C')">3 o'zgaruvchili funksiya</span>
                <span class="preset-pill" onclick="Module08.loadFormula('(A xor B) xor C')">Juftlik / Parity funksiya</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module08.buildTable()" style="width: 100%;">
              ⚡ Jadval va Kanonik Shakllarni Qurish
            </button>
          </div>

          <!-- Canonical Forms Summary -->
          <div id="m08-canonical-box" class="solution-box">
            <!-- Canonical forms rendered here -->
          </div>
        </div>

        <!-- Truth Table Grid -->
        <div class="glass-panel" style="padding: 20px; margin-top: 20px; overflow-x: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-size: 15px; color: #cbd5e1;">Rostlik Jadvali (Truth Table)</h4>
            <span id="m08-table-status" class="badge badge-emerald">2ⁿ Qator</span>
          </div>
          <div id="m08-table-container"></div>
        </div>
      </div>

      <!-- Tab 2: Karnaugh -->
      <div id="m08-tab-karnaugh" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #38bdf8;">Karno Xaritasi (Karnaugh Map)</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
            Karno xaritasi mantiq funksiyalarini vizual soddalashtirish uchun Gray kodi bo'yicha tuzilgan maxsus matritsadir.
          </p>
          <div id="m08-karnaugh-container" style="overflow-x: auto;"></div>
        </div>
      </div>

      <!-- Tab 3: Laws -->
      <div id="m08-tab-laws" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. De Morgan qonunlari</div>
          <div class="theory-body">
            <ul>
              <li>¬(A ∧ B) ≡ ¬A ∨ ¬B (Ko'paytmaning inkori inkorlar yig'indisiga teng)</li>
              <li>¬(A ∨ B) ≡ ¬A ∧ ¬B (Yig'indining inkori inkorlar ko'paytmasiga teng)</li>
            </ul>
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. SDNF va SKNF ta'riflari</div>
          <div class="theory-body">
            <ul>
              <li><strong>SDNF (Mukammal diz'yunktiv normal shakl):</strong> Funksiya 1 qiymat qabul qilgan qatorlardagi elementar kon'yunksiyalar (mintermlar) ning diz'yunksiyasidir (∨).</li>
              <li><strong>SKNF (Mukammal kon'yunktiv normal shakl):</strong> Funksiya 0 qiymat qabul qilgan qatorlardagi elementar diz'yunksiyalar (makstermlar) ning kon'yunksiyasidir (∧).</li>
              <li><strong>Jegalqin ko'phadi:</strong> Funksiyaning faqat ∧ (ko'paytirish), ⊕ (mod 2 qo'shish) va 1 konstantasi orqali yoyilmasi.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.buildTable();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m08-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m08-tab-${tabId}`).classList.add('active');
  },

  loadFormula(f) {
    document.getElementById('m08-input-formula').value = f;
    this.buildTable();
  },

  buildTable() {
    const formula = document.getElementById('m08-input-formula').value.trim();
    const canBox = document.getElementById('m08-canonical-box');
    const tableContainer = document.getElementById('m08-table-container');
    const statusBadge = document.getElementById('m08-table-status');

    try {
      const data = MathUtils.generateTruthTable(formula);
      this.currentData = data;

      // Status badge
      if (data.isTautology) {
        statusBadge.className = 'badge badge-emerald';
        statusBadge.innerText = 'Tavtologiya (Ayniyat, hamma 1)';
      } else if (data.isContradiction) {
        statusBadge.className = 'badge badge-rose';
        statusBadge.innerText = 'Ziddiyat (Hamma 0)';
      } else {
        statusBadge.className = 'badge badge-cyan';
        statusBadge.innerText = 'Bajariluvchan (Neytral)';
      }

      // Render Canonical Box
      canBox.innerHTML = `
        <div class="solution-header">
          <span class="solution-title">📐 Kanonik Shakllar & Ko'phad</span>
          <span class="badge ${data.isTautology ? 'badge-emerald' : (data.isContradiction ? 'badge-rose' : 'badge-primary')}">
            ${data.isTautology ? 'Tavtologiya' : (data.isContradiction ? 'Ziddiyat' : 'Neytral')}
          </span>
        </div>

        <div class="step-card" style="border-left-color: #34d399;">
          <div class="step-num">SDNF (Mukammal DNS)</div>
          <div class="math-block" style="color: #34d399;">${data.sdnf}</div>
        </div>

        <div class="step-card" style="border-left-color: #f43f5e;">
          <div class="step-num">SKNF (Mukammal KNS)</div>
          <div class="math-block" style="color: #fb7185;">${data.sknf}</div>
        </div>

        <div class="step-card" style="border-left-color: #a855f7;">
          <div class="step-num">Jegalqin ko'phadi (Zhegalkin ⊕)</div>
          <div class="math-block" style="color: #c084fc;">P(X) = ${data.zhegalkin}</div>
        </div>
      `;

      // Render Truth Table
      let tableHtml = `
        <table class="glass-table">
          <thead>
            <tr>
              <th>#</th>
              ${data.variables.map(v => `<th>${v}</th>`).join('')}
              <th style="color: #38bdf8;">F (Natija)</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.table.forEach((row, idx) => {
        const isOne = row.result === 1;
        tableHtml += `
          <tr>
            <td>${idx}</td>
            ${data.variables.map(v => `<td>${row.values[v]}</td>`).join('')}
            <td class="${isOne ? 'cell-one' : 'cell-zero'}">${row.result}</td>
          </tr>
        `;
      });

      tableHtml += `</tbody></table>`;
      tableContainer.innerHTML = tableHtml;

      this.renderKarnaugh();
    } catch (e) {
      canBox.innerHTML = `
        <div class="step-card" style="border-left-color: #f43f5e;">
          <div class="step-num" style="color: #fb7185;">Xatolik</div>
          <div class="step-desc">${e.message}</div>
        </div>
      `;
    }
  },

  renderKarnaugh() {
    const container = document.getElementById('m08-karnaugh-container');
    if (!this.currentData) return;
    const { variables, table } = this.currentData;

    if (variables.length < 2 || variables.length > 4) {
      container.innerHTML = `<p style="color: var(--text-dim);">Karno xaritasi 2, 3 yoki 4 ta o'zgaruvchili funksiyalar uchun chiziladi (Sizda: ${variables.length} ta).</p>`;
      return;
    }

    if (variables.length === 2) {
      const [A, B] = variables;
      const getVal = (a, b) => {
        const r = table.find(row => row.values[A] === a && row.values[B] === b);
        return r ? r.result : 0;
      };
      container.innerHTML = `
        <table class="glass-table" style="max-width: 320px;">
          <thead>
            <tr><th>${A} \\ ${B}</th><th>${B}=0</th><th>${B}=1</th></tr>
          </thead>
          <tbody>
            <tr><th>${A}=0</th><td class="${getVal(0,0) ? 'cell-one':'cell-zero'}">${getVal(0,0)}</td><td class="${getVal(0,1) ? 'cell-one':'cell-zero'}">${getVal(0,1)}</td></tr>
            <tr><th>${A}=1</th><td class="${getVal(1,0) ? 'cell-one':'cell-zero'}">${getVal(1,0)}</td><td class="${getVal(1,1) ? 'cell-one':'cell-zero'}">${getVal(1,1)}</td></tr>
          </tbody>
        </table>
      `;
    } else if (variables.length === 3) {
      const [A, B, C] = variables;
      // Gray code: 00, 01, 11, 10
      const bcCombos = [[0,0], [0,1], [1,1], [1,0]];
      const getVal = (a, b, c) => {
        const r = table.find(row => row.values[A] === a && row.values[B] === b && row.values[C] === c);
        return r ? r.result : 0;
      };
      container.innerHTML = `
        <table class="glass-table" style="max-width: 500px;">
          <thead>
            <tr><th>${A} \\ ${B}${C}</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
          </thead>
          <tbody>
            <tr><th>${A}=0</th>${bcCombos.map(([b, c]) => `<td class="${getVal(0,b,c)?'cell-one':'cell-zero'}">${getVal(0,b,c)}</td>`).join('')}</tr>
            <tr><th>${A}=1</th>${bcCombos.map(([b, c]) => `<td class="${getVal(1,b,c)?'cell-one':'cell-zero'}">${getVal(1,b,c)}</td>`).join('')}</tr>
          </tbody>
        </table>
      `;
    }
  }
};

window.Module08 = Module08;
