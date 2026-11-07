/**
 * Main Application Orchestrator
 * Connects all 15 discrete structures modules with search, smooth navigation,
 * themes, cheat sheet drawer, and glassmorphism design.
 */

const App = {
  modules: [
    Module01, Module02, Module03, Module04, Module05,
    Module06, Module07, Module08, Module09, Module10,
    Module11, Module12, Module13, Module14, Module15
  ],
  currentModuleIndex: 0,

  init() {
    this.initTheme();
    this.renderSidebarNav();
    this.attachSearchListener();
    this.attachKeyboardShortcuts();
    this.loadModule(0);
  },

  initTheme() {
    const savedTheme = localStorage.getItem('dt_theme') || 'violet';
    this.setTheme(savedTheme, false);
    const sel = document.getElementById('theme-selector');
    if (sel) sel.value = savedTheme;
  },

  setTheme(themeName, save = true) {
    document.body.classList.remove('theme-cyan', 'theme-matrix');
    if (themeName === 'cyan') {
      document.body.classList.add('theme-cyan');
    } else if (themeName === 'matrix') {
      document.body.classList.add('theme-matrix');
    }
    if (save) {
      localStorage.setItem('dt_theme', themeName);
      this.showToast(`Mavzu o'zgartirildi: ${themeName === 'cyan' ? 'Kiber Moviy' : (themeName === 'matrix' ? 'Zumrad Matritsa' : 'Kosmik Shisha')}`, 'success');
    }
  },

  renderSidebarNav(filter = '') {
    const nav = document.getElementById('sidebar-nav');
    const lowerFilter = filter.toLowerCase().trim();

    nav.innerHTML = this.modules.map((m, idx) => {
      const isMatch = !lowerFilter || 
        m.title.toLowerCase().includes(lowerFilter) || 
        m.shortTitle.toLowerCase().includes(lowerFilter) ||
        String(idx + 1).includes(lowerFilter);

      if (!isMatch) return '';

      const isActive = idx === this.currentModuleIndex;
      return `
        <div class="nav-item ${isActive ? 'active' : ''}" onclick="App.loadModule(${idx})">
          <div class="nav-num">${idx + 1}</div>
          <div class="nav-text" title="${m.title}">${m.shortTitle}</div>
        </div>
      `;
    }).join('');
  },

  attachSearchListener() {
    const searchInput = document.getElementById('sidebar-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderSidebarNav(e.target.value);
      });
    }
  },

  attachKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowRight' && this.currentModuleIndex < this.modules.length - 1) {
        this.loadModule(this.currentModuleIndex + 1);
      } else if (e.key === 'ArrowLeft' && this.currentModuleIndex > 0) {
        this.loadModule(this.currentModuleIndex - 1);
      }
    });
  },

  loadModule(index) {
    if (index < 0 || index >= this.modules.length) return;
    this.currentModuleIndex = index;
    const currentModule = this.modules[index];

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach((el, idx) => {
      el.classList.toggle('active', idx === index);
    });

    // Update Top Header
    const titleEl = document.getElementById('header-module-title');
    const subEl = document.getElementById('header-module-sub');
    if (titleEl) titleEl.innerText = currentModule.title;
    if (subEl) subEl.innerText = `Mavzu ${index + 1} / 15 • Interaktiv Tahlil va Yechimlar`;

    // Render Module Content
    const contentArea = document.getElementById('module-container');
    contentArea.innerHTML = currentModule.render();

    // Call module lifecycle
    if (typeof currentModule.init === 'function') {
      currentModule.init();

      // Ensure canvas has valid dimensions after DOM reflow
      requestAnimationFrame(() => {
        if (typeof currentModule.draw === 'function') currentModule.draw();
        if (typeof currentModule.drawDiagram === 'function') currentModule.drawDiagram();
        if (typeof currentModule.drawHasse === 'function') currentModule.drawHasse();
        if (typeof currentModule.drawNumberLine === 'function') currentModule.drawNumberLine();
      });
    }

    // Scroll to top smoothly
    document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile sidebar if open
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }
  },

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
  },

  toggleCheatSheet() {
    const drawer = document.getElementById('cheatsheet-drawer');
    if (drawer) {
      drawer.classList.toggle('open');
    }
  },

  copySolution(elementId = null) {
    let target = null;
    if (elementId) {
      target = document.getElementById(elementId);
    }
    if (!target) {
      target = document.querySelector('.module-view .solution-box');
    }

    if (target) {
      const text = target.innerText.replace(/\s+/g, ' ').trim();
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('Yechim nusxalandi!', 'success');
      }).catch(() => {
        this.showToast('Nusxa olindi', 'success');
      });
    } else {
      this.showToast('Yechim topilmadi', 'info');
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : '💡'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
};

window.App = App;
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
