/**
 * Shopping Cart & Bloodpoints Order Management
 * La Niebla Store - Fan store escolar inspirada en Dead by Daylight
 */
import { audio } from './audio.js';
import { MENU_ITEMS } from './menu-data.js';
import { productIcon, rarityStyle } from './product-art.js';
import { Checkout } from './checkout.js';
import {
  escapeHtml, sanitizeNote, clampQty, formatMoney, isValidCouponFormat, MAX_QTY_PER_ITEM
} from './validation.js';

/** Cupones disponibles: código → { porcentaje, etiqueta }. */
const COUPONS = {
  'HEX:RUIN20': { percent: 20, label: 'HEX: RUINA (20% OFF)' },
  RUIN20: { percent: 20, label: 'HEX: RUINA (20% OFF)' },
  ENTITY20: { percent: 20, label: 'HEX: RUINA (20% OFF)' },
  BLOODHUNT: { percent: 15, label: 'BLOOD HUNT (15% OFF)' },
  ESCAPECAKE: { percent: 15, label: 'BLOOD HUNT (15% OFF)' },
  ENTITY15: { percent: 15, label: 'BLOOD HUNT (15% OFF)' },
  DEADHARD: { percent: 10, label: 'DEAD HARD (10% OFF)' },
  ENTITY10: { percent: 10, label: 'DEAD HARD (10% OFF)' }
};
const MAX_DISCOUNT = 25;

export class CartManager {
  constructor(cartDrawerId, badgeId, countId) {
    this.cartDrawer = document.getElementById(cartDrawerId);
    this.badgeEl = document.getElementById(badgeId);
    this.countEl = document.getElementById(countId);
    this.items = [];
    this.discountPercent = 0;
    this.discountCode = '';
    this.checkout = new Checkout(this);

    this.init();
  }

  init() {
    this.loadFromStorage();
    this.render();
    this.bindEvents();
  }

  /**
   * Carga el carrito guardado y lo reconstruye a partir del catálogo:
   * descarta productos inexistentes y vuelve a tomar precios reales,
   * así un localStorage editado a mano no puede cambiar precios.
   */
  loadFromStorage() {
    try {
      const saved = JSON.parse(localStorage.getItem('dbd_cart_items') || '[]');
      this.items = (Array.isArray(saved) ? saved : [])
        .map(it => {
          const product = MENU_ITEMS.find(p => p.id === it.id);
          return product ? this.buildLine(product, clampQty(it.quantity), sanitizeNote(it.note)) : null;
        })
        .filter(Boolean);

      const savedDiscount = JSON.parse(localStorage.getItem('dbd_cart_discount') || '{}');
      const percent = Number(savedDiscount.percent) || 0;
      this.discountPercent = Math.min(Math.max(percent, 0), MAX_DISCOUNT);
      this.discountCode = this.discountPercent ? String(savedDiscount.code || '').slice(0, 40) : '';
    } catch (e) {
      this.items = [];
      this.discountPercent = 0;
      this.discountCode = '';
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('dbd_cart_items', JSON.stringify(
        this.items.map(({ id, quantity, note }) => ({ id, quantity, note }))
      ));
      localStorage.setItem('dbd_cart_discount', JSON.stringify({
        percent: this.discountPercent,
        code: this.discountCode
      }));
    } catch (e) {}
  }

  buildLine(product, quantity, note) {
    return {
      id: product.id,
      name: product.name,
      character: product.character,
      category: product.category,
      rarity: product.rarity,
      priceBP: product.priceBP,
      priceMoney: product.priceMoney,
      quantity,
      note
    };
  }

  addItem(product, quantity = 1, rawNote = '') {
    const note = sanitizeNote(rawNote);
    const qty = clampQty(quantity);
    const existing = this.items.find(it => it.id === product.id && it.note === note);

    if (existing) {
      if (existing.quantity >= MAX_QTY_PER_ITEM) {
        this.showToast(`Máximo ${MAX_QTY_PER_ITEM} piezas por producto.`, 'error');
        this.openDrawer();
        return;
      }
      const allowed = Math.min(qty, MAX_QTY_PER_ITEM - existing.quantity);
      existing.quantity += allowed;
      if (allowed < qty) this.showToast(`Solo se agregaron ${allowed}: el máximo es ${MAX_QTY_PER_ITEM} por producto.`, 'error');
    } else {
      this.items.push(this.buildLine(product, qty, note));
    }

    this.saveToStorage();
    this.render();
    this.openDrawer();
    audio.playBloodpointClaim();
    this.showToast(`"${product.name}" añadido a tu carrito.`);
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
      if (this.items.length === 0) this.clearDiscount(false);
      this.saveToStorage();
      this.render();
      audio.playClick();
    }
  }

  updateQuantity(index, delta) {
    const item = this.items[index];
    if (!item) return;
    const next = item.quantity + delta;
    if (next <= 0) {
      this.removeItem(index);
      return;
    }
    if (next > MAX_QTY_PER_ITEM) {
      this.showToast(`Máximo ${MAX_QTY_PER_ITEM} piezas por producto.`, 'error');
      return;
    }
    item.quantity = next;
    this.saveToStorage();
    this.render();
    audio.playClick();
  }

  clear() {
    this.items = [];
    this.clearDiscount(false);
    this.saveToStorage();
    this.render();
  }

  /**
   * Aplica un descuento. Los descuentos no se acumulan:
   * se conserva siempre el mayor para que un cupón menor no borre uno mejor.
   */
  applyDiscount(percent, codeName = 'SKILLCHECK_BONUS') {
    const safe = Math.min(Math.max(Number(percent) || 0, 0), MAX_DISCOUNT);
    if (safe <= this.discountPercent) {
      this.showToast(`Ya tienes un descuento igual o mayor (${this.discountPercent}%).`, 'error');
      return false;
    }
    this.discountPercent = safe;
    this.discountCode = codeName;
    this.saveToStorage();
    this.render();
    this.showToast(`Descuento del ${safe}% aplicado (${codeName}).`);
    return true;
  }

  clearDiscount(notify = true) {
    this.discountPercent = 0;
    this.discountCode = '';
    if (notify) {
      this.saveToStorage();
      this.render();
      this.showToast('Descuento eliminado.');
    }
  }

  getTotalBP() {
    const raw = this.items.reduce((sum, it) => sum + (it.priceBP * it.quantity), 0);
    return Math.round(raw * (1 - this.discountPercent / 100));
  }

  getTotalMoney() {
    const discounted = this.getRawTotalMoney() * (1 - this.discountPercent / 100);
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
        <div class="cart-item-icon" style="${rarityStyle(item.rarity)}">${productIcon(item.id)}</div>
        <div class="cart-item-info">
          <div class="cart-item-header">
            <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
            <button class="cart-item-del" data-index="${index}" title="Eliminar artículo" aria-label="Eliminar ${escapeHtml(item.name)}">&times;</button>
          </div>
          <div class="cart-item-char">${escapeHtml(item.character)}</div>
          ${item.note ? `<div class="cart-item-note">Nota: “${escapeHtml(item.note)}”</div>` : ''}
          <div class="cart-item-pricing">
            <span class="bp-tag">${(item.priceBP * item.quantity).toLocaleString('es-MX')} BP</span>
            <span class="money-tag">${formatMoney(item.priceMoney * item.quantity)}</span>
          </div>
        </div>
        <div class="cart-item-ctrls">
          <button class="qty-btn btn-minus" data-index="${index}" aria-label="Quitar una pieza">-</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn btn-plus" data-index="${index}" aria-label="Agregar una pieza" ${item.quantity >= MAX_QTY_PER_ITEM ? 'disabled' : ''}>+</button>
        </div>
      </div>
    `).join('');

    const bindIdx = (selector, fn) => itemsContainer.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('click', e => fn(parseInt(e.currentTarget.getAttribute('data-index'), 10)));
    });
    bindIdx('.cart-item-del', idx => this.removeItem(idx));
    bindIdx('.btn-minus', idx => this.updateQuantity(idx, -1));
    bindIdx('.btn-plus', idx => this.updateQuantity(idx, 1));

    if (subtotalBPEl) subtotalBPEl.textContent = `${this.getTotalBP().toLocaleString('es-MX')} BP`;
    if (totalMoneyEl) totalMoneyEl.textContent = formatMoney(this.getTotalMoney());

    if (discountRow && discountAmountEl) {
      if (this.discountPercent > 0) {
        discountRow.style.display = 'flex';
        const savedMoney = this.getRawTotalMoney() * (this.discountPercent / 100);
        discountAmountEl.innerHTML = `-${this.discountPercent}% (-${formatMoney(savedMoney)}) <button type="button" class="discount-remove" id="cartRemoveDiscount" aria-label="Quitar descuento">quitar</button>`;
        discountAmountEl.querySelector('#cartRemoveDiscount').addEventListener('click', () => this.clearDiscount());
      } else {
        discountRow.style.display = 'none';
      }
    }
  }

  applyCoupon(input) {
    const val = input.value.trim().toUpperCase().replace(/\s+/g, '');
    const setState = (msg) => {
      input.classList.toggle('input-error', !!msg);
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) this.showToast(msg, 'error');
    };

    if (!val) return setState('Escribe un código de descuento.');
    if (!isValidCouponFormat(val)) return setState('El código solo admite letras, números y ":" (3 a 20 caracteres).');
    const coupon = COUPONS[val];
    if (!coupon) return setState('Código no válido o expirado.');

    setState('');
    if (this.applyDiscount(coupon.percent, coupon.label)) input.value = '';
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
      couponInput.setAttribute('maxlength', '20');
      couponBtn.addEventListener('click', () => this.applyCoupon(couponInput));
      couponInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.applyCoupon(couponInput);
        }
      });
      couponInput.addEventListener('input', () => couponInput.classList.remove('input-error'));
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.cartDrawer && this.cartDrawer.classList.contains('active')) this.closeDrawer();
    });
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
    if (this.items.length === 0) {
      this.showToast('Tu carrito está vacío.', 'error');
      return;
    }
    this.closeDrawer();
    this.checkout.open();
  }

  /** Muestra el recibo de un pedido ya validado y guardado por Checkout. */
  showCheckoutConfirmation(order) {
    const orderModal = document.getElementById('orderConfirmationModal');
    if (!orderModal) return;

    const receiptItems = document.getElementById('receiptItemsList');
    const receiptBP = document.getElementById('receiptTotalBP');
    const receiptMoney = document.getElementById('receiptTotalMoney');
    const receiptCode = document.getElementById('receiptOrderCode');

    if (receiptCode) receiptCode.textContent = order.code;
    if (receiptBP) receiptBP.textContent = `${order.totalBP.toLocaleString('es-MX')} BP`;
    if (receiptMoney) receiptMoney.textContent = formatMoney(order.total);

    if (receiptItems) {
      const row = (a, b, cls = '') => `<div class="receipt-row ${cls}"><span>${a}</span><span>${b}</span></div>`;
      receiptItems.innerHTML = [
        `<div class="receipt-row receipt-customer"><span>Para: <strong>${escapeHtml(order.customer.name)}</strong> · ${escapeHtml(order.address.city)}, ${escapeHtml(order.address.state)} ${escapeHtml(order.address.zip)}</span></div>`,
        ...order.items.map(it => row(`${it.quantity}× ${escapeHtml(it.name)}`, formatMoney(it.price * it.quantity))),
        order.discount > 0 ? row(`Descuento (${order.discountPercent}%)`, `-${formatMoney(order.discount)}`, 'receipt-discount') : '',
        row('Envío', order.shipping === 0 ? 'Gratis' : formatMoney(order.shipping))
      ].join('');
    }

    orderModal.classList.add('active');
    audio.playBloodpointClaim();
    this.clear();
  }

  showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      container.setAttribute('role', 'status');
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = type === 'error' ? '!' : '✓';
    const text = document.createElement('span');
    text.className = 'toast-text';
    text.textContent = message;
    toast.append(icon, text);

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}
