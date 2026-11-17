/**
 * Shopping Cart & Bloodpoints Order Management
 * La Niebla Store - Tienda de Merchandising Dead by Daylight
 */
import { audio } from './audio.js';

export class CartManager {
  constructor(cartDrawerId, badgeId, countId) {
    this.cartDrawer = document.getElementById(cartDrawerId);
    this.badgeEl = document.getElementById(badgeId);
    this.countEl = document.getElementById(countId);
    this.items = [];
    this.discountPercent = 0;
    this.discountCode = '';
    this.bonusBP = 0;

    this.init();
  }

  init() {
    this.loadFromStorage();
    this.render();
    this.bindEvents();
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('dbd_cart_items');
      if (saved) {
        this.items = JSON.parse(saved);
      }
      const savedDiscount = localStorage.getItem('dbd_cart_discount');
      if (savedDiscount) {
        const parsed = JSON.parse(savedDiscount);
        this.discountPercent = parsed.percent || 0;
        this.discountCode = parsed.code || '';
      }
    } catch (e) {
      this.items = [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('dbd_cart_items', JSON.stringify(this.items));
      localStorage.setItem('dbd_cart_discount', JSON.stringify({
        percent: this.discountPercent,
        code: this.discountCode
      }));
    } catch (e) {}
  }

  addItem(product, quantity = 1, note = '') {
    const existingIndex = this.items.findIndex(it => it.id === product.id && it.note === note);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        character: product.character,
        category: product.category,
        rarity: product.rarity,
        priceBP: product.priceBP,
        priceMoney: product.priceMoney,
        imageFallback: product.imageFallback,
        quantity: quantity,
        note: note
      });
    }

    this.saveToStorage();
    this.render();
    this.openDrawer();
    audio.playBloodpointClaim();
    this.showToast(`¡"${product.name}" añadido a tu carrito!`);
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
      this.saveToStorage();
      this.render();
      audio.playClick();
    }
  }

  updateQuantity(index, delta) {
    if (index >= 0 && index < this.items.length) {
      this.items[index].quantity += delta;
      if (this.items[index].quantity <= 0) {
        this.removeItem(index);
        return;
      }
      this.saveToStorage();
      this.render();
      audio.playClick();
    }
  }

  clear() {
    this.items = [];
    this.saveToStorage();
    this.render();
  }

  applyDiscount(percent, codeName = 'SKILLCHECK_BONUS') {
    this.discountPercent = percent;
    this.discountCode = codeName;
    this.saveToStorage();
    this.render();
    this.showToast(`¡Descuento del ${percent}% aplicado (${codeName})!`);
  }

  getTotalBP() {
    const raw = this.items.reduce((sum, it) => sum + (it.priceBP * it.quantity), 0);
    const discounted = raw * (1 - this.discountPercent / 100);
    return Math.round(discounted);
  }

  getTotalMoney() {
    const raw = this.items.reduce((sum, it) => sum + (it.priceMoney * it.quantity), 0);
    const discounted = raw * (1 - this.discountPercent / 100);
    return parseFloat(discounted.toFixed(2));
  }

  getRawTotalMoney() {
    return this.items.reduce((sum, it) => sum + (it.priceMoney * it.quantity), 0);
  }

  getTotalItemsCount() {
    return this.items.reduce((sum, it) => sum + it.quantity, 0);
  }

  render() {
    const count = this.getTotalItemsCount();
    if (this.badgeEl) {
      this.badgeEl.textContent = count;
      this.badgeEl.style.display = count > 0 ? 'inline-flex' : 'none';
    }
    if (this.countEl) {
      this.countEl.textContent = `${count} ${count === 1 ? 'artículo' : 'artículos'}`;
    }

    const itemsContainer = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('cartEmptyState');
    const footerEl = document.getElementById('cartFooter');
    const subtotalBPEl = document.getElementById('cartSubtotalBP');
    const totalMoneyEl = document.getElementById('cartTotalMoney');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountAmountEl = document.getElementById('cartDiscountAmount');

    if (!itemsContainer) return;

    if (this.items.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      itemsContainer.innerHTML = '';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footerEl) footerEl.style.display = 'block';

    itemsContainer.innerHTML = this.items.map((item, index) => `
      <div class="cart-item rarity-border-${item.rarity || 'rare'}">
        <div class="cart-item-icon">${item.imageFallback || '📦'}</div>
        <div class="cart-item-info">
          <div class="cart-item-header">
            <h4 class="cart-item-title">${item.name}</h4>
            <button class="cart-item-del" data-index="${index}" title="Eliminar artículo">&times;</button>
          </div>
          <div class="cart-item-char">${item.character}</div>
          ${item.note ? `<div class="cart-item-note">📝 "${item.note}"</div>` : ''}
          <div class="cart-item-pricing">
            <span class="bp-tag"><span class="bp-icon">🩸</span> ${(item.priceBP * item.quantity).toLocaleString()} BP</span>
            <span class="money-tag">$${(item.priceMoney * item.quantity).toFixed(2)} MXN</span>
          </div>
        </div>
        <div class="cart-item-ctrls">
          <button class="qty-btn btn-minus" data-index="${index}">-</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn btn-plus" data-index="${index}">+</button>
        </div>
      </div>
    `).join('');

    // Bind quantity and delete buttons
    itemsContainer.querySelectorAll('.cart-item-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        this.removeItem(idx);
      });
    });

    itemsContainer.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        this.updateQuantity(idx, -1);
      });
    });

    itemsContainer.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        this.updateQuantity(idx, 1);
      });
    });

    // Update totals
    if (subtotalBPEl) subtotalBPEl.textContent = `${this.getTotalBP().toLocaleString()} BP`;
    if (totalMoneyEl) totalMoneyEl.textContent = `$${this.getTotalMoney().toFixed(2)} MXN`;

    if (discountRow && discountAmountEl) {
      if (this.discountPercent > 0) {
        discountRow.style.display = 'flex';
        const savedMoney = (this.getRawTotalMoney() * (this.discountPercent / 100)).toFixed(2);
        discountAmountEl.textContent = `-${this.discountPercent}% (-$${savedMoney} MXN)`;
      } else {
        discountRow.style.display = 'none';
      }
    }
  }

  bindEvents() {
    const toggleBtn = document.getElementById('cartToggleBtn');
    const closeBtn = document.getElementById('cartCloseBtn');
    const backdrop = document.getElementById('cartBackdrop');
    const couponInput = document.getElementById('cartCouponInput');
    const couponBtn = document.getElementById('cartApplyCouponBtn');
    const checkoutBtn = document.getElementById('cartCheckoutBtn');

    if (toggleBtn) toggleBtn.addEventListener('click', () => this.toggleDrawer());
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());
    if (backdrop) backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.closeDrawer();
    });

    if (couponBtn && couponInput) {
      couponBtn.addEventListener('click', () => {
        const val = couponInput.value.trim().toUpperCase();
        if (!val) return;
        if (val === 'HEX:RUIN20' || val === 'RUIN20' || val === 'ENTITY20') {
          this.applyDiscount(20, 'HEX: RUINA (20% OFF)');
          couponInput.value = '';
        } else if (val === 'BLOODHUNT' || val === 'ESCAPECAKE' || val === 'ENTITY15') {
          this.applyDiscount(15, 'BLOOD HUNT (15% OFF)');
          couponInput.value = '';
        } else if (val === 'DEADHARD' || val === 'ENTITY10') {
          this.applyDiscount(10, 'DEAD HARD (10% OFF)');
          couponInput.value = '';
        } else {
          this.showToast('⚠️ Código de ofrenda no válido o expirado.', 'error');
        }
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }
  }

  toggleDrawer() {
    if (this.cartDrawer) {
      this.cartDrawer.classList.toggle('active');
      const bd = document.getElementById('cartBackdrop');
      if (bd) bd.classList.toggle('active');
      audio.playClick();
    }
  }

  openDrawer() {
    if (this.cartDrawer) {
      this.cartDrawer.classList.add('active');
      const bd = document.getElementById('cartBackdrop');
      if (bd) bd.classList.add('active');
    }
  }

  closeDrawer() {
    if (this.cartDrawer) {
      this.cartDrawer.classList.remove('active');
      const bd = document.getElementById('cartBackdrop');
      if (bd) bd.classList.remove('active');
    }
  }

  handleCheckout() {
    if (this.items.length === 0) return;
    this.closeDrawer();
    this.showCheckoutConfirmation();
  }

  showCheckoutConfirmation() {
    const orderModal = document.getElementById('orderConfirmationModal');
    if (!orderModal) return;

    const orderNum = 'DBD-MERCH-' + Math.floor(100000 + Math.random() * 900000);
    const receiptItems = document.getElementById('receiptItemsList');
    const receiptBP = document.getElementById('receiptTotalBP');
    const receiptMoney = document.getElementById('receiptTotalMoney');
    const receiptCode = document.getElementById('receiptOrderCode');

    if (receiptCode) receiptCode.textContent = orderNum;
    if (receiptBP) receiptBP.textContent = `${this.getTotalBP().toLocaleString()} BP`;
    if (receiptMoney) receiptMoney.textContent = `$${this.getTotalMoney().toFixed(2)} MXN`;

    if (receiptItems) {
      receiptItems.innerHTML = this.items.map(it => `
        <div class="receipt-row">
          <span>${it.quantity}x ${it.name}</span>
          <span>$${(it.priceMoney * it.quantity).toFixed(2)} MXN</span>
        </div>
      `).join('');
    }

    orderModal.classList.add('active');
    audio.playBloodpointClaim();

    // Clear cart after checkout
    this.clear();
  }

  showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'error' ? '💀' : '🩸'}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}
