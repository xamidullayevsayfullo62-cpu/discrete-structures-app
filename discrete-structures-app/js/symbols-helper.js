/**
 * Interactive Symbols Helper & Keyboard Toolbar
 * Foydalanuvchi klaviaturada yo'q belgilarni (¬, ∧, ∨, →, ↔, ⊕, ∪, ∩, ∅, ⊆, ℵ₀ va b.)
 * to'g'ridan-to'g'ri bir marta bosish bilan kiritishi va nusxa olishi uchun.
 */

const SymbolHelper = {
  lastActiveInput: null,

  init() {
    this.trackActiveInputs();
    this.renderModalContainer();
  },

  trackActiveInputs() {
    document.addEventListener('focusin', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        this.lastActiveInput = e.target;
      }
    });
  },

  insertSymbol(sym, inputId = null) {
    let input = null;
    if (inputId) {
      input = document.getElementById(inputId);
    }
    if (!input) {
      input = this.lastActiveInput;
    }
    if (!input) {
      // Find the first visible input in module view
      input = document.querySelector('.module-view input[type="text"], .module-view textarea');
    }

    if (input) {
      const start = input.selectionStart || input.value.length;
      const end = input.selectionEnd || input.value.length;
      const val = input.value;
      input.value = val.substring(0, start) + sym + val.substring(end);
      input.selectionStart = input.selectionEnd = start + sym.length;
      input.focus();

      // Trigger change/input event
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));

      App.showToast(`Belgi kiritildi: ${sym}`, 'success');
    } else {
      // Fallback: Copy to clipboard
      this.copySymbol(sym);
    }
  },

  copySymbol(sym) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(sym).then(() => {
        App.showToast(`Belgi buferga nusxalandi: ${sym}`, 'success');
      }).catch(() => {
        this.fallbackCopy(sym);
      });
    } else {
      this.fallbackCopy(sym);
    }
  },

  fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    App.showToast(`Nusxa olindi: ${text}`, 'success');
  },

  // Generates mini symbol toolbar above any input
  getToolbarHtml(targetInputId, type = 'all') {
    let symbols = [];
    if (type === 'sets') {
      symbols = ['∅', '∈', '∉', '⊆', '⊂', '∪', '∩', '∖', 'Δ', '×', 'ℵ₀', '𝔠', 'ℕ', 'ℤ', 'ℚ', 'ℝ'];
    } else if (type === 'logic') {
      symbols = ['¬', '∧', '∨', '→', '↔', '⊕', '↑', '↓', '∀', '∃', '≡', '⊤', '⊥', '(', ')'];
    } else if (type === 'relations') {
      symbols = ['∣', '∤', '≤', '≥', 'R⁺', '[a]', 'sup', 'inf', '(', ')'];
    } else {
      symbols = ['∅', '∪', '∩', '∖', '¬', '∧', '∨', '→', '↔', '⊕', '≤', '≥', '!', 'Pₙ', 'Cₙᵏ'];
    }

    return `
      <div class="symbol-toolbar" style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px; padding: 4px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 8px;">
        <span style="font-size: 11px; font-weight: 700; color: #818cf8; padding: 4px 6px; display: flex; align-items: center;">🔣 Belgilar:</span>
        ${symbols.map(s => `
          <button type="button" class="symbol-pill-btn" onclick="SymbolHelper.insertSymbol('${s}', '${targetInputId}')" title="Kiritish: ${s}">
            ${s}
          </button>
        `).join('')}
      </div>
    `;
  },

  renderModalContainer() {
    let modal = document.getElementById('symbols-modal');
    if (modal) return;

    modal = document.createElement('div');
    modal.id = 'symbols-modal';
    modal.className = 'glass-modal-backdrop';
    modal.style.display = 'none';

    modal.innerHTML = `
      <div class="glass-modal-content">
        <div class="glass-modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="brand-icon" style="width: 32px; height: 32px; font-size: 16px;">🔣</div>
            <div>
              <h3 style="font-size: 18px; color: #fff;">Diskret Tuzilmalar Belgilar Ensiklopediyasi</h3>
              <p style="font-size: 12px; color: var(--text-muted);">Barcha matematik belgilar, nomlari, klaviatura yozilishi va amallar</p>
            </div>
          </div>
          <button class="glass-btn glass-btn-secondary glass-btn-sm" onclick="SymbolHelper.closeModal()" style="font-size: 16px; padding: 4px 10px;">✕</button>
        </div>

        <div style="padding: 16px 24px; border-bottom: 1px solid var(--border-glass); display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
          <input type="text" id="symbol-search-input" class="glass-input" style="max-width: 320px;" placeholder="Belgini yoki nomini qidirish (masalan: inkor, union, alef)..." oninput="SymbolHelper.filterSymbols()">
          
          <div class="symbol-cat-pills" style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button class="preset-pill active" onclick="SymbolHelper.filterCategory('all', this)">Barchasi (${MathSymbolsDB.length})</button>
            <button class="preset-pill" onclick="SymbolHelper.filterCategory('sets', this)">To'plamlar</button>
            <button class="preset-pill" onclick="SymbolHelper.filterCategory('logic', this)">Mantiq & Bul</button>
            <button class="preset-pill" onclick="SymbolHelper.filterCategory('relations', this)">Munosabatlar</button>
            <button class="preset-pill" onclick="SymbolHelper.filterCategory('combinatorics', this)">Kombinatorika</button>
            <button class="preset-pill" onclick="SymbolHelper.filterCategory('graphs', this)">Graflar</button>
          </div>
        </div>

        <div id="symbols-grid-container" class="symbols-grid">
          <!-- Rendered dynamically -->
        </div>

        <div class="glass-modal-footer">
          <span style="font-size: 12px; color: var(--text-dim);">💡 Maslahat: Har qanday belgini bosib buferga nusxa olishingiz yoki to'g'ridan-to'g'ri maydonga kiritishingiz mumkin.</span>
          <button class="glass-btn glass-btn-primary glass-btn-sm" onclick="SymbolHelper.closeModal()">Yopish</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    });
  },

  openModal() {
    this.renderModalContainer();
    const modal = document.getElementById('symbols-modal');
    modal.style.display = 'flex';
    this.renderSymbolsList(MathSymbolsDB);
    const search = document.getElementById('symbol-search-input');
    if (search) {
      search.value = '';
      search.focus();
    }
  },

  closeModal() {
    const modal = document.getElementById('symbols-modal');
    if (modal) modal.style.display = 'none';
  },

  filterCategory(cat, btn) {
    document.querySelectorAll('.symbol-cat-pills .preset-pill').forEach(el => el.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.activeCat = cat;
    this.filterSymbols();
  },

  filterSymbols() {
    const search = (document.getElementById('symbol-search-input').value || '').toLowerCase().trim();
    const cat = this.activeCat || 'all';

    const filtered = MathSymbolsDB.filter(item => {
      const matchCat = cat === 'all' || item.category === cat;
      const matchSearch = !search || 
        item.symbol.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        item.ascii.toLowerCase().includes(search) ||
        item.desc.toLowerCase().includes(search);
      return matchCat && matchSearch;
    });

    this.renderSymbolsList(filtered);
  },

  renderSymbolsList(list) {
    const container = document.getElementById('symbols-grid-container');
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-dim);">
          🔍 Belgilar topilmadi. Qidiruv so'zini o'zgartiring.
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="symbol-card">
        <div class="symbol-card-top">
          <div class="symbol-glyph">${item.symbol}</div>
          <span class="badge badge-primary" style="font-size: 11px;">${this.getCategoryName(item.category)}</span>
        </div>
        <div class="symbol-card-title">${item.name}</div>
        <div class="symbol-card-ascii">Klaviaturada: <code>${item.ascii}</code></div>
        <div class="symbol-card-desc">${item.desc}</div>
        <div class="symbol-card-example">Masalan: <span>${item.example}</span></div>
        <div class="symbol-card-actions">
          <button class="glass-btn glass-btn-secondary glass-btn-sm" style="flex: 1;" onclick="SymbolHelper.copySymbol('${item.symbol}')">
            📋 Nusxa
          </button>
          <button class="glass-btn glass-btn-primary glass-btn-sm" style="flex: 1;" onclick="SymbolHelper.insertSymbol('${item.symbol}'); SymbolHelper.closeModal();">
            ➕ Kiritish
          </button>
        </div>
      </div>
    `).join('');
  },

  getCategoryName(cat) {
    const map = {
      sets: "To'plamlar",
      logic: "Mantiq & Bul",
      relations: "Munosabatlar",
      combinatorics: "Kombinatorika",
      graphs: "Graflar"
    };
    return map[cat] || cat;
  }
};

window.SymbolHelper = SymbolHelper;
window.addEventListener('DOMContentLoaded', () => {
  SymbolHelper.init();
});
