require('dotenv').config();
const { searchGooglePlaces, importPlaceToDatabase } = require('./googlePlaces');

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: Falta configurar GOOGLE_PLACES_API_KEY en tu archivo .env');
    console.log('👉 Abre el archivo .env y coloca: GOOGLE_PLACES_API_KEY=tu_clave_aqui');
    process.exit(1);
  }

  const query = process.argv.slice(2).join(' ') || 'mejores restaurantes en San Salvador';
  console.log(`\n🔍 Buscando en Google Maps: "${query}"...\n`);

  try {
    const places = await searchGooglePlaces(query, apiKey);
    if (places.length === 0) {
      console.log('No se encontraron lugares para esa búsqueda.');
      return;
    }

    console.log(`Se encontraron ${places.length} lugares. Importando a SQLite...\n`);

    // Import the first 5 places with reviews
    const toImport = places.slice(0, 5);
    for (const p of toImport) {
      process.stdout.write(`⏳ Importando "${p.name}" con sus reseñas... `);
      try {
        const imported = await importPlaceToDatabase(p.placeId, apiKey);
        console.log(`✅ Listo (${imported.reviews?.length || 0} reseñas guardadas)`);
      } catch (err) {
        console.log(`❌ Error: ${err.message}`);
      }
    }

    console.log('\n🎉 ¡Proceso finalizado! Los restaurantes y reseñas ya están en tu base de datos SQLite.');
  } catch (err) {
    console.error('❌ Error al consultar Google Places:', err.message);
  }
}

main();
