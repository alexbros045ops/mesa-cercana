require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('node:path');
const db = require('./database');
const googlePlaces = require('./googlePlaces');
const openStreetMap = require('./openStreetMap');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend assets
app.use(express.static(path.join(__dirname)));

// API: Check Google Places API key status
app.get('/api/google/status', (req, res) => {
  const isConfigured = Boolean(process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACES_API_KEY.trim() !== '');
  res.json({ configured: isConfigured });
});

// API: Search places via Google Places
app.get('/api/google/search', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: 'Falta configurar GOOGLE_PLACES_API_KEY en el archivo .env' });
    }

    const query = req.query.q || 'restaurantes en San Salvador';
    const results = await googlePlaces.searchGooglePlaces(query, apiKey);
    res.json(results);
  } catch (error) {
    console.error('Error al buscar en Google Places:', error.message);
    res.status(500).json({ error: error.message || 'Error al buscar en Google Places' });
  }
});

// API: Import a place and its reviews into SQLite
app.post('/api/google/import', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: 'Falta configurar GOOGLE_PLACES_API_KEY en el archivo .env' });
    }

    const { placeId } = req.body;
    if (!placeId) {
      return res.status(400).json({ error: 'placeId es requerido' });
    }

    const importedRestaurant = await googlePlaces.importPlaceToDatabase(placeId, apiKey);
    res.status(201).json(importedRestaurant);
  } catch (error) {
    console.error('Error al importar desde Google Places:', error.message);
    res.status(500).json({ error: error.message || 'Error al importar desde Google Places' });
  }
});

// API: Search places via OpenStreetMap (100% Free, no API key, no credit card)
app.get('/api/osm/search', async (req, res) => {
  try {
    const query = req.query.q || 'restaurantes en San Salvador';
    const results = await openStreetMap.searchOsmPlaces(query);
    res.json(results);
  } catch (error) {
    console.error('Error al buscar en OpenStreetMap:', error.message);
    res.status(500).json({ error: error.message || 'Error al buscar en OpenStreetMap' });
  }
});

// API: Import place from OpenStreetMap to SQLite
app.post('/api/osm/import', (req, res) => {
  try {
    const placeData = req.body;
    if (!placeData || !placeData.name) {
      return res.status(400).json({ error: 'Datos del lugar incompletos' });
    }

    const imported = openStreetMap.importOsmPlaceToDatabase(placeData);
    res.status(201).json(imported);
  } catch (error) {
    console.error('Error al importar lugar de OpenStreetMap:', error.message);
    res.status(500).json({ error: error.message || 'Error al importar lugar a la base de datos' });
  }
});

// API: Get all restaurants (with optional category and query filter)
app.get('/api/restaurants', (req, res) => {
  try {
    const { category, query } = req.query;
    const restaurants = db.getAllRestaurants({ category, query });
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Error al consultar restaurantes' });
  }
});

// API: Get restaurant details (includes menu & reviews)
app.get('/api/restaurants/:id', (req, res) => {
  try {
    const restaurant = db.getRestaurantById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).json({ error: 'Error al consultar detalle del restaurante' });
  }
});

// API: Add a new restaurant
app.post('/api/restaurants', (req, res) => {
  try {
    const { name, category, city, neighborhood, address, price, description, hours, menu, initialReview } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: 'Nombre y categoría son requeridos' });
    }

    const newRestaurant = db.createRestaurant({
      name,
      category,
      city,
      neighborhood,
      address,
      price,
      description,
      hours,
      menu,
      initialReview,
    });

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ error: 'Error al registrar restaurante' });
  }
});

// API: Add a review to a restaurant
app.post('/api/restaurants/:id/reviews', (req, res) => {
  try {
    const { author, score, text } = req.body;
    if (!author || !score || !text) {
      return res.status(400).json({ error: 'Autor, puntuación y comentario son obligatorios' });
    }

    const review = db.addReview(req.params.id, { author, score: parseFloat(score), text });
    const updatedRestaurant = db.getRestaurantById(req.params.id);
    res.status(201).json({ review, restaurant: updatedRestaurant });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Error al guardar la reseña' });
  }
});

// API: Add a menu item to a restaurant
app.post('/api/restaurants/:id/menu', (req, res) => {
  try {
    const { name, detail, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Nombre y precio del platillo son obligatorios' });
    }

    const item = db.addMenuItem(req.params.id, { name, detail, price });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Error al guardar platillo del menú' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor de Mesa Cercana ejecutándose en: http://localhost:${PORT}`);
  console.log(`📁 Base de datos SQLite lista en: database.sqlite`);
  console.log(`🔑 Estado Google Places API: ${process.env.GOOGLE_PLACES_API_KEY ? 'Configurada' : 'Pendiente (ver .env)'}\n`);
});
