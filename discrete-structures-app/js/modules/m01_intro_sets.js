/**
 * Module 1: Kirish. Diskret tuzilmalar va ularga misollar. Diskret va diskret bo'lmagan to'plamlar.
 */
const Module01 = {
  id: 'm01',
  title: "1. Kirish. Diskret tuzilmalar. Diskret va uzluksiz to'plamlar",
  shortTitle: "1. Kirish & To'plamlar turi",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Kirish. Diskret tuzilmalar va to'plamlar turlari</h2>
          <p>Diskret matematika — bir-biridan alohida, bo'linmaydigan (uzluksiz bo'lmagan) ob'ektlar bilan ishlovchi soha. Bu yerda diskret va uzluksiz to'plamlar, sanoqli va sanoqsiz to'plamlar quvvati tahlil qilinadi.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">Sanoqli: ℵ₀</span>
          <span class="badge badge-purple">Kontinuum: 𝔠</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module01.switchTab('calc')">📊 Tahlilchi va Kalkulyator</button>
        <button class="tab-btn" onclick="Module01.switchTab('visual')">📈 Vizual Sonlar O'qi</button>
        <button class="tab-btn" onclick="Module01.switchTab('theory')">📖 Nazariya va Qoidalar</button>
        <button class="tab-btn" onclick="Module01.switchTab('quiz')">🧠 Test va Mashqlar</button>
      </div>

      <!-- Tab 1: Analyzer -->
      <div id="m01-tab-calc" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">To'plamni tahlil qilish</h3>
            <div class="form-group">
              <label class="form-label">To'plamni tanlang yoki kiriting:
                <span class="form-hint">Masalan: N, Z, Q, R, [0, 1], (2, 5), {1, 3, 5}</span>
              </label>
              ${typeof SymbolHelper !== 'undefined' ? SymbolHelper.getToolbarHtml('m01-set-input', 'sets') : ''}
              <input type="text" id="m01-set-input" class="glass-input" value="N" placeholder="N, Z, Q, R, [a, b], {1, 2, 3}...">
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor namunalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module01.setExample('N')">N (Natural)</span>
                <span class="preset-pill" onclick="Module01.setExample('Z')">Z (Butun)</span>
                <span class="preset-pill" onclick="Module01.setExample('Q')">Q (Ratsional)</span>
                <span class="preset-pill" onclick="Module01.setExample('R')">R (Haqiqiy)</span>
                <span class="preset-pill" onclick="Module01.setExample('[0, 1]')">[0, 1] Kesma</span>
                <span class="preset-pill" onclick="Module01.setExample('{2, 4, 6, 8, 10}')">Chekli to'plam</span>
                <span class="preset-pill" onclick="Module01.setExample('(0, +inf)')">Yarim to'g'ri chiziq</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module01.analyzeSet()" style="width: 100%;">
              🔍 To'plamni Tahlil Qilish
            </button>
          </div>

          <!-- Result -->
          <div id="m01-result-box" class="solution-box">
            <div class="solution-header">
              <span class="solution-title">✨ Tahlil Natijalari</span>
              <span id="m01-status-badge" class="badge badge-cyan">Tayyor</span>
            </div>
            <div id="m01-analysis-content">
              <p style="color: var(--text-dim);">To'plamni tanlang va "Tahlil Qilish" tugmasini bosing.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Visual -->
      <div id="m01-tab-visual" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #38bdf8;">Sonlar o'qida tasvirlanish</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
            Diskret to'plamlar nuqtalar orasida bo'shliqlar bilan ajralgan bo'ladi. Uzluksiz to'plamlar esa sonlar o'qida yaxlit nur/kesma hosil qiladi.
          </p>
          <div class="canvas-wrapper">
            <canvas id="m01-numberline-canvas" class="canvas-area" style="height: 320px;"></canvas>
          </div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m01-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Diskret va Uzluksiz tuzilmalar farqi</div>
          <div class="theory-body">
            <ul>
              <li><strong>Diskret tuzilma:</strong> Elementlari alohida-alohida ajratilgan bo'lib, ikkita yaqin element orasida uzilish mavjud bo'lgan ob'ektlar (masalan: butun sonlar, graflar, mantiqiy qiymatlar).</li>
              <li><strong>Uzluksiz tuzilma:</strong> Ixtiyoriy ikki nuqta orasida cheksiz ko'p oraliq nuqtalar mavjud bo'lgan yaxlit tuzilma (masalan: haqiqiy sonlar o'qi, geometrik silliq chiziqlar).</li>
            </ul>
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Sanoqli va Sanoqsiz to'plamlar (Kantor teoremasi)</div>
          <div class="theory-body">
            <ul>
              <li><strong>Sanoqli to'plam:</strong> Elementlarini natural sonlar to'plami $\\mathbb{N} = \\{1, 2, 3, \\dots\\}$ bilan bir qiymatli mos qo'yish (biyeksiya o'rnatish) mumkin bo'lgan to'plam. Quvvati: $\\aleph_0$ (alef-nol).</li>
              <li>Misollar: $\\mathbb{N}$, $\\mathbb{Z}$ (butun sonlar), $\\mathbb{Q}$ (ratsional sonlar).</li>
              <li><strong>Sanoqsiz to'plam:</strong> Elementlarini raqamlab chiqish imkonsiz bo'lgan cheksiz to'plam. Quvvati: $\\mathfrak{c}$ (kontinuum). Misol: $\\mathbb{R}$ (haqiqiy sonlar) va har qanday $[a, b]$ kesma ($a < b$).</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tab 4: Quiz -->
      <div id="m01-tab-quiz" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #fbbf24;">O'z-o'zini tekshirish savollari</h3>
          <div id="m01-quiz-container"></div>
        </div>
      </div>
    `;
  },

  init() {
    this.analyzeSet();
    this.renderQuiz();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m01-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m01-tab-${tabId}`).classList.add('active');
    if (tabId === 'visual') {
      setTimeout(() => this.drawNumberLine(), 50);
    }
  },

  setExample(val) {
    document.getElementById('m01-set-input').value = val;
    this.analyzeSet();
  },

  analyzeSet() {
    const input = document.getElementById('m01-set-input').value.trim();
    const container = document.getElementById('m01-analysis-content');
    const badge = document.getElementById('m01-status-badge');

    let isDiscrete = false;
    let isCountable = false;
    let cardinality = '';
    let explanation = '';
    let typeName = '';

    const clean = input.toUpperCase().replace(/\s+/g, '');

    if (clean === 'N') {
      typeName = "Natural sonlar to'plami (ℕ)";
      isDiscrete = true;
      isCountable = true;
      cardinality = "ℵ₀ (Alef-nol, sanoqli cheksiz)";
      explanation = "Natural sonlar {1, 2, 3, ...} diskret to'plam bo'lib, elementlari bir-biridan kamida 1 birlik masofada ajralgan. U sanoqli cheksiz to'plamning etalonidir.";
    } else if (clean === 'Z') {
      typeName = "Butun sonlar to'plami (ℤ)";
      isDiscrete = true;
      isCountable = true;
      cardinality = "ℵ₀ (Sanoqli cheksiz)";
      explanation = "Butun sonlar {..., -2, -1, 0, 1, 2, ...} diskret to'plamdir. Kantor usulida 0, 1, -1, 2, -2 tartibida raqamlab chiqish mumkin, shuning uchun sanoqlidir (|ℤ| = ℵ₀).";
    } else if (clean === 'Q') {
      typeName = "Ratsional sonlar to'plami (ℚ)";
      isDiscrete = false; // Dense in R, but countable
      isCountable = true;
      cardinality = "ℵ₀ (Sanoqli cheksiz, lekin hamma joyda zich)";
      explanation = "Ratsional sonlar har qanday ikki son orasida cheksiz ko'p bo'lgani uchun 'zich' (dense), ammo Kantor diagonali yordamida to'liq natural sonlar bilan tartiblanishi (raqamlanishi) isbotlangan, demak u SANOQLI.";
    } else if (clean === 'R') {
      typeName = "Haqiqiy sonlar to'plami (ℝ)";
      isDiscrete = false;
      isCountable = false;
      cardinality = "𝔠 = 2^ℵ₀ (Kontinuum quvvat, sanoqsiz)";
      explanation = "Haqiqiy sonlar to'plami uzluksiz kontinuumni tashkil qiladi. Kantor diagonal usuli bilan ularni natural sonlar bilan biyeksiya qilib bo'lmasligi isbotlangan. Shuning uchun u SANOQSIZdir.";
    } else if (input.startsWith('[') || input.startsWith('(')) {
      typeName = "Haqiqiy sonlar oraliq/kesmasi: " + input;
      isDiscrete = false;
      isCountable = false;
      cardinality = "𝔠 (Kontinuum quvvat, sanoqsiz)";
      explanation = "Ixtiyoriy noldan farqli uzunlikdagi kesma [a, b] yoki oraliq (a, b) butun ℝ bilan teng quvvatlidir (| [a, b] | = |ℝ| = 𝔠). U uzluksiz va sanoqsizdir.";
    } else if (input.startsWith('{') && input.endsWith('}')) {
      const elements = input.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
      typeName = `Chekli to'plam (${elements.length} ta element)`;
      isDiscrete = true;
      isCountable = true;
      cardinality = `Chekli, |S| = ${elements.length}`;
      explanation = `To'plam aniq ${elements.length} ta ajratilgan elementdan iborat. Har qanday chekli to'plam diskret va sanoqlidir.`;
    } else {
      typeName = "Maxsus to'plam: " + input;
      isDiscrete = true;
      isCountable = true;
      cardinality = "Aniqlandi";
      explanation = "Kiritilgan to'plam diskret elementlar kombinatsiyasi sifatida qabul qilindi.";
    }

    badge.className = isDiscrete ? 'badge badge-emerald' : 'badge badge-purple';
    badge.innerText = isDiscrete ? 'Diskret' : 'Uzluksiz';

    container.innerHTML = `
      <div class="step-card">
        <div class="step-num">To'plam Turi</div>
        <div class="step-desc"><strong>${typeName}</strong></div>
      </div>
      <div class="step-card">
        <div class="step-num">Struktura turi (Diskretlik)</div>
        <div class="step-desc">
          ${isDiscrete ? '🟢 <strong>Diskret to\'plam:</strong> Elementlari orasida aniq uzilishlar mavjud.' : '🟣 <strong>Uzluksiz (yoki zich) to\'plam:</strong> Nuqtalar bir-biriga uzluksiz yondashgan.'}
        </div>
      </div>
      <div class="step-card">
        <div class="step-num">Quvvati va Sanoqliligi</div>
        <div class="step-desc">
          <strong>${cardinality}</strong><br>
          ${isCountable ? '✅ <strong>Sanoqli to\'plam:</strong> Elementlarini ketma-ket raqamlash mumkin.' : '❌ <strong>Sanoqsiz to\'plam:</strong> Kantor teoremasiga ko\'ra natural sonlar bilan bir qiymatli moslab bo\'lmaydi.'}
        </div>
      </div>
      <div class="step-card">
        <div class="step-num">Matematik izoh</div>
        <div class="step-desc">${explanation}</div>
      </div>
    `;

    this.currentSetInfo = { input, isDiscrete, isCountable };
    this.drawNumberLine();
  },

  drawNumberLine() {
    const canvas = document.getElementById('m01-numberline-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : 750;
    const w = parentW > 50 ? parentW : 750;
    const h = 320;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, w, h);

    const cy = h / 2;
    // Draw Axis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, cy);
    ctx.lineTo(w - 40, cy);
    ctx.stroke();

    // Arrows
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.moveTo(w - 35, cy);
    ctx.lineTo(w - 48, cy - 6);
    ctx.lineTo(w - 48, cy + 6);
    ctx.fill();

    const info = this.currentSetInfo || { isDiscrete: true, input: 'N' };
    const step = (w - 120) / 10;
    const startX = 60;

    // Draw Ticks
    for (let i = 0; i <= 10; i++) {
      const x = startX + i * step;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.moveTo(x, cy - 6);
      ctx.lineTo(x, cy + 6);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      const val = i - 5;
      ctx.fillText(val, x, cy + 22);
    }

    if (info.isDiscrete) {
      // Draw Glowing Discrete Points
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = 'rgba(52, 211, 153, 0.9)';
      ctx.shadowBlur = 15;

      for (let i = 0; i <= 10; i++) {
        const val = i - 5;
        if (info.input.toUpperCase() === 'N' && val <= 0) continue;
        const x = startX + i * step;
        ctx.beginPath();
        ctx.arc(x, cy, 7, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText("Diskret izolyatsiyalangan nuqtalar", w / 2, cy - 40);
    } else {
      // Draw Continuous Glowing Beam
      ctx.strokeStyle = '#06b6d4';
      ctx.shadowColor = 'rgba(6, 182, 212, 0.9)';
      ctx.shadowBlur = 18;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(startX + step * 2, cy);
      ctx.lineTo(startX + step * 8, cy);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("Uzluksiz kontinuum oraliq", w / 2, cy - 40);
    }
  },

  renderQuiz() {
    const questions = [
      {
        q: "Ratsional sonlar to'plami ℚ sanoqlimi?",
        options: ["Ha, sanoqli cheksiz (quvvati ℵ₀)", "Yo'q, sanoqsiz kontinuum", "Faqat musbat ratsional sonlar sanoqli"],
        correct: 0,
        explanation: "To'g'ri! Ratsional sonlarni Kantor diagonali orqali raqamlab chiqish mumkin, shuning uchun |ℚ| = ℵ₀."
      },
      {
        q: "[0, 1] kesmasi va butun ℝ haqiqiy sonlar to'plamining quvvati tengmi?",
        options: ["Teng emas, ℝ ancha katta", "Teng, ikkalasining quvvati kontinuum (𝔠)", "Kesma chekli, ℝ cheksiz"],
        correct: 1,
        explanation: "To'g'ri! Kantor isbotiga ko'ra, har qanday noldan katta kesma kontinuum quvvatiga ega bo'lib, butun haqiqiy sonlar to'plami bilan ekvivalentdir."
      }
    ];

    const container = document.getElementById('m01-quiz-container');
    if (!container) return;

    container.innerHTML = questions.map((item, idx) => `
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 8px; padding: 14px; margin-bottom: 12px;">
        <div style="font-weight: 600; margin-bottom: 10px; color: #f8fafc;">${idx + 1}. ${item.q}</div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${item.options.map((opt, optIdx) => `
            <button class="glass-btn glass-btn-secondary" style="justify-content: flex-start; text-align: left;" onclick="Module01.checkAnswer(${idx}, ${optIdx}, ${item.correct})">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div id="m01-quiz-feedback-${idx}" style="margin-top: 8px; font-size: 13px; display: none;"></div>
      </div>
    `).join('');
  },

  checkAnswer(qIdx, selected, correct) {
    const feedback = document.getElementById(`m01-quiz-feedback-${qIdx}`);
    feedback.style.display = 'block';
    if (selected === correct) {
      feedback.innerHTML = '<span style="color: #34d399; font-weight: 700;">✅ To\'g\'ri javob!</span>';
    } else {
      feedback.innerHTML = '<span style="color: #fb7185; font-weight: 700;">❌ Noto\'g\'ri, qaytadan o\'ylab ko\'ring.</span>';
    }
  }
};

window.Module01 = Module01;
