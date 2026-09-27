const db = require('./database');

const realRestaurants = [
  {
    name: 'La Pampa Argentina',
    category: 'Carnes',
    city: 'San Salvador',
    neighborhood: 'Colonia Escalón',
    address: 'Paseo General Escalón y 79 Av. Sur #4046',
    price: '$$$',
    rating: 4.7,
    description: 'Tradición en cortes de carne a la parrilla, bife de chorizo, entraña y ambiente clásico familiar.',
    hours: 'Lun – Dom: 11:30 a. m. – 10:00 p. m.',
    menu: [
      { name: 'Bife de Chorizo (12 oz)', detail: 'Acompañado de papa asada y ensalada de la casa', price: '$21.50' },
      { name: 'Puyazo Importado (10 oz)', detail: 'Corte jugoso a la brasa con chimichurri', price: '$18.75' },
      { name: 'Provoleta a la parrilla', detail: 'Queso provolone fundido con orégano y aceite de oliva', price: '$7.50' },
      { name: 'Empanadas argentinas (2 uds)', detail: 'Rellenas de carne cortada a cuchillo', price: '$5.50' },
      { name: 'Panqueque con dulce de leche', detail: 'Tradicional postre flameado con azúcar glas', price: '$4.75' }
    ],
    reviews: [
      { author: 'Guillermo F.', score: 5.0, text: 'El mejor puyazo de San Salvador. Servicio atento y el chimichurri es insuperable.' },
      { author: 'Ana Patricia M.', score: 4.5, text: 'Excelente lugar para almuerzos familiares o de negocios. Las carnes siempre en su punto.' },
      { author: 'Rodrigo S.', score: 4.8, text: 'Las empanadas de entrada y el bife de chorizo estuvieron espectaculares.' }
    ]
  },
  {
    name: 'Típicos Margoth',
    category: 'Otra',
    city: 'Santa Tecla',
    neighborhood: 'Plaza Merliot / Santa Tecla',
    address: 'Calle Chiltiupán y 17 Av. Norte, Santa Tecla',
    price: '$',
    rating: 4.8,
    description: 'El referente de la comida típica salvadoreña desde 1962: pupusas, pastelitos, tamales y atoles tradicionales.',
    hours: 'Lun – Dom: 6:30 a. m. – 8:30 p. m.',
    menu: [
      { name: 'Pupusa de queso con loroco (maíz o arroz)', detail: 'Queso artesanal con loroco fresco, curtido y salsa', price: '$1.40' },
      { name: 'Pupusa revuelta tradicional', detail: 'Chicharrón de cerdo molido, frijoles y queso derretido', price: '$1.35' },
      { name: 'Pastelitos de carne (orden de 3)', detail: 'Con relleno criollo de carne y verduras, acompañados de curtido', price: '$3.50' },
      { name: 'Tamal de gallina india', detail: 'Masa colada envuelta en hoja de plátano con trozo de gallina criolla', price: '$2.25' },
      { name: 'Atol de elote caliente', detail: 'Acompañado de granos tiernos de elote y canela', price: '$1.85' },
      { name: 'Plato típico salvadoreño', detail: 'Plátano frito, frijoles refritos, crema, queso duro blando y huevo', price: '$4.95' }
    ],
    reviews: [
      { author: 'Beatriz L.', score: 5.0, text: 'Comida salvadoreña con sazón de hogar. Los tamales y el atol de elote son obligatorios si vienes al país.' },
      { author: 'Mauricio V.', score: 4.7, text: 'Las pupusas de masa de arroz son las mejores y la atención es súper rápida.' },
      { author: 'Carmen T.', score: 4.9, text: 'Un clásico de toda la vida que nunca decepciona. Precios muy accesibles y comida limpia.' }
    ]
  },
  {
    name: 'Al Pomodoro',
    category: 'Pizza',
    city: 'San Salvador',
    neighborhood: 'Colonia San Benito',
    address: 'Bulevar del Hipódromo #214, San Benito',
    price: '$$',
    rating: 4.6,
    description: 'Auténtica trattoria italiana con pastas hechas a mano, pizzas a la leña y ambiente rústico acogedor.',
    hours: 'Mar – Dom: 12:00 m. – 10:30 p. m.',
    menu: [
      { name: 'Pizza Margherita Verace', detail: 'Salsa pomodoro casera, mozzarella fior di latte y albahaca fresca', price: '$11.00' },
      { name: 'Pizza Quattro Formaggi', detail: 'Mozzarella, gorgonzola, parmesano reggiano y fontina', price: '$13.50' },
      { name: 'Fettuccine Al Pomodoro & Basilico', detail: 'Pasta artesanal fresca con salsa de tomate San Marzano', price: '$9.75' },
      { name: 'Lasagna Bolognese tradicional', detail: 'Capas de pasta casera, ragú de res y bechamel gratinada', price: '$12.25' },
      { name: 'Tiramisú della Casa', detail: 'Bizcochos soletilla empapados en café espresso y crema de mascarpone', price: '$5.50' }
    ],
    reviews: [
      { author: 'Eduardo M.', score: 5.0, text: 'La masa de la pizza a la leña tiene ese toque ahumado perfecto. El tiramisú es el mejor de la zona.' },
      { author: 'Lucía G.', score: 4.5, text: 'Gran ambiente para citas románticas o salir a cenar en San Benito. La lasagna es deliciosa.' }
    ]
  },
  {
    name: 'Viva Espresso',
    category: 'Cafetería',
    city: 'San Salvador',
    neighborhood: 'Zona Rosa / San Benito',
    address: 'Calle La Mascota #519, Colonia San Benito',
    price: '$$',
    rating: 4.9,
    description: 'Pioneros del café de especialidad salvadoreño. Variedades Pacamara y Bourbon de fincas de altura.',
    hours: 'Lun – Sáb: 7:00 a. m. – 7:30 p. m., Dom: 8:00 a. m. – 6:00 p. m.',
    menu: [
      { name: 'Café Filtrado V60 (Pacamara Natural)', detail: 'Notas a frutos rojos, mora y chocolate amargo', price: '$3.75' },
      { name: 'Cappuccino Doble', detail: 'Espresso balanceado con microespuma de leche sedosa', price: '$3.25' },
      { name: 'Cold Brew de la Casa', detail: 'Extracción en frío por 18 horas, refrescante y suave', price: '$3.50' },
      { name: 'Toast de Aguacate y Huevo Poché', detail: 'En pan de masa madre con aceite de oliva y semillas de girasol', price: '$6.50' },
      { name: 'Tarta de Zanahoria con Nuez', detail: 'Bizcocho especiado con frosting de queso crema', price: '$4.25' }
    ],
    reviews: [
      { author: 'Federico H.', score: 5.0, text: 'Si eres amante del buen café de origen, este es el lugar. Los baristas conocen cada detalle del grano.' },
      { author: 'Gabriela Q.', score: 4.8, text: 'Excelente lugar para llevar la laptop y trabajar con tranquilidad. El toast de aguacate es delicioso.' }
    ]
  },
  {
    name: 'El Zócalo',
    category: 'Mexicana',
    city: 'San Salvador',
    neighborhood: 'Colonia Escalón',
    address: '87 Av. Norte y 7a Calle Poniente #4437',
    price: '$$',
    rating: 4.6,
    description: 'Sabores tradicionales de México: tacos al pastor trompo directo, cazuelas de queso y micheladas preparadas.',
    hours: 'Lun – Dom: 11:30 a. m. – 10:00 p. m.',
    menu: [
      { name: 'Orden de Tacos al Pastor (4 uds)', detail: 'Tortilla de maíz suave, carne marinada con piña, cilantro y cebolla', price: '$7.95' },
      { name: 'Gringa de Pastor', detail: 'Tortilla de harina grande con queso derretido y carne al pastor', price: '$5.50' },
      { name: 'Queso Fundido con Chorizo', detail: 'Acompañado de tortillas calientes de maíz o harina', price: '$6.25' },
      { name: 'Chilaquiles verdes con pollo', detail: 'Totopos bañados en salsa verde tatemada con crema y queso cotija', price: '$7.50' },
      { name: 'Horchata mexicana estilo Michoacán', detail: 'Con toque de canela y vainilla natural (vaso grande)', price: '$2.50' }
    ],
    reviews: [
      { author: 'Manuel C.', score: 4.7, text: 'Tacos al pastor auténticos con piña asada. La salsa habanera pica rico y las gringas son enormes.' },
      { author: 'Sofía D.', score: 4.5, text: 'Buen ambiente, música agradable y servicio rápido. Recomendadas las cazuelas de queso.' }
    ]
  },
  {
    name: 'Koi Sushi & Robata',
    category: 'Sushi',
    city: 'Antiguo Cuscatlán',
    neighborhood: 'Santa Elena',
    address: 'Bulevar Santa Elena, Centro Comercial Atrium Plaza',
    price: '$$$',
    rating: 4.7,
    description: 'Cocina japonesa de autor, rollos fusión innovadores, cortes de sashimi fresco y barra de robatayaki.',
    hours: 'Lun – Dom: 12:00 m. – 3:30 p. m. y 6:00 p. m. – 10:30 p. m.',
    menu: [
      { name: 'Spicy Tuna Tartare Roll (10 piezas)', detail: 'Atún fresco spicy, aguacate, pepino y toque de salsa de anguila', price: '$12.50' },
      { name: 'Rainbow Roll', detail: 'Relleno de kanikama y aguacate, cubierto de salmón, atún y pescado blanco', price: '$13.75' },
      { name: 'Sashimi Mixto (9 cortes)', detail: 'Cortes finos de salmón noruego, atún aleta amarilla y pesca local', price: '$15.00' },
      { name: 'Gyozas de Cerdo y Jengibre (5 uds)', detail: 'Selladas a la plancha con salsa ponzu cítrica', price: '$6.25' },
      { name: 'Helado de Té Verde Tempura', detail: 'Bola de helado frita en costra crujiente de tempura', price: '$5.00' }
    ],
    reviews: [
      { author: 'David K.', score: 5.0, text: 'Pescado fresco de altísima calidad. El Rainbow roll y las gyozas estaban en su punto.' },
      { author: 'Marcela B.', score: 4.6, text: 'Presentación impecable de los platillos y coctelería bien elaborada. Muy recomendado.' }
    ]
  },
  {
    name: 'Rústico Bistro',
    category: 'Carnes',
    city: 'San Salvador',
    neighborhood: 'Colonia San Benito',
    address: 'Calle La Reforma #225, San Benito',
    price: '$$',
    rating: 4.8,
    description: 'Famosos por sus hamburguesas artesanales gourmet, pan brioche recién horneado y cervezas artesanales.',
    hours: 'Mar – Dom: 12:00 m. – 9:30 p. m.',
    menu: [
      { name: 'La Rústica Clásica', detail: 'Torta de res angus 1/2 lb, queso cheddar añejo, tocino crocante y salsa secreta', price: '$9.95' },
      { name: 'Blue Cheese & Caramelized Onion', detail: 'Carne jugosa, queso azul fundido, cebolla caramelizada y arúgula', price: '$10.75' },
      { name: 'Papas Trufadas con Parmesano', detail: 'Papas corte rústico con aceite de trufa blanca y queso parmesano rallado', price: '$4.95' },
      { name: 'Malteada de Caramelo Salado', detail: 'Helado artesanal de vainilla con sirope de caramelo salado casero', price: '$4.50' }
    ],
    reviews: [
      { author: 'Javier N.', score: 5.0, text: 'Fácilmente las mejores hamburguesas de San Salvador. La carne jugosa y el pan brioche no se deshace.' },
      { author: 'Valeria R.', score: 4.7, text: 'Las papas trufadas son adictivas. El lugar tiene muy buena vibra.' }
    ]
  },
  {
    name: 'Pupusería La Suiza',
    category: 'Otra',
    city: 'Antiguo Cuscatlán',
    neighborhood: 'Centro de Antiguo Cuscatlán',
    address: 'Calle Alberto Sánchez Poniente #8, Parque Central',
    price: '$',
    rating: 4.9,
    description: 'Una de las pupuserías más queridas de Antiguo Cuscatlán: masa delgada, doraditas y abundante queso.',
    hours: 'Lun – Dom: 4:00 p. m. – 10:30 p. m.',
    menu: [
      { name: 'Pupusa de Ayote con Queso', detail: 'Masa de maíz o arroz con ayote tierno y queso chicloso', price: '$1.30' },
      { name: 'Pupusa Loca Gigante', detail: 'Con todos los ingredientes: chicharrón, frijol, queso, loroco, jalapeño y ajo', price: '$3.50' },
      { name: 'Pupusa de Frijol con Queso', detail: 'Frijoles refritos con queso salvadoreño artesanal', price: '$1.15' },
      { name: 'Refresco de Cebada con leche', detail: 'Elixir rosado tradicional salvadoreño con fresa y canela', price: '$1.25' }
    ],
    reviews: [
      { author: 'Josué A.', score: 5.0, text: 'La pupusa de ayote con queso es de otro planeta. El curtido con orégano y chile picante está perfecto.' },
      { author: 'Claudia M.', score: 4.8, text: 'Parada obligatoria de noche si estás por el parque de Antiguo Cuscatlán.' }
    ]
  }
];

function seedRealData() {
  console.log('\n🚀 Iniciando importación de restaurantes reales a SQLite...');

  let added = 0;
  for (const r of realRestaurants) {
    // Check if already exists to avoid duplicates
    const existing = db.getAllRestaurants({ query: r.name });
    if (existing.some(item => item.name.toLowerCase() === r.name.toLowerCase())) {
      console.log(`ℹ️  "${r.name}" ya existe en la base de datos.`);
      continue;
    }

    const created = db.createRestaurant({
      name: r.name,
      category: r.category,
      city: r.city,
      neighborhood: r.neighborhood,
      address: r.address,
      price: r.price,
      rating: r.rating,
      reviewCount: r.reviews.length,
      description: r.description,
      hours: r.hours,
      menu: r.menu,
    });

    // Add real reviews
    for (const rev of r.reviews) {
      db.addReview(created.id, rev);
    }

    console.log(`✅ Importado: "${r.name}" con ${r.menu.length} platillos en menú y ${r.reviews.length} reseñas.`);
    added++;
  }

  console.log(`\n🎉 ¡Listo! Se agregaron ${added} restaurantes reales con menús y reseñas a database.sqlite.\n`);
}

seedRealData();
