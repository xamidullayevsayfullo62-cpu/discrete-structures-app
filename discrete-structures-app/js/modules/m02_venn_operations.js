/**
 * Module 2: To'plamlar ustida amallar. Eyler-Venn diagrammalari.
 */
const Module02 = {
  id: 'm02',
  title: "2. To'plamlar ustida amallar va Eyler-Venn diagrammalari",
  shortTitle: "2. To'plamlar & Venn",

  render() {
    return `
      <div class="module-hero">
        <div class="hero-info">
          <h2>To'plamlar ustida amallar & Eyler-Venn Diagrammasi</h2>
          <p>To'plamlar birlashmasi, kesishmasi, ayirmasi, simmetrik ayirmasi va Dekart ko'paytmasini aniq hisoblang va interaktiv Eyler-Venn diagrammasida har bir sohaning nurlanishini jonli ko'ring.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">A ∪ B</span>
          <span class="badge badge-cyan">A ∩ B</span>
          <span class="badge badge-emerald">A Δ B</span>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn active" onclick="Module02.switchTab('calc')">🎨 Venn Diagrammasi & Amallar</button>
        <button class="tab-btn" onclick="Module02.switchTab('theory')">📖 Amallar Qoidalari</button>
        <button class="tab-btn" onclick="Module02.switchTab('examples')">💡 Qiziqarli Masalalar</button>
      </div>

      <!-- Tab 1: Calculator & Canvas -->
      <div id="m02-tab-calc" class="tab-pane active">
        <div class="grid-2col">
          <!-- Inputs & Controls -->
          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 12px; color: #818cf8;">To'plamlarni kiritish</h3>
            
            <div class="form-group">
              <label class="form-label">Universal to'plam (U):
                <span class="form-hint">Ixtiyoriy to'liq qamrov</span>
              </label>
              <input type="text" id="m02-input-u" class="glass-input" value="1, 2, 3, 4, 5, 6, 7, 8, 9, 10" placeholder="1, 2, 3, ...">
            </div>

            <div class="form-group">
              <label class="form-label">To'plam A:
                <span class="form-hint">Vergul bilan ajratilgan elementlar</span>
              </label>
              ${typeof SymbolHelper !== 'undefined' ? SymbolHelper.getToolbarHtml('m02-input-a', 'sets') : ''}
              <input type="text" id="m02-input-a" class="glass-input" value="1, 2, 3, 4, 5, 6" placeholder="1, 2, 3...">
            </div>

            <div class="form-group">
              <label class="form-label">To'plam B:
                <span class="form-hint">Vergul bilan ajratilgan elementlar</span>
              </label>
              ${typeof SymbolHelper !== 'undefined' ? SymbolHelper.getToolbarHtml('m02-input-b', 'sets') : ''}
              <input type="text" id="m02-input-b" class="glass-input" value="4, 5, 6, 7, 8" placeholder="4, 5, 6...">
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Bajariladigan amalni tanlang (Venn sohasini yoritadi):</label>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 6px;">
                <button class="glass-btn glass-btn-secondary" onclick="Module02.setOperation('union')">∪ Birlashma (A ∪ B)</button>
                <button class="glass-btn glass-btn-secondary" onclick="Module02.setOperation('intersection')">∩ Kesishma (A ∩ B)</button>
                <button class="glass-btn glass-btn-secondary" onclick="Module02.setOperation('diffAB')">∖ Ayirma (A ∖ B)</button>
                <button class="glass-btn glass-btn-secondary" onclick="Module02.setOperation('diffBA')">∖ Ayirma (B ∖ A)</button>
                <button class="glass-btn glass-btn-secondary" onclick="Module02.setOperation('symdiff')">Δ Simmetrik (A Δ B)</button>
                <button class="glass-btn glass-btn-secondary" onclick="Module02.setOperation('cartesian')">× Dekart (A × B)</button>
              </div>
            </div>

            <div style="margin-bottom: 14px;">
              <label class="form-label">Tayyor misollar:</label>
              <div class="preset-pills">
                <span class="preset-pill" onclick="Module02.loadPreset('numbers')">1-10 Sonlar</span>
                <span class="preset-pill" onclick="Module02.loadPreset('evenodd')">Juft va Toq</span>
                <span class="preset-pill" onclick="Module02.loadPreset('fruits')">So'zlar (Mevalar)</span>
                <span class="preset-pill" onclick="Module02.loadPreset('disjoint')">Kesişmaydigan</span>
              </div>
            </div>

            <button class="glass-btn glass-btn-primary" onclick="Module02.calculateAll()" style="width: 100%;">
              ⚡ Hisoblash va Diagrammani Yangilash
            </button>
          </div>

          <!-- Canvas & Results -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="canvas-wrapper">
              <div class="canvas-toolbar">
                <span style="font-weight: 700; font-size: 13px; color: #cbd5e1;">Eyler-Venn Diagrammasi</span>
                <span id="m02-op-indicator" class="badge badge-primary">Amal: Birlashma (A ∪ B)</span>
              </div>
              <canvas id="m02-venn-canvas" class="canvas-area" style="height: 340px;"></canvas>
            </div>

            <div id="m02-results" class="solution-box">
              <!-- Results generated here -->
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Theory -->
      <div id="m02-tab-theory" class="tab-pane">
        <div class="theory-card">
          <div class="theory-head">1. To'plamlar ustida asosiy amallar ta'riflari</div>
          <div class="theory-body">
            <ul>
              <li><strong>Birlashma (A ∪ B):</strong> A ga yoki B ga yoki ikkalasiga tegishli barcha elementlar to'plami: {x | x ∈ A ∨ x ∈ B}.</li>
              <li><strong>Kesishma (A ∩ B):</strong> Bir vaqtning o'zida ham A ga, ham B ga tegishli bo'lgan umumiy elementlar: {x | x ∈ A ∧ x ∈ B}.</li>
              <li><strong>Ayirma (A ∖ B):</strong> A ga tegishli, lekin B ga tegishli bo'lmagan elementlar: {x | x ∈ A ∧ x ∉ B}.</li>
              <li><strong>Simmetrik ayirma (A Δ B):</strong> A ga yoki B ga tegishli, lekin ularning ikkalasiga bir vaqtda tegishli bo'lmagan elementlar: (A ∖ B) ∪ (B ∖ A).</li>
              <li><strong>To'ldiruvchi to'plam (A'):</strong> Universal to'plam U dan A ni ayirish: U ∖ A.</li>
              <li><strong>Dekart ko'paytmasi (A × B):</strong> Barcha tartiblangan (a, b) juftliklar to'plami, bu yerda a ∈ A va b ∈ B. Quvvati: |A × B| = |A| · |B|.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tab 3: Examples -->
      <div id="m02-tab-examples" class="tab-pane">
        <div class="glass-panel" style="padding: 20px;">
          <h3 style="font-size: 16px; margin-bottom: 12px; color: #38bdf8;">Amaliy masalalar va ularning yechimi</h3>
          <div class="step-card">
            <div class="step-num">Masala 1</div>
            <div class="step-desc">
              Guruhdagi 30 ta talabadan 18 tasi ingliz tilini, 14 tasi nemis tilini, 7 tasi esa ikkala tilni biladi. Nechta talaba faqat ingliz tilini biladi? Nechta talaba hech birini bilmaydi?<br>
              <strong>Yechim:</strong><br>
              Faqat ingliz: |A ∖ B| = |A| - |A ∩ B| = 18 - 7 = 11 talaba.<br>
              Kamida bittasini biladiganlar: |A ∪ B| = 18 + 14 - 7 = 25 talaba.<br>
              Hech qaysini bilmaydiganlar: 30 - 25 = 5 talaba.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.currentOp = 'union';
    this.calculateAll();
  },

  switchTab(tabId) {
    document.querySelectorAll('[id^="m02-tab-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`m02-tab-${tabId}`).classList.add('active');
    if (tabId === 'calc') {
      setTimeout(() => this.drawDiagram(), 50);
    }
  },

  setOperation(op) {
    this.currentOp = op;
    const names = {
      union: "Birlashma (A ∪ B)",
      intersection: "Kesishma (A ∩ B)",
      diffAB: "Ayirma (A ∖ B)",
      diffBA: "Ayirma (B ∖ A)",
      symdiff: "Simmetrik ayirma (A Δ B)",
      cartesian: "Dekart ko'paytma (A × B)"
    };
    document.getElementById('m02-op-indicator').innerText = `Amal: ${names[op]}`;
    this.calculateAll();
  },

  loadPreset(type) {
    if (type === 'numbers') {
      document.getElementById('m02-input-u').value = "1, 2, 3, 4, 5, 6, 7, 8, 9, 10";
      document.getElementById('m02-input-a').value = "1, 2, 3, 4, 5, 6";
      document.getElementById('m02-input-b').value = "4, 5, 6, 7, 8";
    } else if (type === 'evenodd') {
      document.getElementById('m02-input-u').value = "1, 2, 3, 4, 5, 6, 7, 8, 9, 10";
      document.getElementById('m02-input-a').value = "2, 4, 6, 8, 10";
      document.getElementById('m02-input-b').value = "1, 3, 5, 7, 9";
    } else if (type === 'fruits') {
      document.getElementById('m02-input-u').value = "olma, anor, nok, shaftoli, uzum, banan, gilos";
      document.getElementById('m02-input-a').value = "olma, anor, nok, shaftoli";
      document.getElementById('m02-input-b').value = "nok, shaftoli, uzum, banan";
    } else if (type === 'disjoint') {
      document.getElementById('m02-input-u').value = "A, B, C, D, E, F";
      document.getElementById('m02-input-a').value = "A, B, C";
      document.getElementById('m02-input-b').value = "D, E, F";
    }
    this.calculateAll();
  },

  calculateAll() {
    const rawU = document.getElementById('m02-input-u').value;
    const rawA = document.getElementById('m02-input-a').value;
    const rawB = document.getElementById('m02-input-b').value;

    const setU = MathUtils.parseSet(rawU);
    const setA = MathUtils.parseSet(rawA);
    const setB = MathUtils.parseSet(rawB);

    const union = MathUtils.setUnion(setA, setB);
    const intersection = MathUtils.setIntersection(setA, setB);
    const diffAB = MathUtils.setDifference(setA, setB);
    const diffBA = MathUtils.setDifference(setB, setA);
    const symdiff = MathUtils.setSymmetricDifference(setA, setB);
    const cartesian = MathUtils.setCartesianProduct(setA, setB);
    const compA = MathUtils.setDifference(setU, setA);
    const compB = MathUtils.setDifference(setU, setB);

    this.cache = { setU, setA, setB, union, intersection, diffAB, diffBA, symdiff, cartesian, compA, compB };

    // Update results HTML
    const formatSet = (arr) => arr.length === 0 ? '∅' : `{ ${arr.join(', ')} }`;
    let activeResult = '';
    if (this.currentOp === 'union') activeResult = `A ∪ B = ${formatSet(union)} (Quvvati: ${union.length})`;
    else if (this.currentOp === 'intersection') activeResult = `A ∩ B = ${formatSet(intersection)} (Quvvati: ${intersection.length})`;
    else if (this.currentOp === 'diffAB') activeResult = `A ∖ B = ${formatSet(diffAB)} (Quvvati: ${diffAB.length})`;
    else if (this.currentOp === 'diffBA') activeResult = `B ∖ A = ${formatSet(diffBA)} (Quvvati: ${diffBA.length})`;
    else if (this.currentOp === 'symdiff') activeResult = `A Δ B = ${formatSet(symdiff)} (Quvvati: ${symdiff.length})`;
    else if (this.currentOp === 'cartesian') activeResult = `A × B = { ${cartesian.slice(0, 15).join(', ')}${cartesian.length > 15 ? '...' : ''} } (|A × B| = ${cartesian.length})`;

    const resContainer = document.getElementById('m02-results');
    resContainer.innerHTML = `
      <div class="solution-header">
        <span class="solution-title">🎯 Natijalar va Xossalar</span>
        <span class="badge badge-emerald">To'liq hisoblandi</span>
      </div>
      <div class="step-card" style="border-left-color: #06b6d4;">
        <div class="step-num">Tanlangan Amal Natijasi</div>
        <div class="step-desc" style="font-size: 15px; font-weight: 700; color: #38bdf8;">
          ${activeResult}
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-top: 10px;">
        <div class="math-block">|A| = ${setA.length}, |B| = ${setB.length}</div>
        <div class="math-block">|A ∪ B| = ${union.length}</div>
        <div class="math-block">|A ∩ B| = ${intersection.length}</div>
        <div class="math-block">|A Δ B| = ${symdiff.length}</div>
      </div>
    `;

    this.drawDiagram();
  },

  drawDiagram() {
    this.vennCanvas = new VennDiagramCanvas('m02-venn-canvas');
    if (this.cache) {
      this.vennCanvas.draw2Sets({
        setA: this.cache.setA,
        setB: this.cache.setB,
        operation: this.currentOp
      });
    }
  }
};

window.Module02 = Module02;
