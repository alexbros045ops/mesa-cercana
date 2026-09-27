const db = require('./database');

// Map Google types to our categories
function mapGoogleCategory(types = []) {
  const typeSet = new Set(types);
  if (typeSet.has('meal_takeaway') && typeSet.has('pizza_restaurant')) return 'Pizza';
  if (typeSet.has('pizza_restaurant')) return 'Pizza';
  if (typeSet.has('cafe') || typeSet.has('coffee_shop') || typeSet.has('bakery')) return 'Cafetería';
  if (typeSet.has('steak_house') || typeSet.has('barbecue_restaurant')) return 'Carnes';
  if (typeSet.has('sushi_restaurant') || typeSet.has('japanese_restaurant')) return 'Sushi';
  if (typeSet.has('mexican_restaurant')) return 'Mexicana';
  if (typeSet.has('italian_restaurant')) return 'Pizza';
  return 'Otra';
}

function mapPriceLevel(priceLevel) {
  if (priceLevel === 1) return '$';
  if (priceLevel === 2) return '$$';
  if (priceLevel === 3 || priceLevel === 4) return '$$$';
  return '$$';
}

/**
 * Searches places using Google Maps Text Search API
 */
async function searchGooglePlaces(query, apiKey) {
  if (!apiKey) {
    throw new Error('Falta configurar GOOGLE_PLACES_API_KEY en el archivo .env');
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
  url.searchParams.set('query', query);
  url.searchParams.set('type', 'restaurant');
  url.searchParams.set('language', 'es');
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error en la llamada a Google Places: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google API error: ${data.status} - ${data.error_message || ''}`);
  }

  return (data.results || []).map((place) => ({
    placeId: place.place_id,
    name: place.name,
    address: place.formatted_address,
    rating: place.rating || 0,
    reviewCount: place.user_ratings_total || 0,
    priceLevel: mapPriceLevel(place.price_level),
    category: mapGoogleCategory(place.types),
    isOpenNow: place.opening_hours ? place.opening_hours.open_now : null,
  }));
}

/**
 * Gets details of a place including user reviews
 */
async function getGooglePlaceDetails(placeId, apiKey) {
  if (!apiKey) {
    throw new Error('Falta configurar GOOGLE_PLACES_API_KEY en el archivo .env');
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'place_id,name,formatted_address,address_components,rating,user_ratings_total,price_level,reviews,opening_hours,editorial_summary,types');
  url.searchParams.set('language', 'es');
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error en Google Place Details: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.status !== 'OK') {
    throw new Error(`Google API error: ${data.status} - ${data.error_message || ''}`);
  }

  return data.result;
}

/**
 * Imports a Google Place and its reviews directly into SQLite
 */
async function importPlaceToDatabase(placeId, apiKey) {
  const details = await getGooglePlaceDetails(placeId, apiKey);

  // Extract city/neighborhood if available
  let city = 'San Salvador';
  let neighborhood = '';
  if (Array.isArray(details.address_components)) {
    const locality = details.address_components.find(c => c.types.includes('locality'));
    if (locality) city = locality.long_name;
    const sublocality = details.address_components.find(c => c.types.includes('sublocality') || c.types.includes('neighborhood'));
    if (sublocality) neighborhood = sublocality.long_name;
  }

  const hours = (details.opening_hours && details.opening_hours.weekday_text && details.opening_hours.weekday_text[0])
    ? details.opening_hours.weekday_text[0]
    : 'Consultar horario';

  const description = details.editorial_summary?.overview ||
    `Restaurante popular en ${city}, calificado en Google Maps con ${details.rating || 4.5} estrellas.`;

  // Create restaurant in SQLite
  const restaurant = db.createRestaurant({
    name: details.name,
    category: mapGoogleCategory(details.types),
    city: city,
    neighborhood: neighborhood,
    address: details.formatted_address || '',
    price: mapPriceLevel(details.price_level),
    rating: details.rating || 5.0,
    reviewCount: details.user_ratings_total || (details.reviews?.length || 0),
    description: description,
    hours: hours,
  });

  // Import Google reviews
  if (Array.isArray(details.reviews)) {
    for (const rev of details.reviews) {
      db.addReview(restaurant.id, {
        author: rev.author_name || 'Usuario de Google',
        score: rev.rating || 5.0,
        text: rev.text || 'Buena experiencia recomendada.',
      });
    }
  }

  // Return the complete restaurant with fresh reviews
  return db.getRestaurantById(restaurant.id);
}

module.exports = {
  searchGooglePlaces,
  getGooglePlaceDetails,
  importPlaceToDatabase,
};
