/**
 * Module 6: Kombinatorikaning to'plamlar quvvatini aniqlashga tatbiqi.
 * Kiritish-chiqarish va Dirixle printsipi.
 */
const Module06 = {
  id: 'm06',
  title: "6. To'plamlar quvvati, Kiritish-chiqarish & Dirixle printsipi",
  shortTitle: "6. Kiritish-chiqarish",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>To'plamlar quvvati, Kiritish-chiqarish & Dirixle Printsipi</h2>
          <p>Kiritish-chiqarish (Inclusion-Exclusion) printsipi orqali 2 va 3 to'plamli murakkab masalalarni yeching. Dirixle (Kabutar) printsipini interaktiv vizual simulyatsiya orqali tushuning.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">|A ∪ B ∪ C|</span>
          <span class="badge badge-emerald">Dirixle ⌈n/k⌉</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module06.switchTab('inclusion')">📊 Kiritish-Chiqarish Printsipi</button>
        <button class="tab-btn" onclick="Module06.switchTab('dirichlet')">🕊️ Dirixle (Kabutar) Printsipi</button>
        <button class="tab-btn" onclick="Module06.switchTab('theory')">📖 Nazariya va Isbotlar</button>
      </div>

      <!-- Tab 1: Inclusion-Exclusion -->
      <div id="m06-tab-inclusion" class="tab-pane active">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">To'plamlar Parametrlari</h3>

            <div class="form-group">
              <label class="form-label">To'plamlar soni:</label>
              <select id="m06-num-sets" class="glass-input" onchange="Module06.toggleSetCount()">
                <option value="3">3 ta to'plam (A, B, C)</option>
                <option value="2">2 ta to'plam (A, B)</option>
              </select>
            </div>

            <div class="grid-3col">
              <div class="form-group">
                <label class="form-label">|A|:</label>
                <input type="number" id="m06-size-a" class="glass-input" value="30">
              </div>
              <div class="form-group">
                <label class="form-label">|B|:</label>
                <input type="number" id="m06-size-b" class="glass-input" value="25">
              </div>
              <div class="form-group" id="m06-group-c">
                <label class="form-label">|C|:</label>
                <input type="number" id="m06-size-c" class="glass-input" value="20">
              </div>
            </div>

            <div class="grid-3col">
              <div class="form-group">
                <label class="form-label">|A ∩ B|:</label>
                <input type="number" id="m06-size-ab" class="glass-input" value="10">
              </div>
              <div class="form-group m06-pair-c">
                <label class="form-label">|A ∩ C|:</label>
                <input type="number" id="m06-size-ac" class="glass-input" value="8">
              </div>
              <div class="form-group m06-pair-c">
                <label class="form-label">|B ∩ C|:</label>
                <input type="number" id="m06-size-bc" class="glass-input" value="7">
              </div>
            </div>

            <div class="form-group m06-pair-c">
              <label class="form-label">|A ∩ B ∩ C| (Uchalasiga ham tegishli):</label>
              <input type="number" id="m06-size-abc" class="glass-input" value="3">
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor masalalar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module06.loadPreset('languages')">Tillar bo'yicha so'rov</span>
                <span class="preset-pill" onclick="Module06.loadPreset('sports')">Sport to'garaklari</span>
                <span class="preset-pill" onclick="Module06.loadPreset('divisibility')">1 dan 100 gacha bo'linish</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module06.calculateInclusion()" style="width: 100%;">
              ⚡ Birlashma Quvvatini Hisoblash
            </button>
          </div>

          <!-- Solution Box -->
          <div id="m06-inclusion-solution" class="solution-box">
            <!-- Results here -->
          </div>
        </div>
      </div>

      <!-- Tab 2: Dirichlet -->
      <div id="m06-tab-dirichlet" class="tab-pane">
        <div class="grid-2col">
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #10b981;">Dirixle (Kabutar) Printsipi Simulyatori</h3>
            <div class="form-group">
              <label class="form-label">Buyumlar (Kabutarlar / n):</label>
              <input type="number" id="m06-pigeons" class="glass-input" value="13" min="1" max="100">
            </div>
            <div class="form-group">
              <label class="form-label">Qutilar (Inlar / k):</label>
              <input type="number" id="m06-holes" class="glass-input" value="4" min="1" max="20">
            </div>
            <button class="glass-btn glass-btn-primary" onclick="Module06.simulateDirichlet()" style="width: 100%;">
              🕊️ Taqsimlash va Teoremani Ko'rish
            </button>
          </div>

          <div class="solution-box" id="m06-dirichlet-result">
            <!-- Simulation output -->
          </div>
        </div>
      </div>

      <!-- Tab 3: Theory -->
      <div id="m06-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. Kiritish-chiqarish printsipi formulasi</div>
          <div class="theory-body">
            <ul>
              <li><strong>2 to'plam uchun:</strong> |A ∪ B| = |A| + |B| - |A ∩ B|</li>
              <li><strong>3 to'plam uchun:</strong> |A ∪ B ∪ C| = (|A| + |B| + |C|) - (|A ∩ B| + |A ∩ C| + |B ∩ C|) + |A ∩ B ∩ C|</li>
            </ul>
          </div>
        </div>
        <div class="theory-card">
          <div class="theory-head">2. Dirixle printsipi (Pigeonhole Principle)</div>
          <div class="theory-body">
            Agar n ta buyum k ta qutiga joylashtirilsa va n > k bo'lsa, u holda kamida bitta qutida kamida <strong>⌈n / k⌉</strong> ta buyum bo'ladi.
            <br><em>Misol:</em> 13 ta talaba bo'lsa, kamida 2 tasi bitta oyda tug'ilgan bo'lishi shart (chunki 13 > 12).
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.calculateInclusion();
    this.simulateDirichlet();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m06-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m06-tab-${tabId}`).classList.add('active');
  },

  toggleSetCount() {
    const is3 = document.getElementById('m06-num-sets').value === '3';
    document.getElementById('m06-group-c').style.display = is3 ? 'block' : 'none';
    document.querySelectorAll('.m06-pair-c').forEach(el => el.style.display = is3 ? 'block' : 'none');
    this.calculateInclusion();
  },

  loadPreset(type) {
    if (type === 'languages') {
      document.getElementById('m06-num-sets').value = '3';
      document.getElementById('m06-size-a').value = '30';
      document.getElementById('m06-size-b').value = '25';
      document.getElementById('m06-size-c').value = '20';
      document.getElementById('m06-size-ab').value = '12';
      document.getElementById('m06-size-ac').value = '8';
      document.getElementById('m06-size-bc').value = '9';
      document.getElementById('m06-size-abc').value = '4';
    } else if (type === 'sports') {
      document.getElementById('m06-num-sets').value = '2';
      document.getElementById('m06-size-a').value = '22';
      document.getElementById('m06-size-b').value = '18';
      document.getElementById('m06-size-ab').value = '7';
    } else if (type === 'divisibility') {
      // 1 dan 100 gacha 2, 3, 5 ga bo'linuvchilar
      document.getElementById('m06-num-sets').value = '3';
      document.getElementById('m06-size-a').value = '50'; // 2 ga
      document.getElementById('m06-size-b').value = '33'; // 3 ga
      document.getElementById('m06-size-c').value = '20'; // 5 ga
      document.getElementById('m06-size-ab').value = '16'; // 6 ga
      document.getElementById('m06-size-ac').value = '10'; // 10 ga
      document.getElementById('m06-size-bc').value = '6';  // 15 ga
      document.getElementById('m06-size-abc').value = '3'; // 30 ga
    }
    this.toggleSetCount();
  },

  calculateInclusion() {
    const is3 = document.getElementById('m06-num-sets').value === '3';
    const a = parseInt(document.getElementById('m06-size-a').value) || 0;
    const b = parseInt(document.getElementById('m06-size-b').value) || 0;
    const ab = parseInt(document.getElementById('m06-size-ab').value) || 0;

    const sol = document.getElementById('m06-inclusion-solution');
    let total = 0;
    let formulaStr = '';
    let stepStr = '';

    if (!is3) {
      total = a + b - ab;
      formulaStr = '|A ∪ B| = |A| + |B| - |A ∩ B|';
      stepStr = `
        |A ∪ B| = ${a} + ${b} - ${ab} = <strong>${total}</strong>
      `;
    } else {
      const c = parseInt(document.getElementById('m06-size-c').value) || 0;
      const ac = parseInt(document.getElementById('m06-size-ac').value) || 0;
      const bc = parseInt(document.getElementById('m06-size-bc').value) || 0;
      const abc = parseInt(document.getElementById('m06-size-abc').value) || 0;

      total = (a + b + c) - (ab + ac + bc) + abc;
      formulaStr = '|A ∪ B ∪ C| = |A| + |B| + |C| - (|A ∩ B| + |A ∩ C| + |B ∩ C|) + |A ∩ B ∩ C|';
      stepStr = `
        1. Yakka to'plamlar yig'indisi: ${a} + ${b} + ${c} = ${a + b + c}<br>
        2. Juft kesishmalar ayirmasi: - (${ab} + ${ac} + ${bc}) = -${ab + ac + bc}<br>
        3. Uchlik kesishma qo'shilishi: + ${abc}<br>
        4. Natija: (${a + b + c}) - (${ab + ac + bc}) + ${abc} = <strong>${total}</strong>
      `;
    }

    sol.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">📐 Kiritish-Chiqarish Natijasi</span>
        <span class="badge badge-cyan">${is3 ? '3 ta to\'plam' : '2 ta to\'plam'}</span>
      </div>
      <div class="step-card" style="border-left-color: #06b6d4;">
        <div class="step-num">Formula</div>
        <div class="math-block">${formulaStr}</div>
      </div>
      <div class="step-card" style="border-left-color: #818cf8;">
        <div class="step-num">Bosqichma-bosqich hisoblash</div>
        <div class="step-desc">${stepStr}</div>
      </div>
      <div class="step-card" style="border-left-color: #34d399; background: rgba(16, 185, 129, 0.08);">
        <div class="step-num" style="color: #34d399;">Birlashma Quvvati (Jami elementlar)</div>
        <div style="font-size: 22px; font-weight: 800; color: #34d399;">${total}</div>
      </div>
    `;
  },

  simulateDirichlet() {
    const n = parseInt(document.getElementById('m06-pigeons').value) || 1;
    const k = parseInt(document.getElementById('m06-holes').value) || 1;
    const minPerHole = Math.ceil(n / k);

    const res = document.getElementById('m06-dirichlet-result');

    // Distribute into boxes
    const boxes = new Array(k).fill(0);
    for (let i = 0; i < n; i++) {
      boxes[i % k]++;
    }

    res.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">🕊️ Dirixle Xulosasi</span>
        <span class="badge badge-emerald">⌈${n} / ${k}⌉ = ${minPerHole}</span>
      </div>
      <div class="step-card" style="border-left-color: #34d399;">
        <div class="step-num">Teorema Xulosasi</div>
        <div class="step-desc" style="font-size: 14px;">
          Agar <strong>${n}</strong> ta buyum <strong>${k}</strong> ta qutiga joylashtirilsa, kamida bitta qutida kamida <strong>${minPerHole}</strong> ta buyum bo'ladi!
        </div>
      </div>
      <div style="margin-top: 14px;">
        <div style="font-size: 13px; font-weight: 700; color: #cbd5e1; margin-bottom: 8px;">Qutilarga taqsimlanish ko'rinishi:</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px;">
          ${boxes.map((count, idx) => `
            <div class="glass-panel" style="padding: 12px; text-align: center; border-color: ${count >= minPerHole ? '#10b981' : 'var(--border-glass)'};">
              <div style="font-size: 11px; color: #94a3b8;">Quti #${idx + 1}</div>
              <div style="font-size: 20px; font-weight: 700; color: ${count >= minPerHole ? '#34d399' : '#fff'}; margin: 4px 0;">
                ${count} ta
              </div>
              <div style="display: flex; justify-content: center; gap: 3px; flex-wrap: wrap;">
                ${new Array(Math.min(10, count)).fill(0).map(() => '<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#06b6d4;"></span>').join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};

window.Module06 = Module06;
