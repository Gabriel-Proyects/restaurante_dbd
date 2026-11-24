/**
 * Checkout simulado con validación de formulario - La Niebla Store
 * Proyecto escolar: no se cobra nada ni se envían datos a ningún servidor.
 */
import {
  escapeHtml, formatMoney, isValidName, isValidEmail, isValidPhone, isValidPostalCode,
  isValidAddressLine, isValidCardNumber, isValidExpiry, isValidCvv
} from './validation.js';
import { SHIPPING_METHODS, FREE_SHIPPING_FROM, shippingCost, saveOrder, generateOrderCode } from './orders.js';
import { productIcon, rarityStyle } from './product-art.js';

const STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
  'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
  'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
  'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

/** Reglas por campo: función que devuelve '' si es válido o el mensaje de error. */
const RULES = {
  coName: v => (!v.trim() ? 'Escribe tu nombre completo.' : isValidName(v) ? '' : 'Usa nombre y apellido, solo letras (3 a 60 caracteres).'),
  coEmail: v => (!v.trim() ? 'Escribe tu correo.' : isValidEmail(v) ? '' : 'El correo no tiene un formato válido (ej. nombre@correo.com).'),
  coPhone: v => (!v.trim() ? 'Escribe tu teléfono.' : isValidPhone(v) ? '' : 'El teléfono debe tener 10 dígitos.'),
  coStreet: v => (isValidAddressLine(v) ? '' : 'Escribe calle y número (mínimo 5 caracteres).'),
  coColonia: v => (isValidAddressLine(v, 3) ? '' : 'Escribe la colonia.'),
  coCity: v => (isValidAddressLine(v, 3) ? '' : 'Escribe la ciudad o municipio.'),
  coState: v => (STATES.includes(v) ? '' : 'Selecciona un estado.'),
  coZip: v => (isValidPostalCode(v) ? '' : 'El código postal debe tener 5 dígitos.'),
  coCardName: v => (v.trim().length >= 3 ? '' : 'Escribe el nombre como aparece en la tarjeta.'),
  coCardNumber: v => (isValidCardNumber(v) ? '' : 'Número de tarjeta no válido. Prueba con 4242 4242 4242 4242.'),
  coCardExp: v => (isValidExpiry(v) ? '' : 'Usa el formato MM/AA con una fecha que no haya vencido.'),
  coCardCvv: v => (isValidCvv(v) ? '' : 'El CVV debe tener 3 o 4 dígitos.'),
  coTerms: (v, el) => (el.checked ? '' : 'Debes aceptar para continuar.')
};

const CARD_FIELDS = ['coCardName', 'coCardNumber', 'coCardExp', 'coCardCvv'];

export class Checkout {
  constructor(cart) {
    this.cart = cart;
    this.modal = null;
    this.form = null;
  }

  ensureMarkup() {
    if (this.modal) return;
    const wrap = document.createElement('div');
    wrap.className = 'modal-backdrop checkout-backdrop';
    wrap.id = 'checkoutModal';
    wrap.innerHTML = `
      <div class="modal-card checkout-card" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
        <button type="button" class="modal-close" id="checkoutClose" aria-label="Cerrar checkout">&times;</button>
        <div class="checkout-layout">
          <form class="checkout-form" id="checkoutForm" novalidate>
            <header class="checkout-head">
              <span class="checkout-kicker">Paso final</span>
              <h3 id="checkoutTitle">Datos de tu pedido</h3>
              <p class="checkout-demo-note">Simulación escolar: no se realiza ningún cobro y tus datos no salen de este navegador. No escribas datos bancarios reales.</p>
            </header>

            <fieldset class="checkout-fieldset">
              <legend><span>01</span> Contacto</legend>
              <div class="co-grid">
                ${this.field('coName', 'Nombre completo', 'text', 'Ej. Laurie Strode', 'name', 'full')}
                ${this.field('coEmail', 'Correo electrónico', 'email', 'nombre@correo.com', 'email')}
                ${this.field('coPhone', 'Teléfono (10 dígitos)', 'tel', '5512345678', 'tel', '', 'inputmode="numeric" maxlength="10"')}
              </div>
            </fieldset>

            <fieldset class="checkout-fieldset">
              <legend><span>02</span> Dirección de envío</legend>
              <div class="co-grid">
                ${this.field('coStreet', 'Calle y número', 'text', 'Av. Haddonfield 1978, int. 3', 'address-line1', 'full')}
                ${this.field('coColonia', 'Colonia', 'text', 'Centro', 'address-line2')}
                ${this.field('coCity', 'Ciudad / municipio', 'text', 'Guadalajara', 'address-level2')}
                <div class="co-field">
                  <label for="coState">Estado</label>
                  <select id="coState" name="coState" class="form-control" autocomplete="address-level1" aria-describedby="coState-err">
                    <option value="">Selecciona…</option>
                    ${STATES.map(s => `<option>${s}</option>`).join('')}
                  </select>
                  <span class="co-error" id="coState-err" aria-live="polite"></span>
                </div>
                ${this.field('coZip', 'Código postal', 'text', '44100', 'postal-code', '', 'inputmode="numeric" maxlength="5"')}
              </div>
            </fieldset>

            <fieldset class="checkout-fieldset">
              <legend><span>03</span> Método de envío</legend>
              <div class="co-options" id="coShippingOptions">
                ${Object.entries(SHIPPING_METHODS).map(([key, m], i) => `
                  <label class="co-option">
                    <input type="radio" name="coShipping" value="${key}" ${i === 0 ? 'checked' : ''}>
                    <span class="co-option-body">
                      <strong>${m.label}</strong>
                      <small data-ship-price="${key}">${formatMoney(m.price)}</small>
                    </span>
                  </label>`).join('')}
              </div>
              <p class="co-hint">Envío estándar gratis en compras desde ${formatMoney(FREE_SHIPPING_FROM)}.</p>
            </fieldset>

            <fieldset class="checkout-fieldset">
              <legend><span>04</span> Pago</legend>
              <div class="co-options">
                <label class="co-option"><input type="radio" name="coPayment" value="tarjeta" checked><span class="co-option-body"><strong>Tarjeta (demo)</strong><small>Tarjeta de prueba</small></span></label>
                <label class="co-option"><input type="radio" name="coPayment" value="oxxo"><span class="co-option-body"><strong>Pago en OXXO</strong><small>Ficha simulada</small></span></label>
                <label class="co-option"><input type="radio" name="coPayment" value="spei"><span class="co-option-body"><strong>Transferencia SPEI</strong><small>CLABE simulada</small></span></label>
              </div>
              <div class="co-grid co-card-fields" id="coCardFields">
                ${this.field('coCardName', 'Nombre en la tarjeta', 'text', 'LAURIE STRODE', 'off', 'full')}
                ${this.field('coCardNumber', 'Número de tarjeta', 'text', '4242 4242 4242 4242', 'off', 'full', 'inputmode="numeric" maxlength="23"')}
                ${this.field('coCardExp', 'Vencimiento (MM/AA)', 'text', '12/29', 'off', '', 'inputmode="numeric" maxlength="5"')}
                ${this.field('coCardCvv', 'CVV', 'password', '123', 'off', '', 'inputmode="numeric" maxlength="4"')}
              </div>
            </fieldset>

            <div class="co-field co-terms">
              <label class="co-check">
                <input type="checkbox" id="coTerms" name="coTerms" aria-describedby="coTerms-err">
                <span>Entiendo que es una tienda fan-made escolar y que este pedido es una simulación.</span>
              </label>
              <span class="co-error" id="coTerms-err" aria-live="polite"></span>
            </div>

            <div class="co-form-alert" id="coFormAlert" role="alert" hidden></div>

            <button type="submit" class="btn-dbd btn-killer co-submit">
              <span class="btn-text">Confirmar pedido · <span id="coSubmitTotal">$0.00 MXN</span></span>
            </button>
          </form>

          <aside class="checkout-summary" aria-label="Resumen del pedido">
            <h4>Resumen</h4>
            <div class="co-summary-items" id="coSummaryItems"></div>
            <div class="co-summary-rows">
              <div><span>Subtotal</span><span id="coSubtotal">$0.00</span></div>
              <div class="co-discount" id="coDiscountRow" hidden><span id="coDiscountLabel">Descuento</span><span id="coDiscount">-$0.00</span></div>
              <div><span>Envío</span><span id="coShipping">$0.00</span></div>
              <div class="co-total"><span>Total</span><span id="coTotal">$0.00</span></div>
              <p class="co-hint">Precios con IVA incluido.</p>
            </div>
          </aside>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    this.modal = wrap;
    this.form = wrap.querySelector('#checkoutForm');
    this.bind();
  }

  field(id, label, type, placeholder, autocomplete, extraClass = '', attrs = '') {
    return `
      <div class="co-field ${extraClass === 'full' ? 'full' : ''}">
        <label for="${id}">${label}</label>
        <input id="${id}" name="${id}" type="${type}" class="form-control" placeholder="${placeholder}" autocomplete="${autocomplete}" aria-describedby="${id}-err" ${attrs}>
        <span class="co-error" id="${id}-err" aria-live="polite"></span>
      </div>`;
  }

  bind() {
    const $ = id => this.modal.querySelector('#' + id);

    $('checkoutClose').addEventListener('click', () => this.close());
    this.modal.addEventListener('click', e => { if (e.target === this.modal) this.close(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) this.close();
    });

    // Formato automático mientras se escribe
    const digitsOnly = (id, max) => $(id).addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, max);
    });
    digitsOnly('coPhone', 10);
    digitsOnly('coZip', 5);
    digitsOnly('coCardCvv', 4);
    $('coCardNumber').addEventListener('input', e => {
      const d = e.target.value.replace(/\D/g, '').slice(0, 19);
      e.target.value = d.replace(/(\d{4})(?=\d)/g, '$1 ');
    });
    $('coCardExp').addEventListener('input', e => {
      const d = e.target.value.replace(/\D/g, '').slice(0, 4);
      e.target.value = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    });
    $('coCardName').addEventListener('input', e => { e.target.value = e.target.value.toUpperCase(); });

    // Validación al salir de cada campo y corrección en vivo si ya tenía error
    Object.keys(RULES).forEach(id => {
      const el = $(id);
      if (!el) return;
      el.addEventListener('blur', () => this.validateField(id));
      el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', () => {
        if (el.getAttribute('aria-invalid') === 'true') this.validateField(id);
      });
    });

    this.form.querySelectorAll('input[name="coShipping"]').forEach(r => r.addEventListener('change', () => this.renderSummary()));
    this.form.querySelectorAll('input[name="coPayment"]').forEach(r => r.addEventListener('change', () => this.togglePayment()));

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.submit();
    });
  }

  togglePayment() {
    const isCard = this.paymentMethod() === 'tarjeta';
    this.modal.querySelector('#coCardFields').hidden = !isCard;
    if (!isCard) CARD_FIELDS.forEach(id => this.setError(id, ''));
  }

  shippingMethod() {
    const r = this.form.querySelector('input[name="coShipping"]:checked');
    return r ? r.value : 'estandar';
  }

  paymentMethod() {
    const r = this.form.querySelector('input[name="coPayment"]:checked');
    return r ? r.value : 'tarjeta';
  }

  totals() {
    const subtotal = this.cart.getRawTotalMoney();
    const discount = +(subtotal * this.cart.discountPercent / 100).toFixed(2);
    const afterDiscount = subtotal - discount;
    const shipping = shippingCost(this.shippingMethod(), afterDiscount);
    return { subtotal, discount, shipping, total: +(afterDiscount + shipping).toFixed(2), afterDiscount };
  }

  renderSummary() {
    const $ = id => this.modal.querySelector('#' + id);
    const t = this.totals();

    $('coSummaryItems').innerHTML = this.cart.items.map(it => `
      <div class="co-summary-item">
        <span class="co-thumb" style="${rarityStyle(it.rarity)}">${productIcon(it.id)}</span>
        <span class="co-item-text">
          <strong>${escapeHtml(it.name)}</strong>
          <small>${it.quantity} × ${formatMoney(it.priceMoney)}${it.note ? ` · “${escapeHtml(it.note)}”` : ''}</small>
        </span>
      </div>`).join('');

    $('coSubtotal').textContent = formatMoney(t.subtotal);
    $('coDiscountRow').hidden = t.discount <= 0;
    $('coDiscountLabel').textContent = `Descuento (${this.cart.discountPercent}%)`;
    $('coDiscount').textContent = `-${formatMoney(t.discount)}`;
    $('coShipping').textContent = t.shipping === 0 ? 'Gratis' : formatMoney(t.shipping);
    $('coTotal').textContent = formatMoney(t.total);
    $('coSubmitTotal').textContent = formatMoney(t.total);

    const freeStd = t.afterDiscount >= FREE_SHIPPING_FROM;
    const stdLabel = this.modal.querySelector('[data-ship-price="estandar"]');
    if (stdLabel) stdLabel.textContent = freeStd ? 'Gratis' : formatMoney(SHIPPING_METHODS.estandar.price);
  }

  open() {
    if (this.cart.items.length === 0) return;
    this.ensureMarkup();
    this.togglePayment();
    this.renderSummary();
    this.modal.querySelector('#coFormAlert').hidden = true;
    this.modal.classList.add('active');
    document.body.classList.add('no-scroll');
    setTimeout(() => this.modal.querySelector('#coName').focus(), 50);
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  setError(id, message) {
    const el = this.modal.querySelector('#' + id);
    const err = this.modal.querySelector(`#${id}-err`);
    if (!el || !err) return;
    err.textContent = message;
    el.setAttribute('aria-invalid', message ? 'true' : 'false');
    const wrap = el.closest('.co-field');
    if (wrap) {
      wrap.classList.toggle('has-error', !!message);
      wrap.classList.toggle('is-valid', !message && el.type !== 'checkbox' && el.value.trim() !== '');
    }
  }

  validateField(id) {
    const el = this.modal.querySelector('#' + id);
    if (!el) return true;
    if (CARD_FIELDS.includes(id) && this.paymentMethod() !== 'tarjeta') {
      this.setError(id, '');
      return true;
    }
    const message = RULES[id](el.value, el);
    this.setError(id, message);
    return !message;
  }

  submit() {
    const invalid = Object.keys(RULES).filter(id => !this.validateField(id));
    const alertEl = this.modal.querySelector('#coFormAlert');

    if (this.cart.items.length === 0) {
      alertEl.textContent = 'Tu carrito está vacío.';
      alertEl.hidden = false;
      return;
    }

    if (invalid.length) {
      alertEl.textContent = `Revisa ${invalid.length === 1 ? 'el campo marcado' : `los ${invalid.length} campos marcados`} en rojo.`;
      alertEl.hidden = false;
      const first = this.modal.querySelector('#' + invalid[0]);
      if (first) first.focus();
      return;
    }
    alertEl.hidden = true;

    const val = id => this.modal.querySelector('#' + id).value.trim();
    const t = this.totals();
    const method = this.shippingMethod();
    const order = {
      code: generateOrderCode(),
      createdAt: new Date().toISOString(),
      customer: { name: val('coName'), email: val('coEmail') },
      address: { city: val('coCity'), state: val('coState'), zip: val('coZip') },
      shippingMethod: method,
      etaDays: SHIPPING_METHODS[method].days,
      payment: this.paymentMethod(),
      items: this.cart.items.map(it => ({ id: it.id, name: it.name, quantity: it.quantity, price: it.priceMoney })),
      discountPercent: this.cart.discountPercent,
      totalBP: this.cart.getTotalBP(),
      ...t
    };

    saveOrder(order);
    this.form.reset();
    this.form.querySelectorAll('.co-field').forEach(f => f.classList.remove('has-error', 'is-valid'));
    this.close();
    this.cart.showCheckoutConfirmation(order);
  }
}
