/**
 * Main Application Controller - La Niebla Store (DBD Merch Store Multi-page)
 */
import { MENU_CATEGORIES, MENU_ITEMS, REALMS } from './menu-data.js';
import { audio } from './audio.js';
import { SkillCheckGame } from './skill-check.js';
import { CartManager } from './cart.js';

class DBDApp {
  constructor() {
    this.currentCategory = 'all';
    this.currentSort = 'featured';
    this.searchQuery = '';
    this.cart = null;
    this.skillCheck = null;
    this.selectedItem = null;

    this.init();
  }

  init() {
    this.parseUrlParams();
    this.initFogCanvas();
    this.initAudioToggle();
    this.initCart();
    this.initSkillCheck();
    this.renderCategories();
    this.renderMenu();
    this.renderFeaturedHome();
    this.renderStoreZones();
    this.initTrackingSimulator();
    this.initInteractivePassport();
    this.bindEvents();
    this.initScrollEffects();
  }

  // --- 0. URL PARAMETERS (e.g. catalogo.html?cat=ropa) ---
  parseUrlParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('cat');
      if (cat && MENU_CATEGORIES.some(c => c.id === cat)) {
        this.currentCategory = cat;
      }
      const q = params.get('q');
      if (q) {
        this.searchQuery = q;
        const searchInput = document.getElementById('menuSearchInput');
        if (searchInput) searchInput.value = q;
      }
    } catch (e) {}
  }

  // --- 1. AMBIENT FOG & PARTICLES CANVAS ---
  initFogCanvas() {
    const canvas = document.getElementById('fogCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.5 + Math.random() * 3.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -0.3 - Math.random() * 0.7,
        alpha: 0.1 + Math.random() * 0.6,
        color: Math.random() > 0.4 ? 'rgba(255, 32, 78,' : 'rgba(255, 140, 0,',
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseAngle: Math.random() * Math.PI
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseAngle += p.pulseSpeed;

        const currentAlpha = Math.max(0.05, p.alpha + Math.sin(p.pulseAngle) * 0.2);

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color === 'rgba(255, 32, 78,' ? '#ff204e' : '#ff9900';
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }

  // --- 2. AUDIO TOGGLE ---
  initAudioToggle() {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
      const isSoundOn = audio.toggleSound();
      audioBtn.classList.toggle('active', isSoundOn);
      const icon = audioBtn.querySelector('.audio-icon');
      const text = audioBtn.querySelector('.audio-text');
      if (icon) icon.textContent = isSoundOn ? '🔊' : '🔇';
      if (text) text.textContent = isSoundOn ? 'Atmósfera Activa' : 'Activar Sonido';
    });
  }

  // --- 3. CART SYSTEM ---
  initCart() {
    this.cart = new CartManager('cartDrawer', 'cartBadge', 'cartItemsCount');
  }

  // --- 4. SKILL CHECK MINIGAME ---
  initSkillCheck() {
    this.skillCheck = new SkillCheckGame('skillCheckContainer', (discount, bp) => {
      if (discount > 0) {
        this.cart.applyDiscount(discount, `SKILLCHECK_${discount}%`);
      }
    });

    const openSkillCheckBtns = document.querySelectorAll('.open-skillcheck-trigger');
    openSkillCheckBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        audio.playClick();
        this.skillCheck.show();
      });
    });
  }

  // --- 5. CATEGORIES & MENU RENDERING ---
  renderCategories() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    container.innerHTML = MENU_CATEGORIES.map(cat => `
      <button class="filter-tab ${cat.id === this.currentCategory ? 'active' : ''}" data-category="${cat.id}">
        <span class="tab-icon">${cat.icon}</span>
        <span class="tab-label">${cat.name}</span>
      </button>
    `).join('');

    container.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-category');
        this.setCategory(cat);
      });
    });
  }

  setCategory(categoryId) {
    this.currentCategory = categoryId;
    audio.playClick();

    // If we're not on catalogo.html, navigate there
    if (!document.getElementById('menuGrid') && !document.getElementById('categoryFilters')) {
      window.location.href = `catalogo.html?cat=${categoryId}`;
      return;
    }

    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-category') === categoryId);
    });

    // Update URL without reload
    try {
      const url = new URL(window.location);
      if (categoryId === 'all') {
        url.searchParams.delete('cat');
      } else {
        url.searchParams.set('cat', categoryId);
      }
      window.history.replaceState({}, '', url);
    } catch (e) {}

    this.renderMenu();
  }

  getFilteredAndSortedItems() {
    let items = [...MENU_ITEMS];

    // Filter by Category
    if (this.currentCategory !== 'all') {
      items = items.filter(it => it.category === this.currentCategory);
    }

    // Filter by Search Query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(it => 
        it.name.toLowerCase().includes(q) ||
        it.character.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q) ||
        it.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
        it.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Sorting
    const rarityWeight = {
      'iridescent': 4,
      'ultra-rare': 3,
      'very-rare': 2,
      'rare': 1,
      'uncommon': 0
    };

    switch (this.currentSort) {
      case 'price-asc':
        items.sort((a, b) => a.priceMoney - b.priceMoney);
        break;
      case 'price-desc':
        items.sort((a, b) => b.priceMoney - a.priceMoney);
        break;
      case 'rarity':
        items.sort((a, b) => (rarityWeight[b.rarity] || 0) - (rarityWeight[a.rarity] || 0));
        break;
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Featured first, then rest
        items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return items;
  }

  generateProductCardHtml(item) {
    return `
      <article class="menu-card rarity-border-${item.rarity} card-product" data-id="${item.id}">
        
        <!-- Top Badges & Rarity -->
        <div class="card-top-bar">
          <span class="rarity-pill rarity-${item.rarity}">
            <span class="gem-icon">💎</span> ${item.rarityLabel}
          </span>
          ${item.badge ? `<span class="special-badge">${item.badge}</span>` : ''}
        </div>

        <!-- Product Visual Representation -->
        <div class="card-visual">
          <div class="perk-diamond-frame">
            <span class="dish-emoji">${item.imageFallback}</span>
            <div class="perk-glow"></div>
          </div>
          <span class="card-char-name">${item.character}</span>
        </div>

        <!-- Content -->
        <div class="card-body">
          <div class="card-titles">
            <h3 class="card-name">${item.name}</h3>
            <span class="card-sub">${item.subtitle}</span>
          </div>

          <p class="card-desc">${item.description}</p>

          <!-- Lore quote -->
          <blockquote class="card-lore">${item.lore}</blockquote>

          <!-- Featured Feature Tag -->
          ${item.perks && item.perks.length > 0 ? `
            <div class="card-perk-snippet">
              <span class="perk-label">✨ Destaca: <strong>${item.perks[0].name}</strong></span>
              <span class="perk-snippet-text">${item.perks[0].desc}</span>
            </div>
          ` : ''}

          <!-- Tags -->
          <div class="card-tags-row">
            ${item.tags.slice(0, 3).map(tag => `<span class="mini-tag">#${tag}</span>`).join('')}
          </div>
        </div>

        <!-- Card Footer / Pricing & Actions -->
        <div class="card-footer">
          <div class="price-container">
            <div class="bp-price">
              <span class="bp-icon">🩸</span>
              <span class="bp-amount">${item.priceBP.toLocaleString()}</span>
              <span class="bp-unit">BP</span>
            </div>
            <div class="money-price">$${item.priceMoney.toFixed(2)} MXN</div>
          </div>

          <div class="card-actions">
            <button class="btn-card-details" data-id="${item.id}" title="Ver detalles y especificaciones">
              <span>👁️</span>
            </button>
            <button class="btn-dbd btn-add-dish" data-id="${item.id}">
              <span class="btn-text">+ Carrito</span>
            </button>
          </div>
        </div>

      </article>
    `;
  }

  renderMenu() {
    const grid = document.getElementById('menuGrid');
    const emptyMsg = document.getElementById('menuEmptyMessage');
    const countBadge = document.getElementById('catalogCount');
    if (!grid) return;

    const items = this.getFilteredAndSortedItems();

    if (countBadge) {
      countBadge.innerHTML = `Mostrando <strong>${items.length}</strong> artículos en la niebla`;
    }

    if (items.length === 0) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = 'block';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    grid.innerHTML = items.map(item => this.generateProductCardHtml(item)).join('');
    this.bindCardEventListeners(grid);
  }

  // --- Featured Items for Home Page (index.html) ---
  renderFeaturedHome() {
    const featuredGrid = document.getElementById('featuredHomeGrid');
    if (!featuredGrid) return;

    // Grab 8 featured products across categories
    const featured = MENU_ITEMS.filter(it => it.featured).slice(0, 8);
    featuredGrid.innerHTML = featured.map(item => this.generateProductCardHtml(item)).join('');
    this.bindCardEventListeners(featuredGrid);
  }

  bindCardEventListeners(container) {
    container.querySelectorAll('.btn-add-dish').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-id');
        const product = MENU_ITEMS.find(d => d.id === id);
        if (product) this.cart.addItem(product, 1);
      });
    });

    container.querySelectorAll('.btn-card-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-id');
        this.openProductModal(id);
      });
    });

    container.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          const id = card.getAttribute('data-id');
          this.openProductModal(id);
        }
      });
    });
  }

  // --- 6. PRODUCT DETAILS MODAL ---
  openProductModal(productId) {
    const product = MENU_ITEMS.find(d => d.id === productId);
    if (!product) return;

    this.selectedItem = product;
    const modal = document.getElementById('dishDetailModal');
    if (!modal) return;

    const iconEl = document.getElementById('modalDishIcon');
    const rarityEl = document.getElementById('modalDishRarity');
    const nameEl = document.getElementById('modalDishName');
    const subEl = document.getElementById('modalDishSub');
    const descEl = document.getElementById('modalDishDesc');
    const loreEl = document.getElementById('modalDishLore');
    const ingredientsEl = document.getElementById('modalDishIngredients');
    const perksEl = document.getElementById('modalDishPerks');
    const bpEl = document.getElementById('modalDishBP');
    const moneyEl = document.getElementById('modalDishMoney');
    const qtyInput = document.getElementById('modalDishQty');
    const noteInput = document.getElementById('modalDishNotes');

    const catObj = MENU_CATEGORIES.find(c => c.id === product.category);
    const catName = catObj ? catObj.name : 'Merch';

    if (iconEl) iconEl.textContent = product.imageFallback;
    if (rarityEl) {
      rarityEl.className = `rarity-pill rarity-${product.rarity}`;
      rarityEl.innerHTML = `💎 ${product.rarityLabel} (${catName})`;
    }
    if (nameEl) nameEl.textContent = product.name;
    if (subEl) subEl.textContent = `${product.character} • ${product.subtitle}`;
    if (descEl) descEl.textContent = product.description;
    if (loreEl) loreEl.textContent = product.lore;

    if (ingredientsEl) {
      ingredientsEl.innerHTML = product.ingredients.map(spec => `
        <span class="ingredient-badge">📦 ${spec}</span>
      `).join('');
    }

    if (perksEl) {
      perksEl.innerHTML = product.perks.map(p => `
        <div class="modal-perk-card">
          <div class="perk-mini-icon">✨</div>
          <div class="perk-info">
            <strong>${p.name}</strong>
            <p>${p.desc}</p>
          </div>
        </div>
      `).join('');
    }

    if (bpEl) bpEl.textContent = `${product.priceBP.toLocaleString()} BP`;
    if (moneyEl) moneyEl.textContent = `$${product.priceMoney.toFixed(2)} MXN`;
    if (qtyInput) qtyInput.value = '1';
    if (noteInput) noteInput.value = '';

    modal.classList.add('active');
    audio.playClick();
  }

  closeProductModal() {
    const modal = document.getElementById('dishDetailModal');
    if (modal) modal.classList.remove('active');
  }

  // --- 7. STORE ZONES / CORNERS ---
  renderStoreZones() {
    const cardsContainer = document.getElementById('realmsCardsList');
    if (!cardsContainer) return;

    cardsContainer.innerHTML = REALMS.map((r, idx) => `
      <div class="realm-card ${idx === 0 ? 'selected' : ''}" data-realm="${r.name}">
        <div class="realm-card-header">
          <span class="realm-icon">🏛️</span>
          <h4>${r.name}</h4>
        </div>
        <p class="realm-desc">${r.desc}</p>
        <span class="realm-cap">🏷️ ${r.capacity}</span>
      </div>
    `).join('');

    cardsContainer.querySelectorAll('.realm-card').forEach(card => {
      card.addEventListener('click', () => {
        cardsContainer.querySelectorAll('.realm-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        audio.playClick();
      });
    });
  }

  // --- 8. TRACKING SIMULATOR (envios.html) ---
  initTrackingSimulator() {
    const trackingForm = document.getElementById('trackingForm');
    const resultBox = document.getElementById('trackingResultBox');
    const codeDisplay = document.getElementById('trackCodeDisplay');
    const fillDemoBtn = document.getElementById('trackFillDemoBtn');

    if (fillDemoBtn) {
      fillDemoBtn.addEventListener('click', () => {
        const input = document.getElementById('trackingInput');
        if (input) input.value = 'DBD-MERCH-849201';
      });
    }

    if (trackingForm && resultBox) {
      trackingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('trackingInput');
        const code = input ? input.value.trim().toUpperCase() : 'DBD-MERCH-849201';
        if (!code) return;

        if (codeDisplay) codeDisplay.textContent = code;
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth' });
        audio.playClick();
      });
    }
  }

  // --- 9. INTERACTIVE PASSPORT (drops.html) ---
  initInteractivePassport() {
    const stamps = document.querySelectorAll('.interactive-stamp');
    if (stamps.length === 0) return;

    const rewardMessages = [
      '¡Sello 1 obtenido! Desbloqueaste 10,000 BP de bonificación para tu próxima orden.',
      '¡Sello 2 obtenido! Tienes envío gratis en tu siguiente compra.',
      '¡Sello 3 obtenido! Descuento permanente del 10% en snacks y dulces.',
      '¡Sello 4 obtenido! Acceso exclusivo a la preventa secreta de la próxima semana.',
      '¡SELLO 5 COMPLETO! 🎉 ¡Felicidades! Desbloqueaste el Pin Dorado Exclusivo Hex Perk de regalo + 25% OFF.'
    ];

    stamps.forEach((stamp, index) => {
      stamp.addEventListener('click', () => {
        stamp.classList.toggle('stamped');
        audio.playBloodpointClaim();
        const msg = rewardMessages[index] || '¡Sello registrado en el Ente!';
        this.cart.showToast(msg);
      });
    });
  }

  // --- 10. EVENT LISTENERS ---
  bindEvents() {
    // Search input listener
    const searchInput = document.getElementById('menuSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderMenu();
      });
    }

    // Sort select listener
    const sortSelect = document.getElementById('catalogSort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        audio.playClick();
        this.renderMenu();
      });
    }

    // Modal Close
    const modalCloseBtn = document.getElementById('modalDishClose');
    const modalBackdrop = document.getElementById('dishDetailModal');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => this.closeProductModal());
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) this.closeProductModal();
      });
    }

    // Modal Qty buttons
    const modalQtyMinus = document.getElementById('modalQtyMinus');
    const modalQtyPlus = document.getElementById('modalQtyPlus');
    const modalQtyInput = document.getElementById('modalDishQty');

    if (modalQtyMinus && modalQtyInput) {
      modalQtyMinus.addEventListener('click', () => {
        const cur = parseInt(modalQtyInput.value, 10) || 1;
        if (cur > 1) modalQtyInput.value = cur - 1;
      });
    }
    if (modalQtyPlus && modalQtyInput) {
      modalQtyPlus.addEventListener('click', () => {
        const cur = parseInt(modalQtyInput.value, 10) || 1;
        modalQtyInput.value = cur + 1;
      });
    }

    // Modal Add To Cart
    const modalAddBtn = document.getElementById('modalAddToCartBtn');
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        if (!this.selectedItem) return;
        const qty = parseInt(modalQtyInput ? modalQtyInput.value : '1', 10) || 1;
        const note = document.getElementById('modalDishNotes') ? document.getElementById('modalDishNotes').value.trim() : '';
        this.cart.addItem(this.selectedItem, qty, note);
        this.closeProductModal();
      });
    }

    // Order confirmation modal close
    const orderModalClose = document.getElementById('orderConfirmationClose');
    const orderModal = document.getElementById('orderConfirmationModal');
    if (orderModalClose && orderModal) {
      orderModalClose.addEventListener('click', () => {
        orderModal.classList.remove('active');
      });
      orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) orderModal.classList.remove('active');
      });
    }

    // Newsletter / Mystery Box form handling
    const mysteryForm = document.getElementById('mysteryBoxForm');
    if (mysteryForm) {
      mysteryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('mysteryEmail');
        const email = emailInput ? emailInput.value : '';
        if (email) {
          this.cart.showToast(`¡Suscrito a los Drops de la Niebla! Revisa tu correo: ${email}`);
          mysteryForm.reset();
        }
      });
    }

    // Mobile nav drawer controls
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');

    const openMobileNav = () => {
      if (mobileNavOverlay) mobileNavOverlay.classList.add('open');
      if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
      audio.playClick();
    };

    const closeMobileNav = () => {
      if (mobileNavOverlay) mobileNavOverlay.classList.remove('open');
      if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    };

    if (mobileNavToggle) mobileNavToggle.addEventListener('click', openMobileNav);
    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileNav);
    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) closeMobileNav();
      });
    }

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }

  initScrollEffects() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.dbdApp = new DBDApp();
});
