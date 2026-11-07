/**
 * Module 5: Kombinatorikaning asosiy qoidalari.
 */
const Module05 = {
  id: 'm05',
  title: "5. Kombinatorikaning asosiy qoidalari va formulalari",
  shortTitle: "5. Kombinatorika",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>Kombinatorikaning asosiy qoidalari & Paskal uchburchagi</h2>
          <p>Qo'shish va ko'paytirish qoidalari, faktorial, permutatsiya, o'rinlashtirish va guruhlash (takrorli va takrorsiz). Har bir misolning to'liq qadamma-qadam formulasi va yechimini ko'ring.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">Pₙ, Aₙᵏ, Cₙᵏ</span>
          <span class="badge badge-cyan">BigInt Aniqlik</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module05.switchTab('calc')">🧮 Asosiy Kalkulyator</button>
        <button class="tab-btn" onclick="Module05.switchTab('pascal')">🔺 Paskal Uchburchagi</button>
        <button class="tab-btn" onclick="Module05.switchTab('generator')">📋 Elementlar Ro'yxatini Generatsiya Qilish</button>
        <button class="tab-btn" onclick="Module05.switchTab('theory')">📖 Formulalar Jadvali</button>
      </div>

      <!-- Tab 1: Calculator -->
      <div id="m05-tab-calc" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">Formula va Qiymatlarni Tanlash</h3>

            <div class="form-group">
              <label class="form-label">Hisoblash turini tanlang:</label>
              <select id="m05-calc-type" class="glass-input" onchange="Module05.updateInputs()">
                <option value="combination">Guruhlash / Kombinatsiya Cₙᵏ (Takrorsiz)</option>
                <option value="combination_rep">Guruhlash C̄ₙᵏ (Takrorli)</option>
                <option value="arrangement">O'rinlashtirish Aₙᵏ (Takrorsiz)</option>
                <option value="arrangement_rep">O'rinlashtirish Āₙᵏ (Takrorli)</option>
                <option value="permutation">Permutatsiya Pₙ = n!</option>
                <option value="permutation_rep">Permutatsiya (Takrorli / Harflar soni)</option>
                <option value="subfactorial">Subfaktorial !n (Derangements / Tartibsiz)</option>
              </select>
            </div>

            <div class="grid-2col" id="m05-nk-inputs">
              <div class="form-group">
                <label class="form-label">Jami elementlar soni (n):</label>
                <input type="number" id="m05-input-n" class="glass-input" value="10" min="0" max="1000">
              </div>
              <div class="form-group" id="m05-group-k">
                <label class="form-label">Tanlanadiganlar soni (k):</label>
                <input type="number" id="m05-input-k" class="glass-input" value="3" min="0" max="1000">
              </div>
            </div>

            <div class="form-group" id="m05-group-word" style="display: none;">
              <label class="form-label">So'z yoki harflar (masalan: ANANAS, MATEMATIKA):</label>
              <input type="text" id="m05-input-word" class="glass-input" value="ANANAS">
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor masalalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module05.loadPreset('lotto')">Lotto (36 dan 5)</span>
                <span class="preset-pill" onclick="Module05.loadPreset('ananas')">"ANANAS" so'zi</span>
                <span class="preset-pill" onclick="Module05.loadPreset('passcode')">4 xonali PIN kod</span>
                <span class="preset-pill" onclick="Module05.loadPreset('podium')">10 yuguruvchi 3 ta sovrin</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module05.calculate()" style="width: 100%;">
              ⚡ Hisoblash va Qadamma-Qadam Yechim
            </button>
          </div>

          <!-- Solution Box -->
          <div id="m05-solution" class="solution-box">
            <!-- Results rendered here -->
          </div>
        </div>
      </div>

      <!-- Tab 2: Pascal -->
      <div id="m05-tab-pascal" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 16px; color: #38bdf8;">Paskal Uchburchagi (Kombinatsiyalar Geometriyasi)</h3>
            <div style="display: flex; align-items: center; gap: 8px;">
              <label style="font-size: 13px; color: var(--text-muted);">Qatorlar soni:</label>
              <input type="number" id="m05-pascal-rows" class="glass-input" style="width: 70px;" value="9" min="3" max="14" onchange="Module05.renderPascal()">
            </div>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">
            Har bir katak ustidagi ikki sonning yig'indisiga teng: Cₙᵏ = Cₙ₋₁ᵏ₋₁ + Cₙ₋₁ᵏ. Katakka bosing va uning kombinatorik formulasini ko'ring!
          </p>
          <div id="m05-pascal-container" class="pascal-triangle"></div>
          <div id="m05-pascal-info" style="margin-top: 14px; text-align: center; font-size: 14px; color: #38bdf8;"></div>
        </div>
      </div>

      <!-- Tab 3: Generator -->
      <div id="m05-tab-generator" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #10b981;">Barcha kombinatsiyalar va o'rin almashtirishlar ro'yxati</h3>
          <div class="form-group">
            <label class="form-label">Elementlarni kiriting (vergul bilan):</label>
            <input type="text" id="m05-gen-elements" class="glass-input" value="A, B, C, D">
          </div>
          <div class="grid-2col">
            <button class="glass-btn glass-btn-primary" onclick="Module05.generatePerms()">
              🔄 Barcha Permutatsiyalarni hosil qilish (n!)
            </button>
            <button class="glass-btn glass-btn-secondary" onclick="Module05.generateCombs()">
              🎯 Barcha Guruhlashlarni hosil qilish (k=2)
            </button>
          </div>
          <div id="m05-gen-results" style="margin-top: 16px;"></div>
        </div>
      </div>

      <!-- Tab 4: Theory -->
      <div id="m05-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Kombinatorika formulalari qisqacha ma'lumotnomasi</div>
          <div class="theory-body">
            <ul>
              <li><strong>Permutatsiya (Takrorsiz):</strong> Pₙ = n! = 1 · 2 · 3 · ... · n</li>
              <li><strong>Takrorli permutatsiya:</strong> P(n; k₁, k₂, ..., kₘ) = n! / (k₁! · k₂! · ... · kₘ!)</li>
              <li><strong>O'rinlashtirish (Takrorsiz):</strong> Aₙᵏ = n! / (n - k)! (Tartib muhim!)</li>
              <li><strong>Takrorli o'rinlashtirish:</strong> Āₙᵏ = nᵏ</li>
              <li><strong>Guruhlash / Kombinatsiya (Takrorsiz):</strong> Cₙᵏ = n! / (k! · (n - k)!) (Tartib muhim EMAS!)</li>
              <li><strong>Takrorli guruhlash:</strong> C̄ₙᵏ = Cₙ₊ₖ₋₁ᵏ = (n + k - 1)! / (k! · (n - 1)!)</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.calculate();
    this.renderPascal();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m05-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m05-tab-${tabId}`).classList.add('active');
  },

  updateInputs() {
    const type = document.getElementById('m05-calc-type').value;
    const groupK = document.getElementById('m05-group-k');
    const groupWord = document.getElementById('m05-group-word');
    const nkInputs = document.getElementById('m05-nk-inputs');

    if (type === 'permutation' || type === 'subfactorial') {
      groupK.style.display = 'none';
      groupWord.style.display = 'none';
      nkInputs.style.display = 'grid';
    } else if (type === 'permutation_rep') {
      nkInputs.style.display = 'none';
      groupWord.style.display = 'block';
    } else {
      groupK.style.display = 'block';
      groupWord.style.display = 'none';
      nkInputs.style.display = 'grid';
    }
  },

  loadPreset(type) {
    if (type === 'lotto') {
      document.getElementById('m05-calc-type').value = 'combination';
      document.getElementById('m05-input-n').value = '36';
      document.getElementById('m05-input-k').value = '5';
    } else if (type === 'ananas') {
      document.getElementById('m05-calc-type').value = 'permutation_rep';
      document.getElementById('m05-input-word').value = 'ANANAS';
    } else if (type === 'passcode') {
      document.getElementById('m05-calc-type').value = 'arrangement_rep';
      document.getElementById('m05-input-n').value = '10';
      document.getElementById('m05-input-k').value = '4';
    } else if (type === 'podium') {
      document.getElementById('m05-calc-type').value = 'arrangement';
      document.getElementById('m05-input-n').value = '10';
      document.getElementById('m05-input-k').value = '3';
    }
    this.updateInputs();
    this.calculate();
  },

  calculate() {
    const type = document.getElementById('m05-calc-type').value;
    const n = parseInt(document.getElementById('m05-input-n').value) || 0;
    const k = parseInt(document.getElementById('m05-input-k').value) || 0;
    const word = (document.getElementById('m05-input-word').value || '').trim().toUpperCase();

    const sol = document.getElementById('m05-solution');
    let title = '';
    let formula = '';
    let steps = '';
    let result = 0n;

    if (type === 'combination') {
      title = `Guruhlash C(${n}, ${k}) / Kombinatsiya`;
      formula = `Cₙᵏ = n! / (k! · (n - k)!)`;
      result = MathUtils.combination(n, k);
      steps = `
        1. Jami elementlar soni: n = ${n}<br>
        2. Tanlanayotgan elementlar soni: k = ${k}<br>
        3. Formula: C_${n}^${k} = ${n}! / (${k}! · (${n} - ${k})!) = ${n}! / (${k}! · ${n - k}!)<br>
        4. Natija: <strong>${result.toString()}</strong>
      `;
    } else if (type === 'combination_rep') {
      title = `Takrorli guruhlash C̄(${n}, ${k})`;
      formula = `C̄ₙᵏ = C(n + k - 1, k) = (n + k - 1)! / (k! · (n - 1)!)`;
      result = MathUtils.combinationRepeated(n, k);
      steps = `
        1. n = ${n}, k = ${k}<br>
        2. Ekvivalent: C_${n + k - 1}^${k}<br>
        3. Natija: <strong>${result.toString()}</strong>
      `;
    } else if (type === 'arrangement') {
      title = `O'rinlashtirish A(${n}, ${k})`;
      formula = `Aₙᵏ = n! / (n - k)!`;
      result = MathUtils.arrangement(n, k);
      steps = `
        1. n = ${n}, k = ${k}<br>
        2. A_${n}^${k} = ${n} · ${n - 1} · ... (${k} ta ko'paytuvchi)<br>
        3. Natija: <strong>${result.toString()}</strong>
      `;
    } else if (type === 'arrangement_rep') {
      title = `Takrorli o'rinlashtirish Ā(${n}, ${k})`;
      formula = `Āₙᵏ = nᵏ`;
      result = MathUtils.arrangementRepeated(n, k);
      steps = `
        1. n = ${n}, k = ${k}<br>
        2. Har bir o'ringa ${n} ta variant: ${n}^${k}<br>
        3. Natija: <strong>${result.toString()}</strong>
      `;
    } else if (type === 'permutation') {
      title = `Permutatsiya P(${n})`;
      formula = `Pₙ = n!`;
      result = MathUtils.permutation(n);
      steps = `
        1. n = ${n}<br>
        2. P_${n} = 1 · 2 · 3 · ... · ${n}<br>
        3. Natija: <strong>${result.toString()}</strong>
      `;
    } else if (type === 'permutation_rep') {
      const counts = {};
      for (const ch of word) counts[ch] = (counts[ch] || 0) + 1;
      const countValues = Object.values(counts);
      result = MathUtils.permutationRepeated(word.length, countValues);
      title = `Takrorli permutatsiya ("${word}")`;
      formula = `P(n; k₁, k₂, ...) = n! / (k₁! · k₂! · ...)`;
      steps = `
        1. So'z uzunligi n = ${word.length}<br>
        2. Harflar takrorlanishi: ${Object.entries(counts).map(([c, cnt]) => `${c}: ${cnt} ta`).join(', ')}<br>
        3. Formula: ${word.length}! / (${countValues.map(c => `${c}!`).join(' · ')})<br>
        4. Natija: <strong>${result.toString()}</strong>
      `;
    } else if (type === 'subfactorial') {
      title = `Subfaktorial !${n} (Derangements)`;
      formula = `!n = round(n! / e)`;
      result = MathUtils.subfactorial(n);
      steps = `
        1. n ta elementning birortasi ham o'z joyida qolmaydigan o'rinlashtirishlar soni.<br>
        2. Natija: <strong>${result.toString()}</strong>
      `;
    }

    sol.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">📐 ${title}</span>
        <span class="badge badge-emerald">Muvaffaqiyatli</span>
      </div>
      <div class="step-card" style="border-left-color: #06b6d4;">
        <div class="step-num">Qo'llangan Formula</div>
        <div class="math-block">${formula}</div>
      </div>
      <div class="step-card" style="border-left-color: #818cf8;">
        <div class="step-num">Qadamma-Qadam Hisoblash</div>
        <div class="step-desc">${steps}</div>
      </div>
      <div class="step-card" style="border-left-color: #34d399; background: rgba(16, 185, 129, 0.08);">
        <div class="step-num" style="color: #34d399;">Yakuniy Javob</div>
        <div style="font-size: 20px; font-weight: 800; color: #34d399; word-break: break-all;">
          ${result.toString()}
        </div>
      </div>
    `;
  },

  renderPascal() {
    const rows = parseInt(document.getElementById('m05-pascal-rows').value) || 9;
    const triangle = MathUtils.getPascalTriangle(rows);
    const container = document.getElementById('m05-pascal-container');

    container.innerHTML = triangle.map((row, r) => `
      <div class="pascal-row">
        ${row.map((val, c) => `
          <div class="pascal-cell" onclick="Module05.showPascalCell(${r}, ${c}, '${val.toString()}')" title="C(${r}, ${c}) = ${val}">
            ${val > 9999 ? '···' : val}
          </div>
        `).join('')}
      </div>
    `).join('');
  },

  showPascalCell(r, c, val) {
    document.getElementById('m05-pascal-info').innerHTML = `
      💡 Tanlangan katak: <strong>n = ${r}, k = ${c}</strong> | Formula: <strong>C_${r}^${c} = ${val}</strong>
    `;
  },

  generatePerms() {
    const raw = document.getElementById('m05-gen-elements').value;
    const elements = MathUtils.parseSet(raw);
    if (elements.length > 6) {
      alert("Elementlar soni juda ko'p (maksimal 6 ta).");
      return;
    }
    const perms = MathUtils.generatePermutations(elements);
    const container = document.getElementById('m05-gen-results');
    container.innerHTML = `
      <div class="step-card">
        <div class="step-num">Barcha Permutatsiyalar (${perms.length} ta)</div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
          ${perms.map(p => `<span class="badge badge-primary">(${p.join(', ')})</span>`).join('')}
        </div>
      </div>
    `;
  },

  generateCombs() {
    const raw = document.getElementById('m05-gen-elements').value;
    const elements = MathUtils.parseSet(raw);
    const combs = MathUtils.generateCombinations(elements, 2);
    const container = document.getElementById('m05-gen-results');
    container.innerHTML = `
      <div class="step-card">
        <div class="step-num">Barcha Guruhlashlar k=2 (${combs.length} ta)</div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
          ${combs.map(c => `<span class="badge badge-emerald">{ ${c.join(', ')} }</span>`).join('')}
        </div>
      </div>
    `;
  }
};

window.Module05 = Module05;
