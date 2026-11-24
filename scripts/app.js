/**
 * Main Application Controller - La Niebla Store (DBD Merch Store Multi-page)
 */
import { MENU_CATEGORIES, MENU_ITEMS, REALMS } from './menu-data.js';
import { audio } from './audio.js';
import { SkillCheckGame } from './skill-check.js';
import { CartManager } from './cart.js';
import { productIcon, categoryIcon, rarityStyle } from './product-art.js';
import { isValidEmail, isValidTrackingCode, normalizeTrackingCode, clampQty, MAX_QTY_PER_ITEM, MAX_NOTE_LENGTH, escapeHtml, formatMoney } from './validation.js';
import { findOrder, DEMO_TRACKING_CODE, SHIPPING_METHODS } from './orders.js';

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
        <span class="tab-icon">${categoryIcon(cat.id)}</span>
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
        <div class="card-visual product-art" style="${rarityStyle(item.rarity)}">
          <span class="art-code">N°${item.id.toUpperCase()}</span>
          <div class="art-icon">${productIcon(item.id)}</div>
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
        if (!product) return;
        if (this.needsSize(product)) {
          // La ropa necesita talla: se abre la ficha para elegirla.
          this.openProductModal(id);
          this.cart.showToast('Elige tu talla antes de agregar la prenda.');
          return;
        }
        this.cart.addItem(product, 1);
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

    if (iconEl) iconEl.innerHTML = productIcon(product.id);
    const heroEl = modal.querySelector('.modal-hero-visual');
    if (heroEl) heroEl.setAttribute('style', rarityStyle(product.rarity));
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
    if (noteInput) {
      noteInput.value = '';
      noteInput.classList.remove('input-error');
      noteInput.setAttribute('maxlength', String(MAX_NOTE_LENGTH));
      noteInput.placeholder = 'Opcional: dedicatoria, envolver para regalo, etc.';
      this.updateNoteCounter();
    }
    this.renderSizePicker(product);

    modal.classList.add('active');
    audio.playClick();
  }

  /** Prendas con talla (la gorra es de ajuste universal). */
  needsSize(product) {
    return product && product.category === 'ropa' && product.id !== 'rop3';
  }

  renderSizePicker(product) {
    this.selectedSize = '';
    let picker = document.getElementById('modalSizePicker');
    if (!this.needsSize(product)) {
      if (picker) picker.remove();
      return;
    }
    if (!picker) {
      const anchor = document.querySelector('#dishDetailModal .modal-order-ctrls');
      if (!anchor) return;
      picker = document.createElement('div');
      picker.id = 'modalSizePicker';
      picker.className = 'size-picker';
      anchor.prepend(picker);
    }
    const sizes = product.id === 'rop5' ? ['22-24', '25-27', '28-30'] : ['CH', 'M', 'G', 'XG'];
    picker.classList.remove('has-error');
    picker.innerHTML = `
      <span class="size-label" id="sizeLabel">Talla <em>(obligatoria)</em></span>
      <div class="size-options" role="radiogroup" aria-labelledby="sizeLabel">
        ${sizes.map(s => `<button type="button" class="size-chip" role="radio" aria-checked="false" data-size="${s}">${s}</button>`).join('')}
      </div>
      <span class="size-error">Elige una talla para continuar.</span>`;
    picker.querySelectorAll('.size-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.selectedSize = chip.dataset.size;
        picker.classList.remove('has-error');
        picker.querySelectorAll('.size-chip').forEach(c => {
          const on = c === chip;
          c.classList.toggle('active', on);
          c.setAttribute('aria-checked', on ? 'true' : 'false');
        });
        audio.playClick();
      });
    });
  }

  updateNoteCounter() {
    const noteInput = document.getElementById('modalDishNotes');
    if (!noteInput) return;
    let counter = document.getElementById('modalNoteCounter');
    if (!counter) {
      counter = document.createElement('span');
      counter.id = 'modalNoteCounter';
      counter.className = 'note-counter';
      noteInput.insertAdjacentElement('afterend', counter);
      noteInput.addEventListener('input', () => {
        noteInput.classList.remove('input-error');
        this.updateNoteCounter();
      });
    }
    counter.textContent = `${noteInput.value.length}/${MAX_NOTE_LENGTH}`;
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
        const code = normalizeTrackingCode(input ? input.value : '');
        const fail = (msg) => {
          resultBox.style.display = 'none';
          if (input) {
            input.classList.add('input-error');
            input.setAttribute('aria-invalid', 'true');
            input.focus();
          }
          this.cart.showToast(msg, 'error');
        };

        if (!code) return fail('Escribe tu código de rastreo.');
        if (!isValidTrackingCode(code)) return fail('El código debe tener el formato DBD-MERCH-123456.');

        const order = findOrder(code);
        if (!order && code !== DEMO_TRACKING_CODE) {
          return fail('No encontramos ese pedido. Revisa el código de tu recibo.');
        }

        if (input) {
          input.value = code;
          input.classList.remove('input-error');
          input.setAttribute('aria-invalid', 'false');
        }
        if (codeDisplay) codeDisplay.textContent = code;
        this.renderTrackingOrder(resultBox, order);
        resultBox.style.display = 'block';
        resultBox.scrollIntoView({ behavior: 'smooth' });
        audio.playClick();
      });
    }
  }

  /** Muestra los datos de un pedido real del historial (o la demo si order es null). */
  renderTrackingOrder(resultBox, order) {
    let info = resultBox.querySelector('.tracking-order-info');
    if (!order) {
      if (info) info.remove();
      return;
    }
    if (!info) {
      info = document.createElement('div');
      info.className = 'tracking-order-info';
      resultBox.prepend(info);
    }
    const created = new Date(order.createdAt);
    const eta = new Date(created);
    eta.setDate(eta.getDate() + (order.etaDays || 6));
    const fmt = d => d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' });
    const pieces = order.items.reduce((s, it) => s + it.quantity, 0);
    const method = SHIPPING_METHODS[order.shippingMethod];
    info.innerHTML = `
      <strong>Pedido de ${escapeHtml(order.customer.name)}</strong>
      <span>${pieces} ${pieces === 1 ? 'pieza' : 'piezas'} · ${formatMoney(order.total)} · ${method ? method.label : 'Envío estándar'}</span>
      <span>Realizado el ${fmt(created)} · Entrega estimada: ${fmt(eta)} en ${escapeHtml(order.address.city)}, ${escapeHtml(order.address.state)}</span>`;
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
    // Al corregir un campo marcado con error, se limpia la marca
    document.addEventListener('input', (e) => {
      const el = e.target;
      if (el && el.classList && el.classList.contains('input-error')) {
        el.classList.remove('input-error');
        el.setAttribute('aria-invalid', 'false');
      }
    });

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
        if (cur >= MAX_QTY_PER_ITEM) {
          this.cart.showToast(`Máximo ${MAX_QTY_PER_ITEM} piezas por producto.`, 'error');
          return;
        }
        modalQtyInput.value = cur + 1;
      });
    }

    // Modal Add To Cart
    const modalAddBtn = document.getElementById('modalAddToCartBtn');
    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', () => {
        if (!this.selectedItem) return;
        const qty = clampQty(modalQtyInput ? modalQtyInput.value : '1');
        const noteEl = document.getElementById('modalDishNotes');
        let note = noteEl ? noteEl.value.trim() : '';
        if (note.length > MAX_NOTE_LENGTH) {
          this.cart.showToast(`La nota admite máximo ${MAX_NOTE_LENGTH} caracteres.`, 'error');
          if (noteEl) noteEl.focus();
          return;
        }
        if (this.needsSize(this.selectedItem)) {
          const picker = document.getElementById('modalSizePicker');
          if (!this.selectedSize) {
            this.cart.showToast('Selecciona una talla antes de agregar la prenda.', 'error');
            if (picker) {
              picker.classList.add('has-error');
              const first = picker.querySelector('button');
              if (first) first.focus();
            }
            return;
          }
          note = `Talla ${this.selectedSize}${note ? ' · ' + note : ''}`;
        }
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
        const email = emailInput ? emailInput.value.trim() : '';
        const nameInput = document.getElementById('mysteryName');
        const gamertag = nameInput ? nameInput.value.trim() : '';
        if (nameInput && !/^[A-Za-z0-9ÁÉÍÓÚÑáéíóúñ _.-]{3,20}$/.test(gamertag)) {
          nameInput.classList.add('input-error');
          nameInput.setAttribute('aria-invalid', 'true');
          nameInput.focus();
          this.cart.showToast('El nombre o gamertag debe tener de 3 a 20 caracteres (letras, números, _ . -).', 'error');
          return;
        }
        if (nameInput) {
          nameInput.classList.remove('input-error');
          nameInput.setAttribute('aria-invalid', 'false');
        }
        if (!isValidEmail(email)) {
          if (emailInput) {
            emailInput.classList.add('input-error');
            emailInput.setAttribute('aria-invalid', 'true');
            emailInput.focus();
          }
          this.cart.showToast(email ? 'Ese correo no tiene un formato válido.' : 'Escribe tu correo para suscribirte.', 'error');
          return;
        }
        emailInput.classList.remove('input-error');
        emailInput.setAttribute('aria-invalid', 'false');
        this.cart.showToast(`Suscripción simulada registrada para ${email}.`);
        mysteryForm.reset();
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
