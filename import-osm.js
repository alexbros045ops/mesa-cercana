const { searchOsmPlaces, importOsmPlaceToDatabase } = require('./openStreetMap');

async function main() {
  const query = process.argv.slice(2).join(' ') || 'restaurantes en San Salvador';
  console.log(`\n🔍 Buscando en OpenStreetMap (100% libre y gratis): "${query}"...\n`);

  try {
    const places = await searchOsmPlaces(query);
    if (places.length === 0) {
      console.log('No se encontraron lugares para esa búsqueda.');
      return;
    }

    console.log(`Se encontraron ${places.length} lugares en el mapa:\n`);

    const toImport = places.slice(0, 5);
    for (const p of toImport) {
      try {
        const imported = importOsmPlaceToDatabase(p);
        console.log(`✅ Importado: "${imported.name}" (${imported.category}) en ${imported.city}`);
      } catch (err) {
        console.log(`❌ Error al importar "${p.name}": ${err.message}`);
      }
    }

    console.log('\n🎉 ¡Listo! Lugares importados a tu base de datos SQLite sin claves ni tarjetas.');
  } catch (err) {
    console.error('❌ Error al consultar OpenStreetMap:', err.message);
  }
}

main();
