const db = require('./database');

function detectCategory(name = '', cuisine = '', type = '') {
  const combined = `${name} ${cuisine} ${type}`.toLowerCase();
  if (combined.includes('pizza') || combined.includes('italian')) return 'Pizza';
  if (combined.includes('café') || combined.includes('cafe') || combined.includes('coffee') || combined.includes('bakery')) return 'Cafetería';
  if (combined.includes('sushi') || combined.includes('japanese') || combined.includes('ramen')) return 'Sushi';
  if (combined.includes('taco') || combined.includes('mexic') || combined.includes('taquer')) return 'Mexicana';
  if (combined.includes('carne') || combined.includes('parrilla') || combined.includes('steak') || combined.includes('asado') || combined.includes('burger')) return 'Carnes';
  return 'Otra';
}

function generateDefaultMenu(category) {
  switch (category) {
    case 'Pizza':
      return [
        { name: 'Pizza Suprema / Especial', detail: 'Salsa de tomate, queso mozzarella y carnes mixtas', price: '$10.50' },
        { name: 'Pizza de Queso clásica', detail: 'Masa artesanal y mezcla de quesos', price: '$8.50' },
        { name: 'Bebida fría', detail: 'Refresco o té helado', price: '$2.00' },
      ];
    case 'Cafetería':
      return [
        { name: 'Café de la casa / Americano', detail: 'Grano local tostado medio', price: '$2.75' },
        { name: 'Panini o Tostada artesanal', detail: 'Jamón, queso derretido y aderezo', price: '$5.50' },
        { name: 'Porción de pastel / repostería', detail: 'Elaborado en casa fresco', price: '$3.50' },
      ];
    case 'Carnes':
      return [
        { name: 'Plato de carne a la parrilla', detail: 'Acompañado de papas, frijoles y chimichurri', price: '$14.50' },
        { name: 'Hamburguesa de la casa', detail: 'Carne de res angus con queso y tocino', price: '$8.75' },
        { name: 'Bebida o cerveza', detail: 'Bien fría', price: '$2.50' },
      ];
    case 'Mexicana':
      return [
        { name: 'Orden de tacos tradicionales (3 uds)', detail: 'Tortilla de maíz, cilantro, cebolla y salsas', price: '$6.50' },
        { name: 'Quesadilla con queso y carne', detail: 'Con pico de gallo y guacamole', price: '$5.75' },
        { name: 'Agua fresca del día', detail: 'Horchata o Jamaica casera', price: '$2.00' },
      ];
    case 'Sushi':
      return [
        { name: 'Rollo clásico (10 piezas)', detail: 'Aguacate, queso crema y proteína fresca', price: '$9.50' },
        { name: 'Entrada de Edamame o Gyozas', detail: 'Sellados con sal marina o salsa ponzu', price: '$4.50' },
        { name: 'Té verde frío o caliente', detail: 'Infusión tradicional', price: '$2.50' },
      ];
    default:
      return [
        { name: 'Plato principal de la casa', detail: 'Especialidad recomendada por el chef', price: '$7.50' },
        { name: 'Bebida natural', detail: 'Preparada al momento', price: '$2.00' },
      ];
  }
}

/**
 * Searches real places in OpenStreetMap (Nominatim)
 */
async function searchOsmPlaces(query = 'restaurantes en San Salvador') {
  const cleanQuery = query.trim() || 'restaurantes en San Salvador';

  async function fetchNominatim(q) {
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('q', q);
    url.searchParams.set('format', 'json');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('extratags', '1');
    url.searchParams.set('limit', '12');

    const res = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'MesaCercanaApp/1.0 (contact@mesacercana.local)',
        'Accept-Language': 'es',
      },
    });
    if (!res.ok) return [];
    return await res.json();
  }

  let results = await fetchNominatim(cleanQuery);
  if (results.length === 0 && !cleanQuery.toLowerCase().includes('restaurante')) {
    results = await fetchNominatim(`restaurante ${cleanQuery}`);
  }

  return results.map((item) => {
    const addr = item.address || {};
    const extra = item.extratags || {};
    const name = item.name || addr.amenity || addr.restaurant || addr.cafe || item.display_name.split(',')[0];
    const city = addr.city || addr.town || addr.municipality || addr.state || 'San Salvador';
    const neighborhood = addr.neighbourhood || addr.suburb || addr.quarter || '';
    const street = [addr.road, addr.house_number].filter(Boolean).join(' ') || item.display_name.split(',').slice(1, 3).join(',').trim();
    const category = detectCategory(name, extra.cuisine || '', item.type || '');
    const hours = extra.opening_hours ? `Horario: ${extra.opening_hours}` : 'Consultar horario en el local';

    return {
      osmId: item.place_id,
      name,
      category,
      city,
      neighborhood,
      address: street || item.display_name,
      hours,
      cuisine: extra.cuisine || '',
      price: category === 'Carnes' || category === 'Sushi' ? '$$$' : category === 'Pizza' || category === 'Mexicana' ? '$$' : '$',
      lat: item.lat,
      lon: item.lon,
    };
  });
}

/**
 * Imports a selected OSM place into SQLite
 */
function importOsmPlaceToDatabase(placeData) {
  const category = placeData.category || detectCategory(placeData.name, placeData.cuisine);
  const city = placeData.city || 'San Salvador';
  const neighborhood = placeData.neighborhood || '';
  const address = placeData.address || `${placeData.name}, ${city}`;
  const hours = placeData.hours || 'Lun – Dom: 11:00 a. m. – 9:00 p. m.';
  const defaultMenu = generateDefaultMenu(category);

  const restaurant = db.createRestaurant({
    name: placeData.name,
    category,
    city,
    neighborhood,
    address,
    price: placeData.price || '$$',
    rating: 4.8,
    reviewCount: 1,
    description: `Lugar ubicado en ${neighborhood ? neighborhood + ', ' : ''}${city}. Especialidad en ${category.toLowerCase()}.`,
    hours,
    menu: defaultMenu,
  });

  // Add initial review
  db.addReview(restaurant.id, {
    author: 'Comunidad Mesa Cercana',
    score: 5.0,
    text: `Excelente ubicación en ${city}. Recomendado para visitar y probar su menú de ${category.toLowerCase()}.`,
  });

  return db.getRestaurantById(restaurant.id);
}

module.exports = {
  searchOsmPlaces,
  importOsmPlaceToDatabase,
};
