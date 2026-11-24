/**
 * La Niebla Store - Catálogo Fan-Made (no oficial) inspirado en Dead by Daylight
 * Dead by Daylight Themed Merch & Marketing Store Catalog Data (50+ Items)
 */

export const MENU_CATEGORIES = [
  { id: 'all', name: 'Todo el Merch', icon: '🔥' },
  { id: 'snacks', name: 'Snacks & Dulces', icon: '🍿' },
  { id: 'ropa', name: 'Ropa & Streetwear', icon: '👕' },
  { id: 'llaveros', name: 'Llaveros & Pins', icon: '🔑' },
  { id: 'peluches', name: 'Peluches & Figuras', icon: '🧸' },
  { id: 'coleccion', name: 'Coleccionables & Réplicas', icon: '💎' },
  { id: 'posters', name: 'Posters & Decoración', icon: '🖼️' }
];

export const MENU_ITEMS = [
  // =========================================================================
  // --- SECCIÓN 1: SNACKS & BEBIDAS TEMÁTICAS ---
  // =========================================================================
  {
    id: 'snk1',
    category: 'snacks',
    featured: true,
    name: 'Gomitas Ácidas "Bloodpoints 100K"',
    subtitle: 'The Entity Treats - Paquete 250g',
    character: 'El Ente',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 12000,
    priceMoney: 89.00,
    imageFallback: '🩸',
    badge: 'Más Vendido',
    description: 'Deliciosas gomitas de grenetina artesanal en forma de gotas de sangre y tokens de Bloodpoints. Cubiertas con azúcar súper ácida sabor a cereza negra salvaje y frutos del bosque de Red Forest.',
    lore: '"Sabor tan adictivo que quemarás todas tus ofrendas solo para conseguir otra bolsa."',
    perks: [
      { name: 'Boost de Glucosa', desc: 'Explosión de sabor cereza ácida con centro líquido efervescente.' },
      { name: 'Libre de Culpa', desc: 'Sin conservadores artificiales, aptas para largas noches de juego.' }
    ],
    ingredients: ['Presentación bolsa resellable 250g', 'Sabor cereza negra y mora silvestre', 'Colorante vegetal natural', 'Gluten Free'],
    spiciness: 0,
    tags: ['Snack', 'Dulces', 'Gomitas', 'Bloodpoints']
  },
  {
    id: 'snk2',
    category: 'snacks',
    featured: false,
    name: 'Paletas de Caramelo Macizo "Tótem Maldito"',
    subtitle: 'Hex Totem Edition - Pack de 4',
    character: 'La Bruja (The Hag)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 15000,
    priceMoney: 119.00,
    imageFallback: '💀',
    badge: 'Glow-in-the-Dark',
    description: 'Pack de 4 paletas de caramelo artesanal esculpidas como calaveras sobre ramas de hueso. Tienen un palito fluorescente reutilizable que brilla con luz tenue simulando un tótem activo.',
    lore: '"Si la destruyes en tu boca, la maldición del dulce quedará sellada para siempre."',
    perks: [
      { name: 'Palito Neón', desc: 'El soporte se ilumina en la oscuridad al doblarlo.' },
      { name: 'Sabor Doble Capa', desc: 'Capa exterior de frambuesa azul y núcleo de mora azul picante.' }
    ],
    ingredients: ['Pack de 4 unidades individuales', 'Caramelo macizo isomalt premium', 'Palillos glow grado alimenticio', '160g totales'],
    spiciness: 1,
    tags: ['Snack', 'Paletas', 'Hex Totem', 'Glow']
  },
  {
    id: 'snk3',
    category: 'snacks',
    featured: true,
    name: 'Lata Coleccionable Energy Drink "Blight Serum 500ml"',
    subtitle: 'Talbot Grimes - Caffeinated Elixir',
    character: 'El Deterioro (The Blight)',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 18000,
    priceMoney: 95.00,
    imageFallback: '⚡',
    badge: 'Edición Limitada',
    description: 'Bebida energética carbonatada con 160mg de cafeína natural, taurina, extracto de flor de saúco, ginseng y jugo de naranja sanguina. La lata metálica tiene textura rugosa con relieve de suero fosforescente.',
    lore: '"Una dosis calculada para reaccionar a cada Skill Check sin pestañear durante la madrugada."',
    perks: [
      { name: 'Aceleración Pura', desc: '160mg de cafeína natural con complejo vitamínico B12.' },
      { name: 'Lata Embossed', desc: 'Lata de aluminio con textura 3D coleccionable.' }
    ],
    ingredients: ['Lata de 500ml', 'Cero azúcar añadida', 'Extracto de guaraná y saúco', 'Taurina & Ginseng'],
    spiciness: 0,
    tags: ['Bebida', 'Energy Drink', 'Coleccionable', 'Blight']
  },
  {
    id: 'snk4',
    category: 'snacks',
    featured: false,
    name: 'Galletas de Generador "Great Skill Check"',
    subtitle: 'MacMillan Machinery Cookies - Caja de 12',
    character: 'Dwight Fairfield',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 16000,
    priceMoney: 139.00,
    imageFallback: '⚙️',
    badge: 'Horneadas Artesanales',
    description: 'Caja metálica coleccionable en forma de generador con 12 galletas de mantequilla y chocolate belga grabadas con el dial de aguja del Skill Check de Dead by Daylight.',
    lore: '"Si logras comer una sin hacer ruido, reparaste el generador con éxito absoluto."',
    perks: [
      { name: 'Caja Metálica Reutilizable', desc: 'Diseño litografiado estilo motor de generador vintage.' },
      { name: 'Masa Mantequilla Real', desc: 'Elaboradas con mantequilla pura y chips de chocolate semiamargo.' }
    ],
    ingredients: ['12 galletas en empaque sellado', 'Lata metálica decorativa 18x12cm', 'Mantequilla pura y vainilla', 'Peso neto: 300g'],
    spiciness: 0,
    tags: ['Snack', 'Galletas', 'Skill Check', 'Caja Metálica']
  },
  {
    id: 'snk5',
    category: 'snacks',
    featured: true,
    name: 'Tabletas de Chocolate Suizo "First Aid Medkit"',
    subtitle: 'Emergency Chocolate Supply - 200g',
    character: 'Claudette Morel',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 19000,
    priceMoney: 149.00,
    imageFallback: '🍫',
    badge: 'Chocolate Premium',
    description: 'Chocolate con leche 55% cacao suizo con trocitos de arándanos deshidratados y almendras tostadas, empacado dentro de una réplica en miniatura del Botiquín de Primeros Auxilios de Superviviente.',
    lore: '"Cura 1 estado de fatiga y restaura el buen humor en cualquier lobby difícil."',
    perks: [
      { name: 'Autocuración', desc: '55% cacao puro suizo con frutos secos seleccionados.' },
      { name: 'Estuche Medkit', desc: 'Caja plástica rígida con broche abatible y cruz blanca.' }
    ],
    ingredients: ['Chocolate suizo 55% cacao', 'Almendras caramelizadas', 'Arándanos rojos', 'Estuche plástico coleccionable'],
    spiciness: 0,
    tags: ['Snack', 'Chocolate', 'Medkit', 'Regalo']
  },
  {
    id: 'snk6',
    category: 'snacks',
    featured: false,
    name: 'Palitos Pocky Crocantes "Cuchillas del Trampero"',
    subtitle: 'Biscuit Sticks con Doble Baño de Chocolate Fresa',
    character: 'El Trampero (The Trapper)',
    rarity: 'uncommon',
    rarityLabel: 'Poco Común',
    priceBP: 11000,
    priceMoney: 79.00,
    imageFallback: '🥢',
    badge: 'Crunch Crujiente',
    description: 'Crujientes varitas de galleta horneada bañadas en crema de chocolate amargo 60% y salpicadas con perlas ácidas de fresa carmesí que explotan en la boca.',
    lore: '"El crujido que delata tu posición en los pastizales altos de la finca."',
    perks: [
      { name: 'Crunch Explosivo', desc: 'Perlas efervescentes sabor frambuesa en la cobertura.' },
      { name: 'Empaque Dual', desc: '2 paquetes sellados individuales para conservar el crujido.' }
    ],
    ingredients: ['Harina de trigo enriquecida', 'Manteca de cacao pura', 'Extracto de fresa natural', 'Contenido: 140g'],
    spiciness: 0,
    tags: ['Snack', 'Pocky', 'Dulces', 'Trapper']
  },
  {
    id: 'snk7',
    category: 'snacks',
    featured: false,
    name: 'Totopos Ahumados "MacMillan Black Coal Chips"',
    subtitle: 'Blue Corn Chips con Habanero Ahumado y Carbón Activado',
    character: 'Finca MacMillan',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 13500,
    priceMoney: 85.00,
    imageFallback: '🍟',
    badge: 'Sabor Intenso',
    description: 'Totopos negros elaborados con maíz azul criollo nixtamalizado y una pizca de carbón activado vegetal. Sazonados con sal volcánica, pimentón de la Vera ahumado y un toque punzante de chile habanero.',
    lore: '"Extirpados directamente de los hornos de fundición de carbón MacMillan."',
    perks: [
      { name: 'Toque Ahumado Natural', desc: 'Madera de nogal y roble añejo en el proceso de deshidratado.' },
      { name: 'Extra Crujientes', desc: 'Grosor especial perfecto para dipear en guacamole o queso fundido.' }
    ],
    ingredients: ['Maíz azul criollo nixtamalizado', 'Carbón vegetal de grado alimentario', 'Chile habanero deshidratado', '200g'],
    spiciness: 3,
    tags: ['Snack', 'Totopos', 'Picante', 'Salado']
  },
  {
    id: 'snk8',
    category: 'snacks',
    featured: false,
    name: 'Pastillas de Menta Glacial "Aliento de la Enfermera"',
    subtitle: 'Sally Smithson - Latita Metálica Deslizante 50g',
    character: 'La Enfermera (The Nurse)',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 10000,
    priceMoney: 69.00,
    imageFallback: '🍬',
    badge: 'Menta Polar',
    description: 'Micro-pastillas comprimidas de menta piperita silvestre y eucalipto glacial. Presentadas en una clásica latita metálica vintage coleccionable con la mirada espectral de la Enfermera.',
    lore: '"Una bocanada de aire gélido que congela la garganta justo antes del parpadeo."',
    perks: [
      { name: 'Frescura Inmediata', desc: 'Menta piperita concentrada libre de azúcar.' },
      { name: 'Lata Pocket Reutilizable', desc: 'Tamaño de bolsillo ideal para dados, pastillas o tarjetas.' }
    ],
    ingredients: ['Menta piperita natural', 'Extracto de mentol y eucalipto', 'Sin azúcar (con xilitol)', 'Peso neto: 50g'],
    spiciness: 0,
    tags: ['Snack', 'Mentol', 'Nurse', 'Lata Vintage']
  },

  // =========================================================================
  // --- SECCIÓN 2: ROPA & STREETWEAR ---
  // =========================================================================
  {
    id: 'rop1',
    category: 'ropa',
    featured: true,
    name: 'Hoodie Oversized "Fog Whisperer" Premium',
    subtitle: 'Heavyweight Cotton 420 GSM - Charcoal Black',
    character: 'El Ente (The Entity)',
    rarity: 'iridescent',
    rarityLabel: 'Iridiscente',
    priceBP: 95000,
    priceMoney: 1149.00,
    imageFallback: '🧥',
    badge: 'Prenda Insignia',
    description: 'Sudadera pesada de 420g/m² en color negro carbón lavado al ácido. Bordado frontal de alta densidad con los cuatro tallies de sacrificios y estampado serigráfico en espalda con las garras del Ente envolviendo la niebla.',
    lore: '"Viste la protección de la niebla. Diseñado para abrigarte en las noches más gélidas de Ormond."',
    perks: [
      { name: 'Algodón French Terry 420 GSM', desc: 'Tejido pesado, ultra suave y con caída streetwear prémium.' },
      { name: 'Bordado + Serigrafía Discharge', desc: 'No se agrieta, no decolora tras lavadas continuas.' },
      { name: 'Bolsillo Oculto con Cierre', desc: 'Bolsillo secreto en manga para llaves o tarjetas.' }
    ],
    ingredients: ['100% Algodón peinado 420 GSM', 'Corte Oversized / Unisex', 'Tallas: S, M, L, XL, XXL', 'Cordones tubulares con herretes de metal grabado'],
    spiciness: 0,
    tags: ['Ropa', 'Hoodie', 'Streetwear', 'Edición Especial']
  },
  {
    id: 'rop2',
    category: 'ropa',
    featured: true,
    name: 'Playera Acid Wash "Never Stop Slashing - Legion"',
    subtitle: 'Frank, Julie, Susie & Joey Fan Art Tee',
    character: 'La Legión (The Legion)',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 48000,
    priceMoney: 489.00,
    imageFallback: '👕',
    badge: 'Drop Exclusivo',
    description: 'Playera de corte Boxy Fit en algodón lavado al ácido estilo vintage noventero. Gráfico estilo mixtape punk con las 4 máscaras de The Legion y tipografía desgastada en serigrafía tacto cero.',
    lore: '"Un grupo de cuatro adolescentes inseparables. Si uno ataca, los cuatro te siguen."',
    perks: [
      { name: 'Lavado Vintage Acid Wash', desc: 'Cada prenda tiene un patrón de desteñido único e irrepetible.' },
      { name: 'Cuello Acanalado Grueso', desc: 'Ribete de 2.5cm que no se deforma con el uso.' }
    ],
    ingredients: ['100% Algodón pre-encogido 220 GSM', 'Corte Boxy Streetwear', 'Tallas: XS a XXL', 'Etiqueta cosida DBD tejida en dobladillo'],
    spiciness: 0,
    tags: ['Ropa', 'Playera', 'The Legion', 'Vintage']
  },
  {
    id: 'rop3',
    category: 'ropa',
    featured: false,
    name: 'Gorra Dad Hat Bordada "Bloodpoint Emblem"',
    subtitle: 'Curved Brim - Broche Metálico Vintage',
    character: 'Supervivientes',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 35000,
    priceMoney: 349.00,
    imageFallback: '🧢',
    badge: 'Ajustable',
    description: 'Gorra desestructurada de sarga de algodón lavado en color burdeos profundo. Bordado 3D frontal del icono de Bloodpoints y bordado trasero con la frase clásica "Death Is Not An Escape".',
    lore: '"Lleva el símbolo de tus horas de supervivencia a donde quiera que vayas."',
    perks: [
      { name: 'Bordado 3D en Relieve', desc: 'Hilos resistentes al sol y decoloración con volumen táctil.' },
      { name: 'Ajuste Universal', desc: 'Hebilla de latón bruñido con tira de algodón oculta.' }
    ],
    ingredients: ['Sarga de algodón 100% transpirable', 'Visera curva con 6 costuras', 'Talla única ajustable (54-61cm)', 'Banda interior antitranspirante'],
    spiciness: 0,
    tags: ['Ropa', 'Gorra', 'Accesorios', 'Bordado']
  },
  {
    id: 'rop4',
    category: 'ropa',
    featured: true,
    name: 'Chamarra Bomber "Autohaven Wreckers Custom"',
    subtitle: 'Satin Shell & Quilted Lining - Gas Station Style',
    character: 'El Espectro (The Wraith)',
    rarity: 'iridescent',
    rarityLabel: 'Iridiscente',
    priceBP: 120000,
    priceMoney: 1599.00,
    imageFallback: '🧥',
    badge: 'Colección Limitada (300 pzas)',
    description: 'Chamarra bomber de satén satinado color verde bosque militar con parches bordados estilo taller mecánico de Azarov. Forro interior acolchado naranja neón con el mapa impreso de Autohaven Wreckers.',
    lore: '"El sonido metálico del desguace ahora transformado en una pieza de alta moda urbana."',
    perks: [
      { name: 'Forro Térmico Acolchado', desc: 'Mantén el calor incluso en las nieblas más frías.' },
      { name: 'Parches Auténticos', desc: '5 parches bordados termo-fijados de bujías, grúas y la campana.' }
    ],
    ingredients: ['Exterior: 100% Satén de Nylon repelente al agua', 'Interior: Relleno poliéster romboidal', 'Cierre metálico bidireccional YKK', 'Tallas: M, L, XL'],
    spiciness: 0,
    tags: ['Ropa', 'Chamarra', 'Bomber', 'Autohaven']
  },
  {
    id: 'rop5',
    category: 'ropa',
    featured: false,
    name: 'Pack de Calcetines "Meta Perk Survivor Pack"',
    subtitle: '3 Pares: Sprint Burst, Dead Hard & Adrenaline',
    character: 'Meg Thomas & David King',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 22000,
    priceMoney: 229.00,
    imageFallback: '🧦',
    badge: 'Set de 3 Pares',
    description: 'Pack de 3 pares de calcetines tubulares deportivos de compresión media. Tejidos en jacquard con los iconos en alta resolución de las ventajas más icónicas de supervivientes: Sprint Burst, Dead Hard y Adrenalina.',
    lore: '"Tus pies listos para correr a toda velocidad hacia la puerta de salida."',
    perks: [
      { name: 'Arco Plantar Acolchado', desc: 'Soporte adicional en talón y metatarso para comodidad 24/7.' },
      { name: 'Tejido Jacquard Durable', desc: 'Los iconos no se desgastan porque forman parte del hilo tejido.' }
    ],
    ingredients: ['80% Algodón peinado, 17% Poliéster, 3% Elastano', 'Talla universal para calzado 24 al 29.5 MX', '3 pares empaquetados en caja temática'],
    spiciness: 0,
    tags: ['Ropa', 'Calcetines', 'Perks', 'Pack']
  },
  {
    id: 'rop6',
    category: 'ropa',
    featured: false,
    name: 'Jersey Pro Gamer "Feng Min Laser Esports"',
    subtitle: 'Dri-FIT Breathable Mesh - Edición Torneo',
    character: 'Feng Min',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 52000,
    priceMoney: 549.00,
    imageFallback: '🎮',
    badge: 'Pro Gamer',
    description: 'Jersey técnico de competición deportiva fabricado en malla micro-perforada transpirable. Diseño en degradado glitch cian, púrpura y negro azabache con los logos de patrocinador simulados de Lazer Bear y el parche de Feng Min en el hombro.',
    lore: '"Una leyenda de los cibercafés que no pierde la compostura ni frente a la muerte."',
    perks: [
      { name: 'Tecnología Dry-Vent', desc: 'Evacua el sudor en partidas intensas sin retener olores.' },
      { name: 'Sublimación Digital HD', desc: 'Colores vibrantes que no pierden saturación jamás.' }
    ],
    ingredients: ['100% Poliéster microfibra 160 GSM', 'Corte atlético ergonómico', 'Cuello en V reforzado', 'Tallas: S a XL'],
    spiciness: 0,
    tags: ['Ropa', 'Jersey', 'Feng Min', 'Esports']
  },
  {
    id: 'rop7',
    category: 'ropa',
    featured: false,
    name: 'Sudadera Crewneck "The Trickster All-Kill Neon"',
    subtitle: 'K-Pop Horror Graphic - Violeta Neón',
    character: 'El Tramposo (The Trickster)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 68000,
    priceMoney: 789.00,
    imageFallback: '🎤',
    badge: 'K-Pop Neon',
    description: 'Sudadera de cuello redondo en felpa perchada de 360g. Impresión frontal con tipografía en hangul coreano en tinta violeta reactiva y el rostro psicótico de Ji-Woon Hak entre cuchillos voladores y luces estroboscópicas.',
    lore: '"Cada compás es un alarido de emoción y dolor mezclados en perfecta armonía."',
    perks: [
      { name: 'Tintas Neón UV Reactivas', desc: 'El estampado resplandece bajo luces de fiesta o discoteca.' },
      { name: 'Puños Acanalados Elásticos', desc: 'Ajuste cómodo en muñecas y cintura que no se afloja.' }
    ],
    ingredients: ['85% Algodón, 15% Poliéster perchado suave', 'Corte regular contemporáneo', 'Tallas: S, M, L, XL', 'Color: Deep Violet'],
    spiciness: 0,
    tags: ['Ropa', 'Crewneck', 'Trickster', 'Neón']
  },
  {
    id: 'rop8',
    category: 'ropa',
    featured: false,
    name: 'Pantalón Jogger Táctico "Dwight\'s Locker Runner"',
    subtitle: 'Heavy Cargo Twill con Cintas Militares Desmontables',
    character: 'Dwight Fairfield',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 59000,
    priceMoney: 699.00,
    imageFallback: '👖',
    badge: 'Cargo Táctico',
    description: 'Pantalón jogger confeccionado en sarga de algodón elástica color verde oliva militar. Cuenta con 6 bolsillos funcionales con solapa, cintas tácticas colgantes removibles con mosquetones plásticos y tobillo elástico.',
    lore: '"Bolsillos suficientes para llevar ganzúas, llaves esqueléticas y provisiones de emergencia."',
    perks: [
      { name: '6 Bolsillos Utilitarios', desc: '2 laterales, 2 traseros y 2 cargo amplios con broches a presión.' },
      { name: 'Elasticidad 4-Way Stretch', desc: 'Libertad absoluta de movimiento para saltar ventanas y agacharse.' }
    ],
    ingredients: ['97% Algodón, 3% Spandex sarga 280 GSM', 'Cintura elástica con cordón trenzado', 'Cintas tácticas con velcro', 'Tallas: 30, 32, 34, 36'],
    spiciness: 0,
    tags: ['Ropa', 'Pantalón', 'Cargo', 'Dwight']
  },

  // =========================================================================
  // --- SECCIÓN 3: LLAVEROS & PINS ESMALTADOS ---
  // =========================================================================
  {
    id: 'llv1',
    category: 'llaveros',
    featured: true,
    name: 'Llavero Metálico 3D "Cepo de Oso del Trampero"',
    subtitle: 'Zinc Alloy - Mecanismo con Muelle Real',
    character: 'El Trampero (The Trapper)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 21000,
    priceMoney: 189.00,
    imageFallback: '⚙️',
    badge: 'Funcional con Resorte',
    description: 'Llavero fundido en aleación de zinc de alta densidad con acabado en bronce envejecido y manchas de óxido simuladas a mano. ¡Las mandíbulas del cepo tienen un muelle real que se abre y cierra al presionar!',
    lore: '"Cuidado al buscar las llaves en tus bolsillos... las trampas de Evan nunca perdonan."',
    perks: [
      { name: 'Muelle Articulado Real', desc: 'Abre y cierra las dos mandíbulas dentadas con clic táctil.' },
      { name: 'Acabado Óxido Industrial', desc: 'Pátina electrodepositada que no se despinta ni oxida.' }
    ],
    ingredients: ['Aleación de zinc macizo 85g', 'Cadena de eslabón plano reforzada', 'Mosquetón tipo gatillo 360°', 'Medida: 5.5cm diámetro'],
    spiciness: 0,
    tags: ['Llaveros', 'Metal', 'Trapper', 'Articulado']
  },
  {
    id: 'llv2',
    category: 'llaveros',
    featured: true,
    name: 'Set de 4 Pins Esmaltados "Hex Perks Gold Edition"',
    subtitle: 'Ruin, Devour Hope, NOED & Blood Warden',
    character: 'Asesinos Legendarios',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 36000,
    priceMoney: 329.00,
    imageFallback: '📌',
    badge: 'Hard Enamel & Oro',
    description: 'Set de 4 pines de esmalte duro pulido (hard enamel) con chapado en oro de 18k y relieves nítidos. Incluye las 4 ventajas de maleficio más temidas: Hex: Ruin, Hex: Devour Hope, NOED y Blood Warden.',
    lore: '"Cuatro tótems que harán temblar a cualquier superviviente que ose mirar tu mochila."',
    perks: [
      { name: 'Esmalte Duro Tipo Joyería', desc: 'Superficie completamente lisa, pulida y resistente a rayones.' },
      { name: 'Doble Broche de Goma', desc: 'Dos pines traseros con tope de goma para que no giren ni se caigan.' }
    ],
    ingredients: ['4 pines de 3.8cm cada uno', 'Metal con baño dorado 18k', 'Presentación en tarjeta ilustrada con arte de la Fogata', 'Broches de caucho de seguridad'],
    spiciness: 0,
    tags: ['Llaveros', 'Pins', 'Esmalte', 'Hex Perks', 'Colección']
  },
  {
    id: 'llv3',
    category: 'llaveros',
    featured: false,
    name: 'Llavero Shaker Acrílico "Dwight en el Casillero"',
    subtitle: 'Double Acrylic with Moving Mini Charms',
    character: 'Dwight Fairfield',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 19000,
    priceMoney: 169.00,
    imageFallback: '🚪',
    badge: 'Piezas Móviles',
    description: 'Llavero shaker de doble capa de acrílico transparente de 4mm. El casillero tiene ventanillas transparentes donde Dwight tiembla junto a mini Bloodpoints sueltos que se mueven al agitar el llavero.',
    lore: '"No saldrá hasta que escuche el motor del quinto generador encendido."',
    perks: [
      { name: 'Shaker Interactivo', desc: 'Mini piezas sueltas en su interior que rebotan libremente.' },
      { name: 'Impresión Doble Faz con Epoxy', desc: 'Capa abovedada de resina epoxy con efecto brillante y anti-rayas.' }
    ],
    ingredients: ['Acrílico óptico 4mm de grosor', 'Herraje estrella en oro satinado', 'Dimensiones: 7cm x 4.5cm', 'Película protectora removible'],
    spiciness: 0,
    tags: ['Llaveros', 'Acrílico', 'Dwight', 'Interactivo']
  },
  {
    id: 'llv4',
    category: 'llaveros',
    featured: false,
    name: 'Llavero Réplica "Campana del Lamento (Wailing Bell)"',
    subtitle: 'Bronze Mini Bell con Tañido Real',
    character: 'El Espectro (The Wraith)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 24000,
    priceMoney: 199.00,
    imageFallback: '🔔',
    badge: 'Suena de Verdad',
    description: 'Miniatura de fundición en bronce con mango envuelto en cordón sintético negro. Incluye badajo interior calibrado para emitir un suave y misterioso repique metálico idéntico al sonido del juego.',
    lore: '"Bing... Bong... Ya está detrás de ti y no lo viste venir."',
    perks: [
      { name: 'Sonido Acústico Real', desc: 'Mini badajo metálico con tono resonante nítido.' },
      { name: 'Mango Grabado con Runas', desc: 'Detalles minuciosos del cráneo y vértebras del Wraith.' }
    ],
    ingredients: ['Bronce fundido envejecido 70g', 'Cordón encerado negro', 'Anillo de acero inoxidable plano', 'Largo total: 7cm'],
    spiciness: 0,
    tags: ['Llaveros', 'Wraith', 'Campana', 'Sonoro']
  },
  {
    id: 'llv5',
    category: 'llaveros',
    featured: false,
    name: 'Pin Esmaltado Gigante "Glow Generator 99%"',
    subtitle: 'Limited Edition 6cm - Fosforescente',
    character: 'Generadores del Reino',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 28000,
    priceMoney: 239.00,
    imageFallback: '💡',
    badge: 'Brilla en Oscuridad',
    description: 'Pin de gran formato (6cm de ancho) representando el motor del generador con cuatro pistones y las bombillas superiores rellenas de esmalte fosforescente que absorben luz y brillan intensamente de noche.',
    lore: '"Déjalo al noventa y nueve por ciento... el momento del escape está cerca."',
    perks: [
      { name: 'Luces Glow-in-the-Dark', desc: 'Las 4 bombillas y el indicador cargan con cualquier fuente de luz.' },
      { name: 'Tres Puntos de Anclaje', desc: 'Fijación ultra segura ideal para mochilas, chamarras o estuches.' }
    ],
    ingredients: ['Esmalte duro con pigmento fosforescente', 'Base metal gunmetal negro pulido', 'Ancho: 6.0 cm x Alto: 4.5 cm', 'Numerado en el reverso'],
    spiciness: 0,
    tags: ['Llaveros', 'Pins', 'Generador', 'Glow']
  },
  {
    id: 'llv6',
    category: 'llaveros',
    featured: false,
    name: 'Llavero de Metal "Cuchillo de Cocina de Michael Myers"',
    subtitle: 'The Shape Weapon - Acero con Esmalte Rojo Sangre',
    character: 'La Forma (Michael Myers)',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 19500,
    priceMoney: 179.00,
    imageFallback: '🔪',
    badge: 'Metal Pulido',
    description: 'Llavero en acero inoxidable cromado a espejo representando el icónico cuchillo de cocina de 1978. La punta tiene una gota de resina carmesí translúcida en 3D que parece sangre fresca.',
    lore: '"El silencio de Haddonfield concentrado en un filo imperturbable."',
    perks: [
      { name: 'Acero Inoxidable Quirúrgico', desc: 'No se deforma, no se despinta y resiste golpes continuos.' },
      { name: 'Borde Romo Seguro', desc: 'Sin filo real, apto para llevar con tus llaves del día a día.' }
    ],
    ingredients: ['Acero inoxidable 316L pulido a espejo', 'Resina epóxica translúcida roja', 'Largo del cuchillo: 8.5cm', 'Mosquetón circular'],
    spiciness: 0,
    tags: ['Llaveros', 'Myers', 'Metal', 'Cuchillo']
  },
  {
    id: 'llv7',
    category: 'llaveros',
    featured: false,
    name: 'Pin Mecánico Giratorio "La Trampilla Secreta (Hatch)"',
    subtitle: 'Pin Articulado con Bisagra - Abre y Cierra',
    character: 'Supervivientes',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 29000,
    priceMoney: 249.00,
    imageFallback: '🕳️',
    badge: 'Trampilla con Bisagra',
    description: 'Pin artesanal único con bisagra en miniatura. Puedes abrir la tapa superior de madera de la trampilla para revelar el interior oscuro con la corriente de viento negro y una llave esquelética tallada.',
    lore: '"El sonido del viento siseante que significa la última oportunidad de salvación."',
    perks: [
      { name: 'Bisagra Metálica Funcional', desc: 'Ábrelo y ciérralo cuantas veces quieras con clic suave.' },
      { name: 'Interior Esmaltado Negro Glitter', desc: 'Partículas de glitter oscuro que imitan la bruma abisal.' }
    ],
    ingredients: ['Fundición en aleación de cobre y níquel', 'Bisagra con eje de acero templado', 'Diámetro: 4.2cm', 'Cierre doble de mariposa'],
    spiciness: 0,
    tags: ['Llaveros', 'Pins', 'Hatch', 'Trampilla', 'Mecánico']
  },
  {
    id: 'llv8',
    category: 'llaveros',
    featured: false,
    name: 'Llavero Linterna Flashlight LED "Luz Cegadora"',
    subtitle: 'Linterna LED de Aluminio Morado con Haz Concentrado',
    character: 'Supervivientes',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 26000,
    priceMoney: 219.00,
    imageFallback: '🔦',
    badge: 'Luz LED Funcional',
    description: 'Réplica a escala en miniatura de la linterna morada de superviviente. Cuenta con una bombilla LED de alta intensidad blanca y botón trasero táctil para iluminar cerraduras o cegar a tus amigos en broma.',
    lore: '"Apunta a los ojos justo cuando levante al superviviente del suelo."',
    perks: [
      { name: 'LED Blanco 80 Lúmenes', desc: 'Potencia real capaz de iluminar caminos oscuros hasta a 10 metros.' },
      { name: 'Baterías Reemplazables', desc: 'Funciona con 3 pilas de botón LR44 incluidas y fáciles de cambiar.' }
    ],
    ingredients: ['Cuerpo de aluminio anodizado color púrpura iridiscente', 'Lente de cristal mineral con aumento', 'Largo: 6.8cm', 'Anillo de acero plano'],
    spiciness: 0,
    tags: ['Llaveros', 'Linterna', 'LED', 'Funcional']
  },

  // =========================================================================
  // --- SECCIÓN 4: PELUCHES & FIGURAS ---
  // =========================================================================
  {
    id: 'pel1',
    category: 'peluches',
    featured: true,
    name: 'Peluche Chibi Fan-Made "Anna The Huntress 28cm"',
    subtitle: 'Con Hacha de Felpa Removible & Máscara de Liebre',
    character: 'La Cazadora (The Huntress)',
    rarity: 'iridescent',
    rarityLabel: 'Iridiscente',
    priceBP: 78000,
    priceMoney: 699.00,
    imageFallback: '🐰',
    badge: 'Favorito de la Comunidad',
    description: 'Tierno peluche de alta gama de 28cm de altura. Anna lleva su máscara de liebre con detalles bordados a mano, vendas acolchadas en los brazos y viene con su hacha de felpa que se fija a su mano mediante imanes ocultos.',
    lore: '"Puede que tararee una nana aterradora, pero es el peluche más abrazable de toda la niebla."',
    perks: [
      { name: 'Hacha Magnética Removible', desc: 'El hacha de juguete se adhiere y desprende de su palma con imán de neodimio.' },
      { name: 'Relleno de Microfibra Memory', desc: 'Tacto extra esponjoso que recupera su forma instantáneamente.' },
      { name: 'Ojos y Detalles 100% Bordados', desc: 'Sin piezas plásticas duras, seguro y suave.' }
    ],
    ingredients: ['Tela Minky ultrasuave hipoalergénica', 'Relleno algodón PP virgen', 'Altura: 28cm sentado', 'Etiqueta holográfica de autenticidad'],
    spiciness: 0,
    tags: ['Peluches', 'Huntress', 'Chibi', 'Coleccionable', 'Imanes']
  },
  {
    id: 'pel2',
    category: 'peluches',
    featured: true,
    name: 'Peluche Generador Interactivo con Luz & Sonido',
    subtitle: 'Presiona el Botón para Encender Pistones y Motor',
    character: 'Mecánicas de Dead by Daylight',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 85000,
    priceMoney: 799.00,
    imageFallback: '⚡',
    badge: 'Luz LED & Sonido',
    description: 'Peluche cúbico de 22cm con forma del generador. Al oprimir el botón superior, los pistones vibran suavemente, las 4 luces LED superiores parpadean y se encienden en secuencia reproduciendo el sonido clásico de generador reparado.',
    lore: '"¡Gen pop! Por fin una reparación que no te costará ningún gancho."',
    perks: [
      { name: 'Módulo de Audio Temático', desc: 'Efecto de sonido de arranque y bombillas encendidas.' },
      { name: 'LEDs Amarillos Cálidos', desc: 'Funciona como lámpara quitamiedos nocturna durante 15 minutos.' }
    ],
    ingredients: ['Dimensiones: 22 x 20 x 20 cm', 'Funciona con 3 pilas AAA (incluidas)', 'Compartimento con velcro de seguridad', 'Tejido Minky anti-pilling'],
    spiciness: 0,
    tags: ['Peluches', 'Generador', 'Interactivo', 'Luces']
  },
  {
    id: 'pel3',
    category: 'peluches',
    featured: false,
    name: 'Peluche Chibi "Ghostface Stalker con Cámara"',
    subtitle: 'Túnica de Tela Negra Fluida & Cuchillo Soft',
    character: 'Ghostface (Danny Johnson)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 65000,
    priceMoney: 599.00,
    imageFallback: '👻',
    badge: 'Fan Favorite',
    description: 'Peluche de 25cm de Ghostface con su icónica máscara blanca, túnica negra con tiras flotantes, mini cámara fotográfica vintage bordada al cuello y mirada pícara en formato Chibi adorable.',
    lore: '"Te está observando desde la esquina del librero... esperando el ángulo perfecto."',
    perks: [
      { name: 'Capucha y Cintas Móviles', desc: 'Túnica confeccionada en tela real que puedes acomodar a tu gusto.' },
      { name: 'Base Lastrada con Pellets', desc: 'Se mantiene sentado por sí solo en tu escritorio o repisa.' }
    ],
    ingredients: ['Poliéster suave y felpa de pelo corto', 'Base rellena de pellets de polietileno para equilibrio', 'Altura: 25cm', 'Costuras reforzadas'],
    spiciness: 0,
    tags: ['Peluches', 'Ghostface', 'Chibi', 'Decoración']
  },
  {
    id: 'pel4',
    category: 'peluches',
    featured: false,
    name: 'Mini Peluche Llavero "Maurice el Caballo de Tres Ojos"',
    subtitle: 'The Clown\'s Steed - Clip Metálico de Mochila 14cm',
    character: 'El Payaso (The Clown)',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 32000,
    priceMoney: 279.00,
    imageFallback: '🐴',
    badge: 'Cult Classic',
    description: 'El entrañable caballo de tres ojos del Reino de Campbell\'s Chapel ahora en mini peluche para mochila. Tiene sus tres ojos bordados, crin despeinada color lavanda y un clip metálico giratorio.',
    lore: '"El habitante más noble de la niebla te cuidará el camino a donde vayas."',
    perks: [
      { name: 'Tres Ojos Bordados', desc: 'Detalles bordados con hilo satinado brillante.' },
      { name: 'Mosquetón Robusto', desc: 'Fácil de enganchar en mochilas, bolsos o cinturones.' }
    ],
    ingredients: ['14cm de altura x 10cm de largo', 'Clip de aluminio anodizado negro mate', 'Lavable a mano'],
    spiciness: 0,
    tags: ['Peluches', 'Maurice', 'Llavero', 'Clown']
  },
  {
    id: 'pel5',
    category: 'peluches',
    featured: true,
    name: 'Figura de Vinilo Estilizada "The Trapper 15cm"',
    subtitle: 'Collector Edition con Base de Madera MacMillan',
    character: 'El Trampero (The Trapper)',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 72000,
    priceMoney: 649.00,
    imageFallback: '👹',
    badge: 'Edición para Coleccionistas',
    description: 'Figura de colección en vinilo premium de 15cm pintada a mano con increíble detalle en las cicatrices de la espalda, máscara de calavera agrietada, gancho de carnicero y base con textura de tablones ensangrentados.',
    lore: '"El primer asesino del Ente, listo para dominar el centro de tu setup gamer."',
    perks: [
      { name: 'Pintura a Mano con Sombras', desc: 'Lavado de tinta y aerografía en piel y metales oxidados.' },
      { name: 'Caja con Ventana y Fondo Panorámico', desc: 'Empaque de coleccionista con ventana holográfica.' }
    ],
    ingredients: ['Vinilo PVC rígido de alta densidad', 'Base circular antideslizante con logo DBD', 'Altura total: 15.5cm', 'Peso: 320g'],
    spiciness: 0,
    tags: ['Figuras', 'Trapper', 'Colección', 'Vinilo']
  },
  {
    id: 'pel6',
    category: 'peluches',
    featured: false,
    name: 'Peluche Sonoro "Cuervo del Ente (Spies from the Shadows)"',
    subtitle: 'Cuervo de Felpa Negra 22cm con Sonido de Graznido',
    character: 'El Ente (The Entity)',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 38000,
    priceMoney: 349.00,
    imageFallback: '🦅',
    badge: 'Graznido al Oprimir',
    description: 'Peluche de cuervo negro con plumaje sintético ultra suave y ojos rojos bordados. Al apretarle suavemente el pecho, emite el graznido estridente que alerta a los asesinos de tu posición en el mapa.',
    lore: '"No pases corriendo cerca de ellos si no llevas calma espiritual."',
    perks: [
      { name: 'Chip de Sonido Integrado', desc: 'Reproduce un graznido grave inspirado en los cuervos de la Niebla.' },
      { name: 'Patitas Posables con Alambre', desc: 'Puedes posarlo posado sobre tu monitor, estante o repisa.' }
    ],
    ingredients: ['Felpa negra aterciopelada', 'Estructura interior maleable en patas', 'Altura: 22cm', 'Batería interna de larga duración'],
    spiciness: 0,
    tags: ['Peluches', 'Cuervo', 'Sonido', 'Ente']
  },
  {
    id: 'pel7',
    category: 'peluches',
    featured: false,
    name: 'Peluche Chibi "Amanda Young - The Pig"',
    subtitle: 'Con Capucha Removible de Cerdo & Trampa de Oso Reversa',
    character: 'La Cerda (The Pig / SAW)',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 74000,
    priceMoney: 679.00,
    imageFallback: '🐷',
    badge: 'Capucha Removible',
    description: 'Peluche chibi de 26cm de Amanda vistiendo su gabardina roja de cuero sintético. La máscara de cabeza de cerdo se puede retirar hacia atrás para ver el rostro bordado de Amanda con lágrimas de rímel.',
    lore: '"Que comience el juego. Tienes tiempo límite para quitarte la trampa."',
    perks: [
      { name: 'Capucha con Doble Posición', desc: 'Puedes exhibirla con la máscara puesta o descubierta.' },
      { name: 'Detalles Bordados', desc: 'Espiral roja bordada en la solapa de su abrigo.' }
    ],
    ingredients: ['Poliéster suave, cuerina sintética roja', 'Relleno de fibra hueca siliconada', 'Altura: 26cm', 'Cuchilla retráctil de felpa oculta en la manga'],
    spiciness: 0,
    tags: ['Peluches', 'The Pig', 'SAW', 'Chibi']
  },
  {
    id: 'pel8',
    category: 'peluches',
    featured: false,
    name: 'Figura Chibi Articulada "Feng Min Bunny Hoodie"',
    subtitle: 'Figura Articulada Fan-Made - Múltiples Accesorios',
    character: 'Feng Min',
    rarity: 'iridescent',
    rarityLabel: 'Iridiscente',
    priceBP: 115000,
    priceMoney: 1399.00,
    imageFallback: '🐰',
    badge: 'Importación Japonesa',
    description: 'Figura de colección fan-made de 10cm articulada con acabados de lujo. Incluye su icónica sudadera verde de orejas de conejo, 3 placas faciales intercambiables (sonriente, concentrada en generador y en pánico), linterna morada y caja de herramientas.',
    lore: '"La superviviente favorita de la comunidad ahora en la línea de figuras más prestigiosa del mundo."',
    perks: [
      { name: 'Articulación Total', desc: 'Poses infinitas para recrear persecuciones y reparaciones.' },
      { name: 'Accesorios Compatibles', desc: 'Manos intercambiables para sujetar linterna o medkit.' }
    ],
    ingredients: ['Plástico ABS y PVC no tóxico', 'Altura: 100mm aprox.', 'Soporte transparente articulado y base con logotipo DBD', 'Caja de colección con ventana japonesa'],
    spiciness: 0,
    tags: ['Figuras', 'Chibi', 'Feng Min', 'Colección']
  },

  // =========================================================================
  // --- SECCIÓN 5: COLECCIONABLES & RÉPLICAS ---
  // =========================================================================
  {
    id: 'col1',
    category: 'coleccion',
    featured: true,
    name: 'Réplica 1:1 Funcional "Caja de Lamentaciones (Lament Configuration)"',
    subtitle: 'The Cenobite (Pinhead) - Acero Pulido y Resina Metálica',
    character: 'El Cenobita (Pinhead)',
    rarity: 'iridescent',
    rarityLabel: 'Iridiscente',
    priceBP: 160000,
    priceMoney: 1899.00,
    imageFallback: '📦',
    badge: 'Pieza Maestra 1:1',
    description: 'Réplica exacta a escala 1:1 de la Configuración del Lamento de Hellraiser x DBD. Fabricada en resina metálica maciza pesada con láminas de latón grabadas al aguafuerte con los intrincados patrones originales. Incluye soporte de exhibición con garras del Ente.',
    lore: '"La abriste. Vinimos. Ahora el tesoro más codiciado de la niebla descansa en tus manos."',
    perks: [
      { name: 'Peso Real de 680g', desc: 'Sensación metálica fría y sólida idéntica a la del juego.' },
      { name: 'Grabados en Latón Real', desc: 'Patrones geométricos en bajo y alto relieve pulidos en dorado antiguo.' },
      { name: 'Base Expositora Incluida', desc: 'Soporte esculpido simulando las garras del Ente elevando el cubo.' }
    ],
    ingredients: ['Dimensiones: 7.6 x 7.6 x 7.6 cm (Escala 1:1 exacta)', 'Latón y resina de polímero metálico', 'Peso: 680g', 'Caja de lujo con cierre magnético y certificado numerado'],
    spiciness: 0,
    tags: ['Colección', 'Pinhead', 'Cenobita', 'Réplica 1:1', 'De Lujo']
  },
  {
    id: 'col2',
    category: 'coleccion',
    featured: true,
    name: 'Lámpara LED Ambiental "Tótem Maldito con Fuego Carmesí"',
    subtitle: 'Touch Sensitive - Modo Fogata & Modo Pulso de Alerta',
    character: 'Mecánicas del Reino',
    rarity: 'iridescent',
    rarityLabel: 'Iridiscente',
    priceBP: 110000,
    priceMoney: 1299.00,
    imageFallback: '🕯️',
    badge: 'Iluminación Inteligente',
    description: 'Lámpara de resina esculpida como tres cráneos apoyados en ramas entrelazadas. Al encenderla, las cuencas oculares y las grietas emiten una luz titilante que imita el fuego vivo de la fogata o el resplandor carmesí de un maleficio activo.',
    lore: '"Una luz en la oscuridad que todo superviviente busca limpiar de inmediato."',
    perks: [
      { name: '3 Modos de Iluminación', desc: 'Luz ámbar cálida, fuego titilante dinámico y pulso rojo maleficio.' },
      { name: 'Sensor Táctil Oculto', desc: 'Toca el cráneo superior para cambiar entre modos o regular intensidad.' },
      { name: 'Batería Recargable USB-C', desc: 'Hasta 18 horas continuas de luz con una sola carga.' }
    ],
    ingredients: ['Resina de uretano curada al vacío', 'Batería de litio 2600 mAh recargable', 'Cable USB-C trenzado de 1.5m incluido', 'Dimensiones: 20cm alto x 14cm ancho'],
    spiciness: 0,
    tags: ['Colección', 'Lámpara', 'Tótem', 'LED', 'Setup']
  },
  {
    id: 'col3',
    category: 'coleccion',
    featured: true,
    name: 'Máscara Réplica Cosplay "The Legion - Susie Mask"',
    subtitle: 'Resina Reforzada con Fibra de Vidrio & Broches Ajustables',
    character: 'La Legión (Susie)',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 95000,
    priceMoney: 1199.00,
    imageFallback: '🎭',
    badge: 'Cosplay Ready',
    description: 'Máscara a tamaño real para uso y exhibición. Moldeada con la sonrisa cosida y las manchas características de Susie. Cuenta con esponjas interiores ergonómicas, malla transpirable oculta en la boca y correas de cuero sintético con hebillas metálicas.',
    lore: '"Ponte la máscara y siente el impulso incontrolable del Frenesí Salvaje."',
    perks: [
      { name: 'Acolchado Ergonómico Interior', desc: 'Uso cómodo durante horas de convención o stream sin lastimar el rostro.' },
      { name: 'Visibilidad Óptima', desc: 'Orificios de ventilación y visibilidad clara a través del diseño estilizado.' }
    ],
    ingredients: ['Resina epóxica reforzada de 3mm', 'Pintura acrílica sellada con barniz mate UV', 'Correas de cuero sintético con elástico regulable', 'Apta para cabezas de 54 a 62cm'],
    spiciness: 0,
    tags: ['Colección', 'Máscara', 'Cosplay', 'Susie', 'Legion']
  },
  {
    id: 'col4',
    category: 'coleccion',
    featured: false,
    name: 'Set de Dados RPG Temáticos "Bloodpoint & Fog Dice Set"',
    subtitle: '7 Dados Poliedricos con Núcleo Líquido Flotante',
    character: 'El Ente (The Entity)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 42000,
    priceMoney: 399.00,
    imageFallback: '🎲',
    badge: 'Liquid Core',
    description: 'Set completo de 7 dados poliméricos para juegos de rol (D4, D6, D8, D10, D%, D12, D20). Cada dado tiene una esfera interior con líquido translúcido carmesí y glitter que se arremolina como la niebla al rodar.',
    lore: '"Que el Ente bendiga cada tirada de salvación cuando el asesino se aproxime."',
    perks: [
      { name: 'Núcleo Líquido Móvil', desc: 'Glitter de sangre que danza dentro del dado con cada lanzamiento.' },
      { name: 'Bordes Afilados Tipo Joya (Sharp Edge)', desc: 'Lados facetados de precisión para lanzamientos perfectamente aleatorios.' }
    ],
    ingredients: ['7 dados poliedricos estándar', 'Resina de alta transparencia', 'Números grabados en tinta dorada metálica', 'Incluye caja de hojalata acolchada con espuma'],
    spiciness: 0,
    tags: ['Colección', 'Dados', 'RPG', 'Liquid Core']
  },
  {
    id: 'col5',
    category: 'coleccion',
    featured: false,
    name: 'Réplica de Hacha de Caza "Huntress Handaxe 40cm"',
    subtitle: 'Mango de Madera Quemada & Hoja de Resina Envejecida',
    character: 'La Cazadora (The Huntress)',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 98000,
    priceMoney: 1149.00,
    imageFallback: '🪓',
    badge: 'Exhibición de Pared',
    description: 'Impresionante réplica de colección de 40cm. Mango de madera maciza de fresno tratada con técnica shou sugi ban (madera quemada y encerada) y cabeza de resina poliéster con acabado idéntico al hierro forjado con muescas de batalla.',
    lore: '"Silba al cortar el aire... y termina con el grito de un superviviente."',
    perks: [
      { name: 'Madera de Fresno Auténtica', desc: 'Madera real con vetas profundas y tacto rústico de bosque.' },
      { name: 'Soporte de Pared Incluido', desc: '2 ganchos rústicos con taquetes para colgarla en horizontal en tu setup.' }
    ],
    ingredients: ['Madera natural tratada', 'Cabeza de resina compuesta de 450g (sin filo real)', 'Largo total: 40cm', 'Certificado con número de forja'],
    spiciness: 0,
    tags: ['Colección', 'Huntress', 'Hacha', 'Réplica']
  },
  {
    id: 'col6',
    category: 'coleccion',
    featured: false,
    name: 'Soporte para Audífonos "Gancho del Sacrificio (Meat Hook)"',
    subtitle: 'Stand Gamer en Acero Negro & Base con Textura de Niebla',
    character: 'El Ente (The Entity)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 55000,
    priceMoney: 589.00,
    imageFallback: '🪝',
    badge: 'Headset Stand',
    description: 'Soporte vertical para audífonos gamer esculpido en forma del temido gancho de carnicero del Ente. El arco superior de acero sujeta de forma ergonómica la diadema sin deformar las almohadillas.',
    lore: '"El lugar donde tus audífonos descansan... o donde quedan colgados tras una mala partida."',
    perks: [
      { name: 'Estructura de Acero Macizo', desc: 'Base pesada de 550g con patas de goma antideslizante que no se voltea.' },
      { name: 'Curvatura Anti-Marcas', desc: 'Protección de silicona negra en el gancho para cuidar tus audífonos.' }
    ],
    ingredients: ['Acero al carbono lacado negro mate electrostático', 'Almohadilla de silicona protectora', 'Altura: 28cm', 'Peso: 550g'],
    spiciness: 0,
    tags: ['Colección', 'Setup', 'Stand', 'Audífonos', 'Gancho']
  },
  {
    id: 'col7',
    category: 'coleccion',
    featured: false,
    name: 'Baraja de Póker de Lujo "Entity Court & Tarots"',
    subtitle: '54 Cartas Foil Oro con Ilustraciones de Asesinos y Supervivientes',
    character: 'Todo el Reparto',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 36000,
    priceMoney: 339.00,
    imageFallback: '🃏',
    badge: 'Láminas Foil Oro',
    description: 'Baraja premium de 54 naipes para coleccionistas y jugadores de cartas. Los reyes representan a los Asesinos (Trapper, Myers, Wraith, Blight), las reinas a las Supervivientes (Claudette, Meg, Feng, Yui) y los comodines al Ente.',
    lore: '"El Ente siempre reparte las cartas... y la casa siempre gana."',
    perks: [
      { name: 'Acabado Air-Cushion Linen', desc: 'Deslizamiento profesional para trucos de magia o partidas de póker.' },
      { name: 'Cantos Dorados Gilding', desc: 'Bordes bañados en hoja de oro metálica reflectante.' }
    ],
    ingredients: ['Papel de casino alemán 330 GSM', 'Caja estuche con grabado en relieve y sello de cera simulado', '54 cartas completas', 'Foil dorado holográfico'],
    spiciness: 0,
    tags: ['Colección', 'Cartas', 'Póker', 'Tarot']
  },
  {
    id: 'col8',
    category: 'coleccion',
    featured: false,
    name: 'Estatua de Resina Esculpida "The Nurse - Blink in the Mist"',
    subtitle: 'Sally Smithson 24cm - Base Translúcida Iluminada',
    character: 'La Enfermera (The Nurse)',
    rarity: 'iridescent',
    rarityLabel: 'Iridiscente',
    priceBP: 175000,
    priceMoney: 1999.00,
    imageFallback: '👰',
    badge: 'Estatua Maestra',
    description: 'Estatua de colección en poliresina de 24cm de altura esculpida con Sally Smithson levitando sobre una columna de niebla translúcida. Los pliegues de su vestido desgarrado, la sierra para huesos y el vendaje están modelados con hiperrealismo.',
    lore: '"El suspiro agónico que atraviesa las paredes y el espacio mismo."',
    perks: [
      { name: 'Base con Micro-LEDs Ocultos', desc: 'La niebla de resina se ilumina desde abajo con una suave luz azul etérea.' },
      { name: 'Pintura y Sombreado a Mano', desc: 'Cada pieza es pulida y pintada a mano por artistas de miniaturas.' }
    ],
    ingredients: ['Poliresina curada al frío de alta densidad', 'Base de resina cristal tintada con módulo LED', 'Altura: 24cm', 'Caja rígida con espuma EVA a medida'],
    spiciness: 0,
    tags: ['Colección', 'Estatua', 'Nurse', 'Resina', 'De Lujo']
  },

  // =========================================================================
  // --- SECCIÓN 6: POSTERS & DECORACIÓN ---
  // =========================================================================
  {
    id: 'pos1',
    category: 'posters',
    featured: true,
    name: 'Póster Lenticular 3D "The Fog / The Entity Realm"',
    subtitle: 'Efecto de Profundidad Tridimensional - 60x90cm',
    character: 'El Ente & Asesinos',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 45000,
    priceMoney: 449.00,
    imageFallback: '🖼️',
    badge: 'Efecto Lenticular 3D',
    description: 'Impresionante póster lenticular de 60x90cm. Al moverte frente a él, la niebla parece tener varios metros de profundidad y las siluetas de los asesinos originales (Trapper, Wraith, Hillbilly y Nurse) emergen entre las garras del Ente.',
    lore: '"Míralo desde cualquier ángulo... los ojos del Ente siempre sabrán dónde estás."',
    perks: [
      { name: 'Tecnología Lenticular HD', desc: 'Efecto 3D visible sin necesidad de gafas especiales.' },
      { name: 'Material Pet Rígido 0.8mm', desc: 'No se arruga, resistente al agua y a la humedad.' }
    ],
    ingredients: ['Lámina lenticular PET de 0.8mm', 'Dimensiones: 60 x 90 cm', 'Acabado brillante de alto contraste', 'Empaque en tubo protector rígido indeformable'],
    spiciness: 0,
    tags: ['Posters', 'Lenticular', '3D', 'Decoración', 'Grande']
  },
  {
    id: 'pos2',
    category: 'posters',
    featured: true,
    name: 'Tapete de Escritorio XXL "Autohaven Wreckers Blueprint"',
    subtitle: '900 x 400 mm - Costuras Bordadas & Base Antideslizante',
    character: 'Autohaven Wreckers',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 38000,
    priceMoney: 389.00,
    imageFallback: '🖱️',
    badge: 'Desk Mat Gamer',
    description: 'Mousepad gigante para teclado y ratón de 90x40cm y 4mm de grosor. Ilustrado como un plano arquitectónico militar desgastado con el mapa de Autohaven, ubicaciones de tótems, trampillas y generadores en tonos verde fósforo y negro azabache.',
    lore: '"Tu superficie de mando para no perder el control ni fallar un solo giro de cámara."',
    perks: [
      { name: 'Superficie de Tela Microtejida Speed', desc: 'Deslizamiento ultrasuave para sensores ópticos y láser.' },
      { name: 'Costuras Perimetrales Antideshilachado', desc: 'Borde cosido de doble hebra que no irrita las muñecas.' }
    ],
    ingredients: ['Superficie: Microfibra sintética de alta densidad', 'Base: Caucho natural antideslizante con textura de agarre', 'Grosor: 4mm', 'Lavable a máquina en ciclo suave'],
    spiciness: 0,
    tags: ['Posters', 'Decoración', 'Mousepad', 'Desk Mat', 'Setup']
  },
  {
    id: 'pos3',
    category: 'posters',
    featured: false,
    name: 'Set de 4 Láminas Fine Art "Los Reinos Originales"',
    subtitle: 'Papel Algodón Texturizado 300g - 30x40cm',
    character: 'MacMillan, Coldwind, Autohaven & Crotus Prenn',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 34000,
    priceMoney: 319.00,
    imageFallback: '🎨',
    badge: 'Papel Algodón 300g',
    description: 'Cuatro láminas de arte conceptual en acuarela oscura e ilustración al carboncillo de los cuatro mapas legendarios del lanzamiento de Dead by Daylight. Listas para enmarcar y darle un toque sobrio y atmosférico a cualquier habitación gamer.',
    lore: '"Cuatro escenarios marcados por la tragedia que el Ente consumió para la eternidad."',
    perks: [
      { name: 'Papel Artístico 100% Algodón', desc: 'Textura mate rugosa que realza las tintas minerales.' },
      { name: 'Resistente a la Decoloración UV', desc: 'Tintas pigmentadas de archivo garantizadas por más de 50 años.' }
    ],
    ingredients: ['4 láminas individuales de 30 x 40 cm', 'Papel Fine Art de 300 g/m²', 'Sello en relieve de La Niebla Store', 'No incluye marcos'],
    spiciness: 0,
    tags: ['Posters', 'Láminas', 'Arte', 'Mapas', 'Fine Art']
  },
  {
    id: 'pos4',
    category: 'posters',
    featured: true,
    name: 'Letrero Neón LED Acrílico "The Campfire Icon"',
    subtitle: 'USB Powered con Dimmer Regulable - 35x35cm',
    character: 'La Fogata (The Campfire)',
    rarity: 'iridescent',
    rarityLabel: 'Iridiscente',
    priceBP: 135000,
    priceMoney: 1449.00,
    imageFallback: '🔥',
    badge: 'Neón Flex Regulable',
    description: 'Letrero neón de última generación con manguera de silicona flexible montada sobre placa acrílica transparente cortada con láser. Representa las llamas de la fogata en color ámbar cálido y las brasas en rojo fuego con control de brillo.',
    lore: '"El único refugio donde los supervivientes pueden descansar antes de la próxima partida."',
    perks: [
      { name: 'Tecnología LED Fría y Segura', desc: 'No se calienta, consumo bajo de 5V y no contiene gas tóxico ni vidrio.' },
      { name: 'Dimmer de Intensidad Táctil', desc: 'Ajusta desde una tenue luz de noche hasta brillo vibrante de streaming.' }
    ],
    ingredients: ['Acrílico transparente de 5mm con orificios de colgado', 'Tira Neón LED Flex de silicona alta densidad', 'Cable USB de 2m con controlador de brillo', 'Incluye cadena metálica y taquetes'],
    spiciness: 0,
    tags: ['Posters', 'Neón', 'Lámpara', 'Fogata', 'Streamer']
  },
  {
    id: 'pos5',
    category: 'posters',
    featured: false,
    name: 'Placa Metálica Displate "The Shape in the Shadows"',
    subtitle: 'Cartel Magnético de Acero 45x32cm con Acabado Mate & Barniz UV',
    character: 'La Forma (Michael Myers)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 48000,
    priceMoney: 499.00,
    imageFallback: '🛡️',
    badge: 'Placa de Acero',
    description: 'Póster de acero grueso montado mediante imán de neodimio a la pared (sin perforaciones ni clavos). Ilustra la silueta amenazante de Michael Myers acechando tras los arbustos de Haddonfield con barniz UV selectivo brillante en la máscara.',
    lore: '"No parpadees. Cada vez que miras hacia otro lado, ha dado un paso más."',
    perks: [
      { name: 'Montaje Magnético en 20 Segundos', desc: 'Incluye imán autoadhesivo que se pega en cualquier pared limpia sin taladro.' },
      { name: 'Resistencia Total', desc: 'No se dobla, no se rompe, inmune a la humedad del ambiente.' }
    ],
    ingredients: ['Placa de acero galvanizado de 0.6mm', 'Imán potente de pared incluido', 'Dimensiones: 45 x 32 cm', 'Holograma de autenticidad en reverso'],
    spiciness: 0,
    tags: ['Posters', 'Displate', 'Metal', 'Myers']
  },
  {
    id: 'pos6',
    category: 'posters',
    featured: false,
    name: 'Póster UV Reactivo "Trickster: Neon Slaughter Tour"',
    subtitle: 'Serigrafía Fluorescente 50x70cm - Brilla con Luz Negra',
    character: 'El Tramposo (The Trickster)',
    rarity: 'rare',
    rarityLabel: 'Raro',
    priceBP: 29000,
    priceMoney: 269.00,
    imageFallback: '⚡',
    badge: 'Brilla con Luz Negra',
    description: 'Póster de concierto ficticio en serigrafía manual con tintas fluorescentes que cobran vida bajo luz ultravioleta o luz negra de discoteca. Colores cian, amarillo flúor y magenta intenso sobre cartulina negra mate.',
    lore: '"Las entradas para el concierto están agotadas... y nadie saldrá con vida."',
    perks: [
      { name: 'Tintas Reactivas Ultravioleta', desc: 'Efecto lumínico impactante en habitaciones gamer con luz negra.' },
      { name: 'Cartulina Pesada Black Sirio', desc: 'Papel teñido en masa de 280g con tacto aterciopelado.' }
    ],
    ingredients: ['Cartulina Fedrigoni Sirio Black 280g', 'Serigrafía artesanal a 4 tintas UV', 'Medida: 50 x 70 cm', 'Empaque en tubo cilíndrico'],
    spiciness: 0,
    tags: ['Posters', 'UV', 'Luz Negra', 'Trickster']
  },
  {
    id: 'pos7',
    category: 'posters',
    featured: false,
    name: 'Tapiz de Pared Bohemio "The Fog Campfire Haven"',
    subtitle: 'Tejido Jacquard 130x150cm con Borlas Artesanales',
    character: 'La Fogata (The Campfire)',
    rarity: 'ultra-rare',
    rarityLabel: 'Ultra Raro',
    priceBP: 62000,
    priceMoney: 699.00,
    imageFallback: '🧶',
    badge: 'Tejido Pesado',
    description: 'Gran tapiz textil para colgar detrás de la cama o setup de streaming. Tejido con hilos gruesos de algodón representando la calidez de la fogata en el bosque nocturno, con flecos y borlas hechas a mano en el borde inferior.',
    lore: '"Una ventana textil hacia el único lugar donde reina la paz momentánea."',
    perks: [
      { name: '100% Algodón Tejido Jacquard', desc: 'No es una simple tela estampada, los hilos de colores forman el dibujo.' },
      { name: 'Aislamiento Acústico Parcial', desc: 'Su peso y densidad reducen el eco en habitaciones gamer.' }
    ],
    ingredients: ['100% Hilo de algodón peinado reciclado', 'Medida: 130 x 150 cm', 'Incluye cuerda rústica y clips de sujeción invisible', 'Lavable en ciclo delicado'],
    spiciness: 0,
    tags: ['Posters', 'Tapiz', 'Textil', 'Fogata', 'Boho']
  },
  {
    id: 'pos8',
    category: 'posters',
    featured: false,
    name: 'Cuadro Lienzo Canvas "El Juicio del Ente (Oil Painting)"',
    subtitle: 'Giclée sobre Bastidor de Madera Maciza 50x70cm',
    character: 'El Ente (The Entity)',
    rarity: 'very-rare',
    rarityLabel: 'Muy Raro',
    priceBP: 79000,
    priceMoney: 849.00,
    imageFallback: '🎨',
    badge: 'Lienzo en Bastidor',
    description: 'Impresión artística giclée de alta definición sobre lienzo auténtico de algodón montado sobre bastidor de madera de pino de 3cm de grosor. Reproduce un óleo expresionista dramático de los supervivientes mirando la niebla carmesí.',
    lore: '"El arte más oscuro concebido por las almas perdidas en los reinos."',
    perks: [
      { name: 'Listo para Colgar', desc: 'Bastidor tensado a mano con colgador metálico dentado ya instalado.' },
      { name: 'Textura Táctil de Lienzo', desc: 'Barniz satinado protector que previene arañazos y polvo.' }
    ],
    ingredients: ['Lienzo de algodón de 380 g/m²', 'Bastidor de madera de pino reforestado', 'Dimensiones: 50 x 70 x 3 cm', 'Esquinas con cuñas de tensión'],
    spiciness: 0,
    tags: ['Posters', 'Lienzo', 'Canvas', 'Arte', 'Ente']
  }
];

export const REALMS = [
  { id: 'fogata', name: 'Zona Central de la Fogata', desc: 'El rincón principal donde se exhiben los lanzamientos semanales, bestsellers y novedades.', capacity: 'Novedades & Bestsellers' },
  { id: 'macmillan', name: 'Almacén MacMillan Estate', desc: 'Sección rústica con coleccionables metálicos pesados, herramientas y réplicas de armas.', capacity: 'Coleccionables & Metal' },
  { id: 'ormond', name: 'Cabaña Monte Ormond', desc: 'Área dedicada a streetwear, hoodies térmicas pesadas, gorras y prendas de vestir.', capacity: 'Ropa & Streetwear' },
  { id: 'autohaven', name: 'Desguace Autohaven Store', desc: 'Espacio vintage e industrial con llaveros, pins esmaltados, desk mats y gadgets.', capacity: 'Llaveros, Pins & Desk' },
  { id: 'crotus', name: 'El Asilo Crotus Prenn', desc: 'Sector acogedor con peluches Chibi, figuras de vinilo y almohadas temáticas.', capacity: 'Peluches & Figuras' },
  { id: 'redforest', name: 'Rincón Red Forest Treats', desc: 'Estantería de dulces, botanas temáticas, bebidas energéticas y chocolates del Ente.', capacity: 'Snacks & Bebidas' }
];
