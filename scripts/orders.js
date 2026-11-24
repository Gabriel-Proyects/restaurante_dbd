/**
 * Historial de pedidos simulados (localStorage) - La Niebla Store
 * Permite que el rastreador de envios.html encuentre los folios reales del checkout.
 */

const STORAGE_KEY = 'dbd_orders';
export const DEMO_TRACKING_CODE = 'DBD-MERCH-849201';

export const SHIPPING_METHODS = {
  estandar: { label: 'Estándar (3 a 6 días hábiles)', price: 99, days: 6 },
  express: { label: 'Express (1 a 2 días hábiles)', price: 189, days: 2 }
};
export const FREE_SHIPPING_FROM = 999;

export function shippingCost(method, subtotalAfterDiscount) {
  const m = SHIPPING_METHODS[method] || SHIPPING_METHODS.estandar;
  if (method === 'estandar' && subtotalAfterDiscount >= FREE_SHIPPING_FROM) return 0;
  return m.price;
}

export function getOrders() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.slice(0, 20)));
  } catch (e) {}
}

export function findOrder(code) {
  return getOrders().find(o => o.code === code) || null;
}

export function generateOrderCode() {
  const taken = new Set(getOrders().map(o => o.code));
  let code;
  do {
    code = 'DBD-MERCH-' + Math.floor(100000 + Math.random() * 900000);
  } while (taken.has(code) || code === DEMO_TRACKING_CODE);
  return code;
}
