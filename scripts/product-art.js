/**
 * Ilustraciones SVG propias para cada producto de La Niebla Store.
 * Sustituyen a los emojis genéricos: trazo de línea uniforme que toma el
 * color de la rareza (currentColor) y un relleno de acento translúcido (.a).
 */

const ICONS = {
  // --- Ropa ---
  hoodie: '<path d="M22 12c2-4 18-4 20 0l10 6 6 16-7 3-4-9v26H17V28l-4 9-7-3 6-16z"/><path d="M24 12c0 7 4 11 8 11s8-4 8-11"/><path d="M29 23v8M35 23v8"/><path class="a" d="M24 40h16v8H24z"/>',
  tshirt: '<path d="M22 10l-12 6-5 12 8 3 3-6v29h32V25l3 6 8-3-5-12-12-6c-1 5-5 8-10 8s-9-3-10-8z"/><path class="a" d="M26 32l6-6 6 6-6 8z"/>',
  jersey: '<path d="M22 10l-12 6-5 12 8 3 3-6v29h32V25l3 6 8-3-5-12-12-6c-1 5-5 8-10 8s-9-3-10-8z"/><path d="M7 24l7 3M57 24l-7 3"/><path class="a" d="M27 28h10l-6 18h-5l5-13h-4z"/>',
  sweater: '<path d="M22 12l-11 5-5 30 8 1 4-22v29h28V26l4 22 8-1-5-30-11-5c-2 4-6 6-10 6s-8-2-10-6z"/><path d="M18 50h28"/><path class="a" d="M24 30h16v4H24zm0 7h16v4H24z"/>',
  jacket: '<path d="M22 11l-11 5-5 29 8 2 4-19v26h28V28l4 19 8-2-5-29-11-5-10 6z"/><path d="M32 17v36M18 50h28"/><circle class="a" cx="25" cy="30" r="3.5"/><circle class="a" cx="40" cy="37" r="3.5"/>',
  cap: '<path d="M12 40a20 20 0 0 1 40 0z"/><path d="M40 40c8 0 16 2 20 5-6 2-14 2-22 0"/><path d="M32 20v20"/><circle cx="32" cy="18" r="2"/><path class="a" d="M20 29h9v7h-9z"/>',
  sock: '<path d="M22 8h16v28l12 8c4 3 3 10-3 11l-9 1c-5 0-8-2-11-5l-5-6z"/><path d="M22 15h16"/><path class="a" d="M22 21h16v6H22z"/>',
  pants: '<path d="M18 8h28l4 50H38l-6-32-6 32H14z"/><path d="M18 14h28"/><path class="a" d="M17 30h7v8h-7zm23 0h7v8h-7z"/>',

  // --- Snacks ---
  drop: '<path d="M24 10c6 10 12 16 12 24a12 12 0 0 1-24 0c0-8 6-14 12-24z"/><path class="a" d="M44 26c4 6 8 10 8 15a8 8 0 0 1-16 0c0-5 4-9 8-15z"/><path d="M19 36a5 5 0 0 0 4 5"/>',
  lollipop: '<path d="M20 26a12 12 0 0 1 24 0c0 5-2 8-5 10v5H25v-5c-3-2-5-5-5-10z"/><circle class="a" cx="27" cy="27" r="3"/><circle class="a" cx="37" cy="27" r="3"/><path d="M30 35l2-3 2 3M32 41v18M28 41v3M36 41v3"/>',
  can: '<path d="M20 10h24l2 5v35l-2 4H20l-2-4V15z"/><path d="M18 18h28M18 47h28"/><path class="a" d="M35 22l-9 12h7l-4 10 10-14h-7z"/>',
  gear: '<circle cx="32" cy="32" r="19" stroke-width="7" stroke-dasharray="5 4.95"/><circle cx="32" cy="32" r="13"/><circle class="a" cx="32" cy="32" r="6"/>',
  medkit: '<rect x="10" y="20" width="44" height="30" rx="4"/><path d="M24 20v-5h16v5"/><path class="a" d="M28 26h8v6h6v8h-6v6h-8v-6h-6v-8h6z"/>',
  sticks: '<path d="M20 38L36 8M27 38L45 10M34 38L54 14"/><path class="a" d="M12 36h32l-4 22H16z"/><path d="M14 44h28"/>',
  chips: '<path d="M16 8h32l-3 6 3 6-2 30 2 6H16l2-6-2-30 3-6z"/><path class="a" d="M24 28c3-4 13-4 16 0l-8 13z"/><path d="M20 48h24"/>',
  tin: '<rect x="12" y="18" width="40" height="28" rx="6"/><path d="M12 26h40"/><circle class="a" cx="26" cy="36" r="4"/><circle class="a" cx="38" cy="36" r="4"/>',

  // --- Llaveros & pins ---
  beartrap: '<circle cx="32" cy="8" r="4"/><path d="M32 12v5"/><ellipse cx="32" cy="46" rx="24" ry="8"/><path d="M8 46c0-16 10-26 24-26s24 10 24 26"/><path d="M14 33l4 5M20 26l2 6M27 22l1 6M37 22l-1 6M44 26l-2 6M50 33l-4 5"/><circle class="a" cx="32" cy="46" r="4"/>',
  hexpin: '<path d="M32 6l24 26-24 26L8 32z"/><path class="a" d="M32 18l12 14-12 14-12-14z"/><path d="M27 30a5 5 0 0 1 10 0c0 2-1 3-2 4v3h-6v-3c-1-1-2-2-2-4z"/>',
  locker: '<rect x="18" y="6" width="28" height="52" rx="2"/><path d="M23 14h18M23 19h18M23 24h18M40 34v7"/><circle class="a" cx="28" cy="19" r="2.2"/><circle class="a" cx="36" cy="19" r="2.2"/>',
  bell: '<path d="M32 6v6"/><path d="M20 42V29a12 12 0 0 1 24 0v13l4 6H16z"/><path class="a" d="M27 48a5 5 0 0 0 10 0z"/><path d="M26 30c0-3 2-6 6-6"/>',
  generator: '<rect x="10" y="26" width="44" height="24" rx="2"/><path d="M18 26V16h10v10M36 26V12h10v14M14 50v6M50 50v6"/><circle class="a" cx="20" cy="38" r="4"/><circle class="a" cx="32" cy="38" r="4"/><circle class="a" cx="44" cy="38" r="4"/>',
  knife: '<g transform="rotate(-38 32 32)"><rect x="4" y="27" width="20" height="10" rx="3"/><circle cx="11" cy="32" r="1.2"/><circle cx="18" cy="32" r="1.2"/><path class="a" d="M24 25h26l10 5c-10 6-24 8-36 8z"/></g>',
  hatch: '<path d="M8 44l24-12 24 12-24 12z"/><path class="a" d="M17 44l15-7 15 7-15 7z"/><path d="M32 32L27 8l23 10-2 20"/>',
  flashlight: '<path d="M10 46l18-18 8 8-18 18z"/><path d="M28 28l6-10 12 12-10 6"/><path d="M34 18l12 12"/><path class="a" d="M50 14l8-8M52 22l8-3M42 12l3-8" stroke-width="3"/>',

  // --- Peluches & figuras ---
  bunnymask: '<path d="M23 26c-4-10-4-18 0-20 4 0 6 8 6 18M41 26c4-10 4-18 0-20-4 0-6 8-6 18"/><path d="M16 39c0-10 7-15 16-15s16 5 16 15-7 18-16 18-16-8-16-18z"/><path class="a" d="M22 37l7 2-7 3zm20 0l-7 2 7 3z"/><path d="M28 49h8"/>',
  ghostmask: '<path d="M32 6c-12 0-18 10-18 24 0 12 6 26 18 28 12-2 18-16 18-28 0-14-6-24-18-24z"/><path class="a" d="M21 24c4-2 8 0 8 7-4 2-8 0-8-7zm22 0c-4-2-8 0-8 7 4 2 8 0 8-7z"/><path d="M28 41c2 7 6 7 8 0-2-2-6-2-8 0z"/>',
  horse: '<path d="M22 58V42c0-12 6-22 16-26l-2-8 7 6c6 2 11 8 13 15l1 5c0 3-3 5-6 4l-7-2-6 4v18"/><path d="M30 19c-6 4-10 11-10 19"/><circle class="a" cx="42" cy="21" r="2.2"/><circle class="a" cx="47" cy="25" r="2.2"/><circle class="a" cx="41" cy="27" r="2.2"/>',
  trappermask: '<path d="M16 22c0-10 8-16 16-16s16 6 16 16v14c0 12-8 20-16 20s-16-8-16-20z"/><path class="a" d="M21 23h9v6h-9zm13 0h9v6h-9z"/><path d="M21 42h22M26 38v8M32 38v8M38 38v8"/>',
  crow: '<path d="M8 36c9-2 15-9 22-9 4-7 12-9 17-5h9l-7 4c2 11-6 19-17 21l-6 10-4-2 4-8c-7 0-13-4-18-11z"/><circle class="a" cx="42" cy="26" r="2.5"/><path d="M22 36c4 0 8-2 10-5"/>',
  pigmask: '<path d="M14 31c0-14 8-21 18-21s18 7 18 21-8 23-18 23-18-9-18-23z"/><path d="M17 18l-4-8 10 4M47 18l4-8-10 4"/><ellipse class="a" cx="32" cy="38" rx="8" ry="6"/><circle cx="29" cy="38" r="1.2"/><circle cx="35" cy="38" r="1.2"/><path d="M22 27h6M36 27h6"/>',
  figure: '<circle cx="32" cy="24" r="14"/><path d="M22 14l-4-8 8 4M42 14l4-8-8 4"/><path d="M24 38h16l4 14H20zM16 56h32"/><circle class="a" cx="27" cy="25" r="2.5"/><circle class="a" cx="37" cy="25" r="2.5"/>',

  // --- Coleccionables ---
  puzzlebox: '<path d="M32 8l22 12v24L32 56 10 44V20z"/><path d="M10 20l22 12 22-12M32 32v24"/><path class="a" d="M32 14l10 6-10 6-10-6z"/><path d="M16 30l9 5v9M48 30l-9 5v9"/>',
  totem: '<path d="M24 14a8 8 0 0 1 16 0c0 4-2 6-4 7v3h-8v-3c-2-1-4-3-4-7z"/><circle cx="29" cy="14" r="1.5"/><circle cx="35" cy="14" r="1.5"/><path d="M32 24v28M24 33h16M26 41h12M12 57c4-6 36-6 40 0z"/><path d="M17 46v8M47 46v8"/><path class="a" d="M17 37c-3 3-3 6 0 8 3-2 3-5 0-8zm30 0c-3 3-3 6 0 8 3-2 3-5 0-8z"/>',
  legionmask: '<path d="M16 26c0-12 8-20 16-20s16 8 16 20-6 26-16 26-16-14-16-26z"/><path d="M22 23l6 2M42 23l-6 2M24 37c4 6 12 6 16 0"/><path class="a" d="M21 28h3v9h-3zm19 0h3v12h-3z"/>',
  dice: '<path d="M32 6l22 13v26L32 58 10 45V19z"/><path class="a" d="M18 30h28L32 6z"/><path d="M18 30l-8 15M46 30l8 15M18 30l14 28 14-28"/>',
  axe: '<path d="M14 58L42 8"/><path class="a" d="M36 18l10-9c7 5 10 15 7 24l-13-4z"/>',
  hook: '<path d="M32 10v12"/><path class="a" d="M27 4h10v6H27z"/><path d="M32 22c-8 0-12 6-12 14s5 14 12 14 12-6 12-12M44 38l-6-5M14 58h36"/>',
  cards: '<rect x="10" y="14" width="26" height="38" rx="3" transform="rotate(-12 23 33)"/><rect class="a" x="28" y="12" width="26" height="38" rx="3" transform="rotate(10 41 31)"/><path d="M41 23l5 8-5 8-5-8z"/>',
  statue: '<circle cx="32" cy="14" r="6"/><path d="M26 22h12l6 24H20zM16 46h32v6H16z"/><path class="a" d="M14 52h36l2 6H12z"/>',

  // --- Posters & decoración ---
  poster: '<rect x="12" y="8" width="40" height="50" rx="1"/><circle cx="32" cy="8" r="2"/><path class="a" d="M16 48l10-14 8 8 6-6 8 12z"/><circle cx="40" cy="20" r="4"/>',
  uvposter: '<rect x="12" y="8" width="40" height="50" rx="1"/><path class="a" d="M35 14l-11 18h8l-4 18 12-22h-8z"/>',
  deskmat: '<rect x="4" y="20" width="56" height="28" rx="4"/><path d="M42 27c4 0 6 3 6 6v6c0 3-2 6-6 6s-6-3-6-6v-6c0-3 2-6 6-6zM42 27v7"/><path class="a" d="M10 26h20v16H10z"/>',
  frames: '<rect x="6" y="12" width="22" height="28"/><rect x="36" y="12" width="22" height="28"/><rect class="a" x="21" y="28" width="22" height="28"/>',
  campfire: '<path d="M12 56l40-8M12 48l40 8"/><path class="a" d="M32 8c8 10 12 16 12 24a12 12 0 0 1-24 0c0-6 4-10 6-14 2 4 4 6 6 6-2-6 0-12 0-16z"/>',
  plate: '<rect x="8" y="10" width="48" height="44" rx="2"/><path d="M32 17c-7 0-10 6-10 13s4 16 10 16 10-9 10-16-3-13-10-13z"/><path class="a" d="M26 27h4v3h-4zm8 0h4v3h-4z"/>',
  tapestry: '<path d="M10 10h44M14 10v38l6 4 6-4 6 4 6-4 6 4 6-4V10M20 52v6M32 52v6M44 52v6"/><path class="a" d="M21 20l10 10-10 10zm22 0L33 30l10 10z"/>',
  canvas: '<path d="M20 58l8-18M44 58l-8-18M32 40v18"/><rect x="12" y="10" width="40" height="30" rx="1"/><path class="a" d="M16 36l10-12 8 8 6-5 8 9z"/>',
  fog: '<path d="M8 24c6-4 12-4 18 0s12 4 18 0 10-3 12-2M8 36c6-4 12-4 18 0s12 4 18 0 10-3 12-2M8 48c6-4 12-4 18 0s12 4 18 0 10-3 12-2"/><circle class="a" cx="44" cy="14" r="5"/>'
};

const PRODUCT_ICON = {
  snk1: 'drop', snk2: 'lollipop', snk3: 'can', snk4: 'gear', snk5: 'medkit', snk6: 'sticks', snk7: 'chips', snk8: 'tin',
  rop1: 'hoodie', rop2: 'tshirt', rop3: 'cap', rop4: 'jacket', rop5: 'sock', rop6: 'jersey', rop7: 'sweater', rop8: 'pants',
  llv1: 'beartrap', llv2: 'hexpin', llv3: 'locker', llv4: 'bell', llv5: 'generator', llv6: 'knife', llv7: 'hatch', llv8: 'flashlight',
  pel1: 'bunnymask', pel2: 'generator', pel3: 'ghostmask', pel4: 'horse', pel5: 'trappermask', pel6: 'crow', pel7: 'pigmask', pel8: 'figure',
  col1: 'puzzlebox', col2: 'totem', col3: 'legionmask', col4: 'dice', col5: 'axe', col6: 'hook', col7: 'cards', col8: 'statue',
  pos1: 'poster', pos2: 'deskmat', pos3: 'frames', pos4: 'campfire', pos5: 'plate', pos6: 'uvposter', pos7: 'tapestry', pos8: 'canvas'
};

const CATEGORY_ICON = {
  all: 'fog', snacks: 'drop', ropa: 'tshirt', llaveros: 'beartrap',
  peluches: 'figure', coleccion: 'puzzlebox', posters: 'frames'
};

export const RARITY_COLORS = {
  uncommon: '#c9a440',
  rare: '#7fae5b',
  'very-rare': '#a07ad1',
  'ultra-rare': '#d4566d',
  iridescent: '#e8708f'
};

function svg(key, className = '') {
  const body = ICONS[key] || ICONS.fog;
  return `<svg class="art-svg ${className}" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

/** Icono SVG del producto (por id). */
export function productIcon(productId, className = '') {
  return svg(PRODUCT_ICON[productId], className);
}

/** Icono SVG de una categoría del catálogo. */
export function categoryIcon(categoryId, className = '') {
  return svg(CATEGORY_ICON[categoryId], className);
}

/** Estilo inline con el color de rareza como variable CSS (--rc). */
export function rarityStyle(rarity) {
  return `--rc:${RARITY_COLORS[rarity] || RARITY_COLORS.rare}`;
}
