/**
 * Module 7: Bul algebrasi. Mulohaza tushunchasi. Mulohazalar ustida ikkilik mantiqiy amallar.
 */
const Module07 = {
  id: 'm07',
  title: "7. Bul algebrasi & Ikkilik mantiqiy amallar",
  shortTitle: "7. Bul algebrasi",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Bul algebrasi. Mulohazalar ustida mantiqiy amallar</h2>
          <p>Mulohazalar, inkor, kon'yunksiya, diz'yunksiya, implikatsiya, ekvivalensiya, XOR, Sheffer shtrixi va Pirs strelkasi amallarini o'rganing va murakkab formulalarni bosqichma-bosqich hisoblang.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">∧, ∨, ¬, →, ↔</span>
          <span class="badge badge-cyan">⊕, NAND, NOR</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module07.switchTab('operations')">🔣 8 ta Asosiy Mantiqiy Amal</button>
        <button class="tab-btn" onclick="Module07.switchTab('evaluator')">⚡ Ifoda Hisoblagich</button>
        <button class="tab-btn" onclick="Module07.switchTab('theory')">📖 Nazariya va Qoidalar</button>
      </div>

      <!-- Tab 1: Operations -->
      <div id="m07-tab-operations" class="tab-pane active">
        <div class="glass-panel" style="padding: 20px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-weight: 700; color: #818cf8;">A qiymati:</span>
              <button id="m07-toggle-a" class="gate-switch on" onclick="Module07.toggleVar('A')">1</button>
              <span style="font-weight: 700; color: #818cf8; margin-left: 16px;">B qiymati:</span>
              <button id="m07-toggle-b" class="gate-switch" onclick="Module07.toggleVar('B')">0</button>
            </div>
            <span class="badge badge-emerald">Tugmalarni bosib qiymatni o'zgartiring</span>
          </div>
        </div>

        <div class="grid-2col" id="m07-ops-grid">
          <!-- 8 Operation Cards rendered here -->
        </div>
      </div>

      <!-- Tab 2: Evaluator -->
      <div id="m07-tab-evaluator" class="tab-pane">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #38bdf8;">Ixtiyoriy Bul Ifodasini Baholash</h3>
            <div class="form-group">
              <label class="form-label">Mantiqiy ifoda:
                <span class="form-hint">Amallar: and, or, not, xor, ->, <-></span>
              </label>
              ${typeof SymbolHelper !== 'undefined' ? SymbolHelper.getToolbarHtml('m07-expr-input', 'logic') : ''}
              <input type="text" id="m07-expr-input" class="glass-input" value="(A and B) -> (not C or A)">
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor namunalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module07.setExpr('(A and B) -> (not C or A)')">Implikatsiya zanjiri</span>
                <span class="preset-pill" onclick="Module07.setExpr('(A or B) and (not A or C)')">Rezolutsiya</span>
                <span class="preset-pill" onclick="Module07.setExpr('A xor B xor C')">3 ta kirishli XOR</span>
                <span class="preset-pill" onclick="Module07.setExpr('not (A and B) <-> (not A or not B)')">De Morgan qonuni</span>
              </div>
            </div>

            <div id="m07-var-toggles" style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;"></div>

            <button class="glass-btn glass-btn-primary" onclick="Module07.evaluateExpression()" style="width: 100%;">
              🔍 Ifodani Bosqichma-bosqich Hisoblash
            </button>
          </div>

          <div id="m07-eval-result" class="solution-box">
            <!-- Result here -->
          </div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m07-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Mulohaza nima?</div>
          <div class="theory-body">
            <strong>Mulohaza</strong> — mazmuniga ko'ra rost (1, True) yoki yolg'on (0, False) deb tasdiqlash mumkin bo'lgan darak gapdir. Mulohaza bir vaqtning o'zida ham rost, ham yolg'on bo'la olmaydi.
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Implikatsiya (A → B) xususiyati</div>
          <div class="theory-body">
            Implikatsiya "Agar A bo'lsa, u holda B" deb o'qiladi. U faqat bitta holatda: A rost (1) bo'lib, B yolg'on (0) bo'lgandagina yolg'on (0) bo'ladi. Yolg'on farazdan har qanday xulosa chiqishi rost hisoblanadi (0 → 0 = 1, 0 → 1 = 1).
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.state = { A: true, B: false };
    this.renderOperations();
    this.setupEvaluatorVars();
    this.evaluateExpression();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m07-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m07-tab-${tabId}`).classList.add('active');
  },

  toggleVar(v) {
    this.state[v] = !this.state[v];
    const btn = document.getElementById(`m07-toggle-${v.toLowerCase()}`);
    btn.className = `gate-switch ${this.state[v] ? 'on' : ''}`;
    btn.innerText = this.state[v] ? '1' : '0';
    this.renderOperations();
  },

  renderOperations() {
    const { A, B } = this.state;
    const a = A ? 1 : 0;
    const b = B ? 1 : 0;

    const ops = [
      {
        name: "Inkor (Negation / NOT)",
        sym: "¬A",
        val: !A ? 1 : 0,
        desc: "A ning qiymatini teskarisiga o'zgartiradi",
        calc: `¬(${a}) = ${!A ? 1 : 0}`
      },
      {
        name: "Kon'yunksiya (Conjunction / AND)",
        sym: "A ∧ B",
        val: A && B ? 1 : 0,
        desc: "Faqat ikkala mulohaza ham rost (1) bo'lganda rost",
        calc: `${a} ∧ ${b} = ${A && B ? 1 : 0}`
      },
      {
        name: "Diz'yunksiya (Disjunction / OR)",
        sym: "A ∨ B",
        val: A || B ? 1 : 0,
        desc: "Kamida bitta mulohaza rost (1) bo'lsa rost",
        calc: `${a} ∨ ${b} = ${A || B ? 1 : 0}`
      },
      {
        name: "Implikatsiya (Implication)",
        sym: "A → B",
        val: (!A || B) ? 1 : 0,
        desc: "Faqat 1 → 0 holatida yolg'on (0), qolgan barchasida rost (1)",
        calc: `${a} → ${b} = ${(!A || B) ? 1 : 0}`
      },
      {
        name: "Ekvivalensiya (Equivalence)",
        sym: "A ↔ B",
        val: (A === B) ? 1 : 0,
        desc: "Ikkala mulohaza qiymati bir xil bo'lganda rost",
        calc: `${a} ↔ ${b} = ${(A === B) ? 1 : 0}`
      },
      {
        name: "Qat'iy diz'yunksiya (XOR)",
        sym: "A ⊕ B",
        val: (A !== B) ? 1 : 0,
        desc: "Faqat biri rost va biri yolg'on bo'lganda rost (1)",
        calc: `${a} ⊕ ${b} = ${(A !== B) ? 1 : 0}`
      },
      {
        name: "Sheffer shtrixi (NAND)",
        sym: "A | B",
        val: !(A && B) ? 1 : 0,
        desc: "Kon'yunksiyaning inkori: ¬(A ∧ B)",
        calc: `¬(${a} ∧ ${b}) = ${!(A && B) ? 1 : 0}`
      },
      {
        name: "Pirs strelkasi (NOR)",
        sym: "A ↓ B",
        val: !(A || B) ? 1 : 0,
        desc: "Diz'yunksiyaning inkori: ¬(A ∨ B)",
        calc: `¬(${a} ∨ ${b}) = ${!(A || B) ? 1 : 0}`
      }
    ];

    const container = document.getElementById('m07-ops-grid');
    container.innerHTML = ops.map(op => `
      <div class="glass-panel" style="padding: 16px; border-color: ${op.val ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-glass)'};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-weight: 700; color: #f8fafc; font-size: 14px;">${op.name}</span>
          <span class="badge ${op.val ? 'badge-emerald' : 'badge-rose'}">${op.val ? 'ROST (1)' : 'YOLG\'ON (0)'}</span>
        </div>
        <div style="font-size: 12px; color: var(--text-dim); margin-bottom: 8px;">${op.desc}</div>
        <div class="math-block" style="font-size: 13px;">${op.calc}</div>
      </div>
    `).join('');
  },

  setExpr(expr) {
    document.getElementById('m07-expr-input').value = expr;
    this.setupEvaluatorVars();
    this.evaluateExpression();
  },

  setupEvaluatorVars() {
    const expr = document.getElementById('m07-expr-input').value;
    const vars = MathUtils.extractVariables(expr);
    this.evalVars = this.evalVars || {};
    vars.forEach(v => {
      if (this.evalVars[v] === undefined) this.evalVars[v] = true;
    });

    const container = document.getElementById('m07-var-toggles');
    container.innerHTML = vars.map(v => `
      <div class="glass-panel" style="padding: 8px 12px; display: flex; align-items: center; gap: 8px;">
        <span style="font-weight: 700; color: #818cf8;">${v}:</span>
        <button class="gate-switch ${this.evalVars[v] ? 'on' : ''}" onclick="Module07.toggleEvalVar('${v}')">
          ${this.evalVars[v] ? '1' : '0'}
        </button>
      </div>
    `).join('');
  },

  toggleEvalVar(v) {
    this.evalVars[v] = !this.evalVars[v];
    this.setupEvaluatorVars();
    this.evaluateExpression();
  },

  evaluateExpression() {
    const expr = document.getElementById('m07-expr-input').value;
    const resBox = document.getElementById('m07-eval-result');

    try {
      const vars = MathUtils.extractVariables(expr);
      const scope = {};
      vars.forEach(v => (scope[v] = !!this.evalVars[v]));

      const result = MathUtils.evaluateBooleanExpr(expr, scope);

      resBox.innerHTML = `
        <div class="solution-header">
          <span class="solution-title">⚡ Hisoblash Natijasi</span>
          <span class="badge ${result ? 'badge-emerald' : 'badge-rose'}">
            ${result ? '1 (ROST)' : '0 (YOLG\'ON)'}
          </span>
        </div>
        <div class="step-card" style="border-left-color: #06b6d4;">
          <div class="step-num">Berilgan Ifoda</div>
          <div class="math-block">${expr}</div>
        </div>
        <div class="step-card" style="border-left-color: #818cf8;">
          <div class="step-num">O'zgaruvchilar Qiymatlari</div>
          <div class="step-desc">
            ${Object.entries(scope).map(([k, val]) => `<strong>${k}</strong> = ${val ? '1' : '0'}`).join(', ')}
          </div>
        </div>
        <div class="step-card" style="border-left-color: ${result ? '#10b981' : '#f43f5e'}; background: ${result ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)'};">
          <div class="step-num">Yakuniy Natija</div>
          <div style="font-size: 22px; font-weight: 800; color: ${result ? '#34d399' : '#fb7185'};">
            F = ${result ? '1 (TRUE)' : '0 (FALSE)'}
          </div>
        </div>
      `;
    } catch (e) {
      resBox.innerHTML = `
        <div class="step-card" style="border-left-color: #f43f5e;">
          <div class="step-num" style="color: #fb7185;">Xatolik</div>
          <div class="step-desc">${e.message}</div>
        </div>
      `;
    }
  }
};

window.Module07 = Module07;
