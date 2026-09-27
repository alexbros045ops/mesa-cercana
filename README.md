# Mesa Cercana — Web con Base de Datos SQLite

Aplicación web para explorar restaurantes por categoría, consultar sus menús, ver reseñas existentes y registrar nuevos lugares, platillos y opiniones con persistencia en base de datos SQLite local.

## 🚀 Cómo ejecutar la aplicación

1. Abre tu terminal en la carpeta del proyecto (`RestaurantesWeb`).
2. Inicia el servidor con:
   ```bash
   npm start
   ```
   *(O si prefieres reinicio automático al guardar cambios: `npm run dev`)*
3. Abre tu navegador en:
   **[http://localhost:3000](http://localhost:3000)**

---

## 🗄️ Base de datos (SQLite)

El archivo de la base de datos se crea automáticamente como **`database.sqlite`** usando el motor SQLite nativo de Node.js (sin dependencias binarias pesadas).

### Estructura de tablas:

1. **`restaurants`**:
   - `id`: identificador único
   - `name`: nombre del restaurante
   - `category`: categoría (Carnes, Pizza, Cafetería, Mexicana, Sushi, Otra, etc.)
   - `city` y `neighborhood`: ubicación
   - `address`: dirección física
   - `price`: rango de precio (`$`, `$$`, `$$$`)
   - `rating`: calificación promedio calculada automáticamente
   - `reviewCount`: cantidad de reseñas
   - `description`: qué hace especial al lugar
   - `hours`: horario de atención

2. **`menu_items`**:
   - `id`: identificador único
   - `restaurant_id`: clave foránea hacia el restaurante
   - `name`: nombre del platillo
   - `detail`: descripción o ingredientes
   - `price`: precio

3. **`reviews`**:
   - `id`: identificador único
   - `restaurant_id`: clave foránea hacia el restaurante
   - `author`: nombre del cliente
   - `score`: calificación (1.0 a 5.0 estrellas)
   - `text`: comentario de la reseña
   - `created_at`: fecha y hora de publicación

---

## ✨ Funcionalidades integradas

- **Explorador y Filtros**: Búsqueda en tiempo real por nombre, zona o categoría.
- **Ficha detallada**: Al hacer clic en un restaurante se cargan sus datos completos, menú y reseñas desde la base de datos.
- **Agregar platillos al menú**: Dentro de la ficha de cualquier restaurante, puedes abrir la sección para añadir nuevos platos directamente.
- **Escribir reseñas**: Formulario interactivo en cada restaurante para dejar puntuación y opinión; el promedio del restaurante se recalcula automáticamente en SQLite.
- **Agregar nuevos restaurantes**: Mediante el botón "+ Agregar lugar" o el formulario de la comunidad.

---

## 🗺️ Importación 100% Gratuita con OpenStreetMap (Sin tarjeta ni claves)

No necesitas tarjetas de crédito ni registro en Google:

- **Desde la web**:
  Entra a [http://localhost:3000](http://localhost:3000) y haz clic en **`🗺️ Importar de Mapa (Gratis)`**. Escribe una zona o tipo de comida (ej. *"Pizza San Salvador"*, *"Santa Tecla"*, *"Cafeterías"*) y presiona **Importar a SQLite**.
- **Desde la terminal**:
  ```bash
  node import-osm.js "pizzerias en San Salvador"
  ```
- **Cargar restaurantes icónicos reales de El Salvador**:
  ```bash
  node seed-real.js
  ```

---

## 🔍 Opción alternativa: Google Places API (Opcional)

Ya está programada la integración para descargar restaurantes reales y sus reseñas existentes directo a SQLite:

### Paso 1: Obtener tu clave de Google Cloud
1. Entra a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un proyecto (o usa uno existente).
3. Ve a **APIs & Services > Library** y busca **Places API (New)** o **Places API**, y haz clic en **Enable (Habilitar)**.
4. Ve a **APIs & Services > Credentials** y crea una **API Key**.
5. Abre el archivo `.env` en este proyecto y pega tu clave:
   ```env
   GOOGLE_PLACES_API_KEY=AIzaSy...tu_clave_aqui...
   ```

### Paso 2: Importar restaurantes y reseñas
Tienes dos formas de usarlo:

- **Desde la página web**:
  Entra a [http://localhost:3000](http://localhost:3000) y haz clic en el botón superior **`+ Google Maps`**. Escribe lo que buscas (ej. *"Restaurantes en San Benito"*) y haz clic en **Importar a SQLite**.
- **Desde la terminal**:
  ```bash
  node import-google.js "mejores restaurantes en San Salvador"
  ```
  El script descargará los restaurantes y sus opiniones de usuarios reales y los guardará en tu base de datos automáticamente.


