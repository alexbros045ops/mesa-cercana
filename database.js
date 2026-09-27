const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const crypto = require('node:crypto');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    city TEXT NOT NULL,
    neighborhood TEXT DEFAULT '',
    address TEXT NOT NULL,
    price TEXT DEFAULT '$$',
    rating REAL DEFAULT 0.0,
    reviewCount INTEGER DEFAULT 0,
    description TEXT DEFAULT '',
    hours TEXT DEFAULT '',
    color TEXT DEFAULT 'sand',
    initials TEXT DEFAULT '',
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    detail TEXT DEFAULT '',
    price TEXT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT NOT NULL,
    author TEXT NOT NULL,
    score REAL NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
  );
`);

// Initial seed data
const initialRestaurants = [
  {
    id: 'brasa-norte', name: 'Brasa Norte', category: 'Carnes', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Avenida Ficticia 120, San Salvador', price: '$$', rating: 4.8, reviewCount: 86,
    description: 'Cortes a la parrilla, vegetales de temporada y una carta breve para compartir.',
    hours: 'Hoy: 12:00 p. m. – 10:00 p. m.', color: 'sand', initials: 'BN', featured: 1,
    menu: [
      { name: 'Entraña a la parrilla', detail: 'Con papas rústicas y chimichurri', price: '$12.50' },
      { name: 'Vegetales al fuego', detail: 'Verduras de temporada', price: '$7.00' },
      { name: 'Flan de la casa', detail: 'Caramelo y vainilla', price: '$4.00' },
    ],
    reviews: [
      { author: 'María R.', score: 5.0, text: 'Buena atención y porciones para compartir.' },
      { author: 'Andrés G.', score: 4.5, text: 'La parrilla estaba en su punto.' },
    ],
  },
  {
    id: 'forchetta', name: 'La Forchetta', category: 'Pizza', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Calle de Muestra 48, San Salvador', price: '$$', rating: 4.7, reviewCount: 54,
    description: 'Pizza de masa delgada, horneada al momento y con ingredientes frescos.',
    hours: 'Hoy: 11:30 a. m. – 9:30 p. m.', color: 'rose', initials: 'LF', featured: 0,
    menu: [
      { name: 'Margherita', detail: 'Tomate, mozzarella y albahaca', price: '$9.00' },
      { name: 'Hongos y ajo', detail: 'Hongos salteados, ajo y mozzarella', price: '$10.50' },
      { name: 'Limonada', detail: 'Preparada en casa', price: '$2.50' },
    ],
    reviews: [
      { author: 'Sofía M.', score: 5.0, text: 'La masa es ligera y crujiente.' },
      { author: 'Diego P.', score: 4.5, text: 'Una buena opción para cenar con amigos.' },
    ],
  },
  {
    id: 'cafe-manana', name: 'Mañana Café', category: 'Cafetería', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Pasaje Ficticio 15, San Salvador', price: '$', rating: 4.9, reviewCount: 39,
    description: 'Café de especialidad, pan recién horneado y mesas tranquilas para quedarse.',
    hours: 'Hoy: 7:00 a. m. – 6:00 p. m.', color: 'sage', initials: 'MC', featured: 0,
    menu: [
      { name: 'Café filtrado', detail: 'Grano local, método del día', price: '$3.00' },
      { name: 'Tostada de aguacate', detail: 'Pan artesanal y aguacate', price: '$6.50' },
      { name: 'Roll de canela', detail: 'Horneado cada mañana', price: '$3.25' },
    ],
    reviews: [
      { author: 'Valeria C.', score: 5.0, text: 'El café y el pan estaban muy ricos.' },
      { author: 'José A.', score: 4.5, text: 'Ambiente tranquilo para trabajar un rato.' },
    ],
  },
  {
    id: 'comalito', name: 'El Comalito', category: 'Mexicana', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Avenida de Ejemplo 6, San Salvador', price: '$$', rating: 4.6, reviewCount: 28,
    description: 'Antojitos mexicanos, salsas hechas en casa y opciones para compartir.',
    hours: 'Hoy: 12:00 p. m. – 9:00 p. m.', color: 'orange', initials: 'EC', featured: 0,
    menu: [
      { name: 'Tacos de hongos', detail: 'Tres tacos con salsa verde', price: '$7.50' },
      { name: 'Quesadilla de queso', detail: 'Tortilla dorada y pico de gallo', price: '$6.00' },
      { name: 'Agua de jamaica', detail: 'Preparada en casa', price: '$2.00' },
    ],
    reviews: [
      { author: 'Camila L.', score: 4.5, text: 'La salsa verde tiene buen sabor.' },
      { author: 'Pablo N.', score: 4.5, text: 'Un menú sencillo y rico.' },
    ],
  },
  {
    id: 'sushi-rio', name: 'Río Sushi', category: 'Sushi', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Boulevard de Prueba 22, San Salvador', price: '$$$', rating: 4.5, reviewCount: 31,
    description: 'Rollos clásicos y platos japoneses en un espacio pequeño y relajado.',
    hours: 'Hoy: 1:00 p. m. – 9:30 p. m.', color: 'blue', initials: 'RS', featured: 0,
    menu: [
      { name: 'California roll', detail: 'Cangrejo, aguacate y pepino', price: '$8.00' },
      { name: 'Edamame', detail: 'Sal marina', price: '$4.00' },
      { name: 'Té frío', detail: 'Té verde con limón', price: '$2.75' },
    ],
    reviews: [
      { author: 'Natalia S.', score: 4.5, text: 'Los rollos estaban frescos.' },
      { author: 'Marco V.', score: 4.5, text: 'Buena variedad de opciones.' },
    ],
  },
  {
    id: 'pizza-central', name: 'Pizza Central', category: 'Pizza', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Calle Ficticia 31, San Salvador', price: '$', rating: 4.4, reviewCount: 19,
    description: 'Pizzas al horno con combinaciones sencillas y servicio para llevar.',
    hours: 'Hoy: 12:00 p. m. – 10:00 p. m.', color: 'plum', initials: 'PC', featured: 0,
    menu: [
      { name: 'Pizza de cuatro quesos', detail: 'Mozzarella, provolone, parmesano y azul', price: '$10.00' },
      { name: 'Pizza de vegetales', detail: 'Vegetales de temporada', price: '$8.50' },
      { name: 'Soda', detail: 'Lata', price: '$1.50' },
    ],
    reviews: [
      { author: 'Elena T.', score: 4.5, text: 'Buena opción para pedir para llevar.' },
      { author: 'Luis F.', score: 4.0, text: 'Precios accesibles y servicio rápido.' },
    ],
  },
];

// Seed if table is empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM restaurants');
const result = countStmt.get();
if (result && result.count === 0) {
  const insertRest = db.prepare(`
    INSERT INTO restaurants (id, name, category, city, neighborhood, address, price, rating, reviewCount, description, hours, color, initials, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMenu = db.prepare(`
    INSERT INTO menu_items (id, restaurant_id, name, detail, price)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertReview = db.prepare(`
    INSERT INTO reviews (id, restaurant_id, author, score, text)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const r of initialRestaurants) {
    insertRest.run(r.id, r.name, r.category, r.city, r.neighborhood, r.address, r.price, r.rating, r.reviewCount, r.description, r.hours, r.color, r.initials, r.featured);
    for (const m of r.menu) {
      insertMenu.run(crypto.randomUUID(), r.id, m.name, m.detail, m.price);
    }
    for (const rev of r.reviews) {
      insertReview.run(crypto.randomUUID(), r.id, rev.author, rev.score, rev.text);
    }
  }
}

// Queries
function getAllRestaurants(options = {}) {
  const { query = '', category = 'Todas' } = options;
  let sql = 'SELECT * FROM restaurants WHERE 1=1';
  const params = [];

  if (category && category !== 'Todas') {
    sql += ' AND category = ?';
    params.push(category);
  }

  if (query && query.trim() !== '') {
    sql += ' AND (name LIKE ? OR category LIKE ? OR city LIKE ? OR neighborhood LIKE ? OR address LIKE ? OR description LIKE ?)';
    const term = `%${query.trim()}%`;
    params.push(term, term, term, term, term, term);
  }

  sql += ' ORDER BY featured DESC, rating DESC';
  const stmt = db.prepare(sql);
  return stmt.all(...params);
}

function getRestaurantById(id) {
  const restStmt = db.prepare('SELECT * FROM restaurants WHERE id = ?');
  const restaurant = restStmt.get(id);
  if (!restaurant) return null;

  const menuStmt = db.prepare('SELECT id, name, detail, price FROM menu_items WHERE restaurant_id = ?');
  restaurant.menu = menuStmt.all(id);

  const reviewsStmt = db.prepare('SELECT id, author, score, text, created_at FROM reviews WHERE restaurant_id = ? ORDER BY created_at DESC');
  restaurant.reviews = reviewsStmt.all(id);

  return restaurant;
}

function createRestaurant(data) {
  const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
  const initials = data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'MC';
  const colors = ['sand', 'rose', 'sage', 'orange', 'blue', 'plum'];
  const color = data.color || colors[Math.floor(Math.random() * colors.length)];

  const stmt = db.prepare(`
    INSERT INTO restaurants (id, name, category, city, neighborhood, address, price, rating, reviewCount, description, hours, color, initials, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.name,
    data.category || 'Otra',
    data.city || 'San Salvador',
    data.neighborhood || '',
    data.address || '',
    data.price || '$$',
    data.rating || 5.0,
    data.reviewCount || 1,
    data.description || '',
    data.hours || 'Horario a consultar',
    color,
    initials,
    0
  );

  // If initial dishes provided
  if (Array.isArray(data.menu)) {
    const insertMenu = db.prepare('INSERT INTO menu_items (id, restaurant_id, name, detail, price) VALUES (?, ?, ?, ?, ?)');
    for (const m of data.menu) {
      if (m.name) {
        insertMenu.run(crypto.randomUUID(), id, m.name, m.detail || '', m.price || '');
      }
    }
  }

  // If initial review provided
  if (data.initialReview) {
    addReview(id, {
      author: data.initialReview.author || 'Usuario anónimo',
      score: data.initialReview.score || 5.0,
      text: data.initialReview.text || 'Lugar recomendado.',
    });
  }

  return getRestaurantById(id);
}

function addReview(restaurantId, reviewData) {
  const reviewId = crypto.randomUUID();
  const author = reviewData.author || 'Anónimo';
  const score = parseFloat(reviewData.score) || 5.0;
  const text = reviewData.text || '';

  const insertReview = db.prepare('INSERT INTO reviews (id, restaurant_id, author, score, text) VALUES (?, ?, ?, ?, ?)');
  insertReview.run(reviewId, restaurantId, author, score, text);

  // Recalculate average rating and count
  const statsStmt = db.prepare('SELECT AVG(score) as avgScore, COUNT(*) as count FROM reviews WHERE restaurant_id = ?');
  const stats = statsStmt.get(restaurantId);

  const avg = stats.avgScore ? Math.round(stats.avgScore * 10) / 10 : score;
  const count = stats.count || 1;

  const updateRest = db.prepare('UPDATE restaurants SET rating = ?, reviewCount = ? WHERE id = ?');
  updateRest.run(avg, count, restaurantId);

  return { id: reviewId, restaurant_id: restaurantId, author, score, text, created_at: new Date().toISOString() };
}

function addMenuItem(restaurantId, itemData) {
  const itemId = crypto.randomUUID();
  const insertMenu = db.prepare('INSERT INTO menu_items (id, restaurant_id, name, detail, price) VALUES (?, ?, ?, ?, ?)');
  insertMenu.run(itemId, restaurantId, itemData.name, itemData.detail || '', itemData.price || '');
  return { id: itemId, restaurant_id: restaurantId, ...itemData };
}

module.exports = {
  db,
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  addReview,
  addMenuItem,
};
