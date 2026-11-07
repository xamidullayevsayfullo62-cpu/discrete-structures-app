/**
 * Module 9: Ikkilik mantiqiy elementlar (Logic Gates).
 * Interaktiv ventillar va sxemalar simulyatori.
 */
const Module09 = {
  id: 'm09',
  title: "9. Ikkilik mantiqiy elementlar & Sxemalar simulyatori",
  shortTitle: "9. Mantiqiy elementlar",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Ikkilik Mantiqiy Elementlar (Logic Gates) Simulyatori</h2>
          <p>AND, OR, NOT, NAND, NOR, XOR ventillarini jonli sinab ko'ring. Yarim jamlagich (Half Adder), To'liq jamlagich (Full Adder), Multipleksor va SR-triggerni interaktiv ishga tushiring.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-emerald">Jamlagich (Adder)</span>
          <span class="badge badge-cyan">Ventillar</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module09.switchTab('gates')">🔌 Asosiy Ventillar</button>
        <button class="tab-btn" onclick="Module09.switchTab('adder')">➕ Yarim va To'liq Jamlagich</button>
        <button class="tab-btn" onclick="Module09.switchTab('mux')">🔀 Multipleksor (MUX 2:1)</button>
        <button class="tab-btn" onclick="Module09.switchTab('theory')">📖 Sxemotexnika Qoidalari</button>
      </div>

      <!-- Tab 1: Gates -->
      <div id="m09-tab-gates" class="tab-pane active">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 16px; color: #818cf8;">Interaktiv Ventillar Sinovi</h3>
          <div id="m09-gates-container"></div>
        </div>
      </div>

      <!-- Tab 2: Adders -->
      <div id="m09-tab-adder" class="tab-pane">
        <div class="grid-2col">
          <!-- Half Adder -->
          <div class="glass-panel" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="font-size: 16px; color: #34d399;">Yarim Jamlagich (Half Adder)</h3>
              <span class="badge badge-primary">Sum = A ⊕ B, Carry = A ∧ B</span>
            </div>
            <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
              <span style="font-weight: 700;">Kirish A:</span>
              <button id="m09-ha-a" class="gate-switch on" onclick="Module09.toggleHA('A')">1</button>
              <span style="font-weight: 700;">Kirish B:</span>
              <button id="m09-ha-b" class="gate-switch on" onclick="Module09.toggleHA('B')">1</button>
            </div>
            <div id="m09-ha-result" class="solution-box"></div>
          </div>

          <!-- Full Adder -->
          <div class="glass-panel" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="font-size: 16px; color: #38bdf8;">To'liq Jamlagich (Full Adder)</h3>
              <span class="badge badge-cyan">3 ta kirish</span>
            </div>
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;">
              <span style="font-weight: 700;">A:</span>
              <button id="m09-fa-a" class="gate-switch on" onclick="Module09.toggleFA('A')">1</button>
              <span style="font-weight: 700;">B:</span>
              <button id="m09-fa-b" class="gate-switch" onclick="Module09.toggleFA('B')">0</button>
              <span style="font-weight: 700;">C_in (O'tish):</span>
              <button id="m09-fa-cin" class="gate-switch on" onclick="Module09.toggleFA('Cin')">1</button>
            </div>
            <div id="m09-fa-result" class="solution-box"></div>
          </div>
        </div>
      </div>

      <!-- Tab 3: MUX -->
      <div id="m09-tab-mux" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #a855f7;">2:1 Multipleksor (MUX) Simulyatori</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
            Boshqaruvchi signal (Select / S) yordamida ikkita axborot kanalidan (D0 yoki D1) birini chiqishga (Y) yo'naltiradi: Y = (¬S ∧ D0) ∨ (S ∧ D1).
          </p>
          <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px; flex-wrap: wrap;">
            <div class="glass-panel" style="padding: 10px 16px; display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700;">Kanal D0:</span>
              <button id="m09-mux-d0" class="gate-switch on" onclick="Module09.toggleMux('D0')">1</button>
            </div>
            <div class="glass-panel" style="padding: 10px 16px; display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700;">Kanal D1:</span>
              <button id="m09-mux-d1" class="gate-switch" onclick="Module09.toggleMux('D1')">0</button>
            </div>
            <div class="glass-panel" style="padding: 10px 16px; display: flex; align-items: center; gap: 8px; border-color: #a855f7;">
              <span style="font-weight: 700; color: #c084fc;">Tanlash (S):</span>
              <button id="m09-mux-s" class="gate-switch" onclick="Module09.toggleMux('S')">0</button>
            </div>
          </div>
          <div id="m09-mux-result" class="solution-box"></div>
        </div>
      </div>

      <!-- Tab 4: Theory -->
      <div id="m09-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Ikkilik mantiqiy elementlar (Ventillar) nima?</div>
          <div class="theory-body">
            Zamonaviy kompyuterlarning mikroprotsessorlari mantiqiy ventillardan tuzilgan. Har bir ventil kirishdagi kuchlanish (0V - past daraja "0", 3.3V/5V - yuqori daraja "1") asosida bitta Bul amalini bajaradi.
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.gatesState = { A: true, B: false };
    this.haState = { A: true, B: true };
    this.faState = { A: true, B: false, Cin: true };
    this.muxState = { D0: true, D1: false, S: false };

    this.renderGatesSimulator();
    this.updateHA();
    this.updateFA();
    this.updateMux();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m09-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m09-tab-${tabId}`).classList.add('active');
  },

  renderGatesSimulator() {
    const sim = new LogicCircuitSimulator('m09-gates-container');
    sim.renderCircuit(this.gatesState);

    // Attach listeners
    const btnA = document.getElementById('gate-btn-a');
    const btnB = document.getElementById('gate-btn-b');
    if (btnA) {
      btnA.onclick = () => {
        this.gatesState.A = !this.gatesState.A;
        this.renderGatesSimulator();
      };
    }
    if (btnB) {
      btnB.onclick = () => {
        this.gatesState.B = !this.gatesState.B;
        this.renderGatesSimulator();
      };
    }
  },

  toggleHA(v) {
    this.haState[v] = !this.haState[v];
    const btn = document.getElementById(`m09-ha-${v.toLowerCase()}`);
    btn.className = `gate-switch ${this.haState[v] ? 'on' : ''}`;
    btn.innerText = this.haState[v] ? '1' : '0';
    this.updateHA();
  },

  updateHA() {
    const a = this.haState.A ? 1 : 0;
    const b = this.haState.B ? 1 : 0;
    const sum = a ^ b;
    const carry = a & b;

    const res = document.getElementById('m09-ha-result');
    res.innerHTML = `
      <div class="step-card" style="border-left-color: #34d399;">
        <div class="step-num">Chiqishlar (Yig'indi va Katta razryadga o'tish)</div>
        <div style="display: flex; gap: 20px; font-size: 16px; font-weight: 700; margin-top: 6px;">
          <div>Sum (S): <span style="color: ${sum ? '#34d399' : '#94a3b8'};">${sum}</span></div>
          <div>Carry (C): <span style="color: ${carry ? '#34d399' : '#94a3b8'};">${carry}</span></div>
        </div>
      </div>
      <div class="math-block">
        Ikkilik qo'shish: ${a}₂ + ${b}₂ = ${carry}${sum}₂ (O'nlikda: ${a + b})
      </div>
    `;
  },

  toggleFA(v) {
    this.faState[v] = !this.faState[v];
    const btn = document.getElementById(`m09-fa-${v.toLowerCase()}`);
    btn.className = `gate-switch ${this.faState[v] ? 'on' : ''}`;
    btn.innerText = this.faState[v] ? '1' : '0';
    this.updateFA();
  },

  updateFA() {
    const a = this.faState.A ? 1 : 0;
    const b = this.faState.B ? 1 : 0;
    const cin = this.faState.Cin ? 1 : 0;

    const sum = (a ^ b) ^ cin;
    const cout = (a & b) | (cin & (a ^ b));

    const res = document.getElementById('m09-fa-result');
    res.innerHTML = `
      <div class="step-card" style="border-left-color: #38bdf8;">
        <div class="step-num">To'liq Jamlagich Chiqishlari</div>
        <div style="display: flex; gap: 20px; font-size: 16px; font-weight: 700; margin-top: 6px;">
          <div>Sum (S): <span style="color: ${sum ? '#38bdf8' : '#94a3b8'};">${sum}</span></div>
          <div>C_out: <span style="color: ${cout ? '#38bdf8' : '#94a3b8'};">${cout}</span></div>
        </div>
      </div>
      <div class="math-block">
        ${a} + ${b} + ${cin} (Cin) = ${a + b + cin} (Ikkilikda: ${cout}${sum}₂)
      </div>
    `;
  },

  toggleMux(v) {
    this.muxState[v] = !this.muxState[v];
    const btn = document.getElementById(`m09-mux-${v.toLowerCase()}`);
    btn.className = `gate-switch ${this.muxState[v] ? 'on' : ''}`;
    btn.innerText = this.muxState[v] ? '1' : '0';
    this.updateMux();
  },

  updateMux() {
    const d0 = this.muxState.D0 ? 1 : 0;
    const d1 = this.muxState.D1 ? 1 : 0;
    const s = this.muxState.S ? 1 : 0;

    const y = s === 0 ? d0 : d1;
    const activeChan = s === 0 ? 'D0' : 'D1';

    const res = document.getElementById('m09-mux-result');
    res.innerHTML = `
      <div class="step-card" style="border-left-color: #a855f7;">
        <div class="step-num">Multipleksor Chiqishi (Y)</div>
        <div style="font-size: 18px; font-weight: 800; color: #c084fc; margin-top: 4px;">
          Y = ${y} (Tanlangan kanal: <strong>${activeChan}</strong>)
        </div>
      </div>
      <div class="step-desc" style="margin-top: 8px;">
        Chunki S = ${s} bo'lganligi sababli multipleksor <strong>${activeChan}</strong> kanalining qiymatini (${y}) to'g'ridan-to'g'ri chiqishga uzatmoqda.
      </div>
    `;
  }
};

window.Module09 = Module09;
