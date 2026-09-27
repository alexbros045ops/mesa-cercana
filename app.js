const categories = ['Todas', 'Carnes', 'Pizza', 'Cafetería', 'Mexicana', 'Sushi'];

const restaurants = [
  {
    id: 'brasa-norte', name: 'Brasa Norte', category: 'Carnes', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Avenida Ficticia 120, San Salvador', price: '$$', rating: '4.8', reviewCount: 86,
    description: 'Cortes a la parrilla, vegetales de temporada y una carta breve para compartir.',
    hours: 'Hoy: 12:00 p. m. – 10:00 p. m.', menu: [
      { name: 'Entraña a la parrilla', detail: 'Con papas rústicas y chimichurri', price: '$12.50' },
      { name: 'Vegetales al fuego', detail: 'Verduras de temporada', price: '$7.00' },
      { name: 'Flan de la casa', detail: 'Caramelo y vainilla', price: '$4.00' },
    ], reviews: [
      { author: 'María R.', score: '5.0', text: 'Buena atención y porciones para compartir.' },
      { author: 'Andrés G.', score: '4.5', text: 'La parrilla estaba en su punto.' },
    ], color: 'sand', initials: 'BN', featured: true,
  },
  {
    id: 'forchetta', name: 'La Forchetta', category: 'Pizza', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Calle de Muestra 48, San Salvador', price: '$$', rating: '4.7', reviewCount: 54,
    description: 'Pizza de masa delgada, horneada al momento y con ingredientes frescos.',
    hours: 'Hoy: 11:30 a. m. – 9:30 p. m.', menu: [
      { name: 'Margherita', detail: 'Tomate, mozzarella y albahaca', price: '$9.00' },
      { name: 'Hongos y ajo', detail: 'Hongos salteados, ajo y mozzarella', price: '$10.50' },
      { name: 'Limonada', detail: 'Preparada en casa', price: '$2.50' },
    ], reviews: [
      { author: 'Sofía M.', score: '5.0', text: 'La masa es ligera y crujiente.' },
      { author: 'Diego P.', score: '4.5', text: 'Una buena opción para cenar con amigos.' },
    ], color: 'rose', initials: 'LF',
  },
  {
    id: 'cafe-manana', name: 'Mañana Café', category: 'Cafetería', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Pasaje Ficticio 15, San Salvador', price: '$', rating: '4.9', reviewCount: 39,
    description: 'Café de especialidad, pan recién horneado y mesas tranquilas para quedarse.',
    hours: 'Hoy: 7:00 a. m. – 6:00 p. m.', menu: [
      { name: 'Café filtrado', detail: 'Grano local, método del día', price: '$3.00' },
      { name: 'Tostada de aguacate', detail: 'Pan artesanal y aguacate', price: '$6.50' },
      { name: 'Roll de canela', detail: 'Horneado cada mañana', price: '$3.25' },
    ], reviews: [
      { author: 'Valeria C.', score: '5.0', text: 'El café y el pan estaban muy ricos.' },
      { author: 'José A.', score: '4.5', text: 'Ambiente tranquilo para trabajar un rato.' },
    ], color: 'sage', initials: 'MC',
  },
  {
    id: 'comalito', name: 'El Comalito', category: 'Mexicana', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Avenida de Ejemplo 6, San Salvador', price: '$$', rating: '4.6', reviewCount: 28,
    description: 'Antojitos mexicanos, salsas hechas en casa y opciones para compartir.',
    hours: 'Hoy: 12:00 p. m. – 9:00 p. m.', menu: [
      { name: 'Tacos de hongos', detail: 'Tres tacos con salsa verde', price: '$7.50' },
      { name: 'Quesadilla de queso', detail: 'Tortilla dorada y pico de gallo', price: '$6.00' },
      { name: 'Agua de jamaica', detail: 'Preparada en casa', price: '$2.00' },
    ], reviews: [
      { author: 'Camila L.', score: '4.5', text: 'La salsa verde tiene buen sabor.' },
      { author: 'Pablo N.', score: '4.5', text: 'Un menú sencillo y rico.' },
    ], color: 'orange', initials: 'EC',
  },
  {
    id: 'sushi-rio', name: 'Río Sushi', category: 'Sushi', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Boulevard de Prueba 22, San Salvador', price: '$$$', rating: '4.5', reviewCount: 31,
    description: 'Rollos clásicos y platos japoneses en un espacio pequeño y relajado.',
    hours: 'Hoy: 1:00 p. m. – 9:30 p. m.', menu: [
      { name: 'California roll', detail: 'Cangrejo, aguacate y pepino', price: '$8.00' },
      { name: 'Edamame', detail: 'Sal marina', price: '$4.00' },
      { name: 'Té frío', detail: 'Té verde con limón', price: '$2.75' },
    ], reviews: [
      { author: 'Natalia S.', score: '4.5', text: 'Los rollos estaban frescos.' },
      { author: 'Marco V.', score: '4.5', text: 'Buena variedad de opciones.' },
    ], color: 'blue', initials: 'RS',
  },
  {
    id: 'pizza-central', name: 'Pizza Central', category: 'Pizza', city: 'San Salvador', neighborhood: 'Zona de muestra',
    address: 'Calle Ficticia 31, San Salvador', price: '$', rating: '4.4', reviewCount: 19,
    description: 'Pizzas al horno con combinaciones sencillas y servicio para llevar.',
    hours: 'Hoy: 12:00 p. m. – 10:00 p. m.', menu: [
      { name: 'Pizza de cuatro quesos', detail: 'Mozzarella, provolone, parmesano y azul', price: '$10.00' },
      { name: 'Pizza de vegetales', detail: 'Vegetales de temporada', price: '$8.50' },
      { name: 'Soda', detail: 'Lata', price: '$1.50' },
    ], reviews: [
      { author: 'Elena T.', score: '4.5', text: 'Buena opción para pedir para llevar.' },
      { author: 'Luis F.', score: '4.0', text: 'Precios accesibles y servicio rápido.' },
    ], color: 'plum', initials: 'PC',
  },
];

function filterRestaurants(items, options = {}) {
  const query = String(options.query || '').trim().toLocaleLowerCase();
  const category = options.category || 'Todas';
  return items.filter((restaurant) => {
    const matchesCategory = category === 'Todas' || restaurant.category === category;
    const searchable = [restaurant.name, restaurant.category, restaurant.city, restaurant.neighborhood, restaurant.address, restaurant.description]
      .filter(Boolean).join(' ').toLocaleLowerCase();
    return matchesCategory && (!query || searchable.includes(query));
  });
}

function createSubmission(input = {}) {
  return {
    id: (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function')
      ? globalThis.crypto.randomUUID()
      : `submission-${Date.now()}`,
    name: String(input.name || '').trim(),
    category: String(input.category || '').trim(),
    address: String(input.address || '').trim(),
    city: String(input.city || '').trim(),
    description: String(input.description || '').trim(),
    status: 'pendiente',
    createdAt: new Date().toISOString(),
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { filterRestaurants, createSubmission, demoRestaurants: restaurants };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#restaurant-grid');
    const search = document.querySelector('#search-input');
    const categoryList = document.querySelector('#category-list');
    const resultCount = document.querySelector('#result-count');
    const emptyState = document.querySelector('#empty-state');
    const detailDialog = document.querySelector('#restaurant-dialog');
    const addDialog = document.querySelector('#add-dialog');
    const contributionForm = document.querySelector('#contribution-form');
    const toast = document.querySelector('#toast');
    const dbIndicator = document.querySelector('#db-status-indicator');

    let currentRestaurants = [...restaurants];
    let selectedCategory = 'Todas';
    let toastTimer;
    let isConnectedToApi = false;

    const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[character]);

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4000);
    }

    function renderCategories() {
      categoryList.innerHTML = categories.map((category) => `
        <button class="category-chip${category === selectedCategory ? ' is-active' : ''}" type="button" data-category="${escapeHtml(category)}" aria-pressed="${category === selectedCategory}">
          ${category === 'Todas' ? '<span class="chip-dot chip-all"></span>' : `<span class="chip-dot chip-${category.toLocaleLowerCase()}"></span>`}
          ${escapeHtml(category)}
        </button>`).join('');
    }

    function restaurantCard(restaurant) {
      return `
        <article class="restaurant-card">
          <button class="card-open" type="button" data-open="${escapeHtml(restaurant.id)}" aria-label="Ver detalles de ${escapeHtml(restaurant.name)}">
            <div class="card-cover cover-${escapeHtml(restaurant.color || 'sand')}">
              <span class="cover-category">${escapeHtml(restaurant.category)}</span>
              <span class="cover-monogram" aria-hidden="true">${escapeHtml(restaurant.initials || 'MC')}</span>
              <span class="cover-price">${escapeHtml(restaurant.price || '$$')}</span>
            </div>
            <div class="card-body">
              <div class="card-title-row"><h3>${escapeHtml(restaurant.name)}</h3><span class="rating"><span aria-hidden="true">★</span> ${escapeHtml(restaurant.rating)}</span></div>
              <p class="card-location">${escapeHtml(restaurant.neighborhood || '')}${restaurant.neighborhood && restaurant.city ? ' · ' : ''}${escapeHtml(restaurant.city || '')}</p>
              <p class="card-description">${escapeHtml(restaurant.description || '')}</p>
              <span class="card-foot">Ver menú y reseñas (${restaurant.reviewCount || 0}) <span aria-hidden="true">↗</span></span>
            </div>
          </button>
        </article>`;
    }

    function renderRestaurants() {
      const visibleRestaurants = filterRestaurants(currentRestaurants, { query: search.value, category: selectedCategory });
      grid.innerHTML = visibleRestaurants.map(restaurantCard).join('');
      resultCount.textContent = `${visibleRestaurants.length} ${visibleRestaurants.length === 1 ? 'lugar' : 'lugares'}`;
      emptyState.hidden = visibleRestaurants.length > 0;
      grid.hidden = visibleRestaurants.length === 0;
    }

    async function loadRestaurantsFromApi() {
      try {
        const response = await fetch('/api/restaurants');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            currentRestaurants = data;
            isConnectedToApi = true;
            if (dbIndicator) {
              dbIndicator.innerHTML = '<span class="db-badge-dot"></span> SQLite Conectado';
              dbIndicator.style.background = '#e8efe5';
              dbIndicator.style.color = '#31542c';
            }
          }
        }
      } catch (e) {
        console.info('API no disponible, usando datos locales de demostración.');
        if (dbIndicator) {
          dbIndicator.innerHTML = '<span class="db-badge-dot" style="background:#b89230;box-shadow:none;"></span> Modo Local';
          dbIndicator.style.background = '#fef9e7';
          dbIndicator.style.color = '#7d6608';
        }
      }
      renderRestaurants();
    }

    async function openRestaurant(id) {
      let restaurant = currentRestaurants.find((item) => item.id === id);
      if (!restaurant) return;

      // Try fetching full details with fresh menu & reviews from API
      if (isConnectedToApi) {
        try {
          const res = await fetch(`/api/restaurants/${id}`);
          if (res.ok) {
            restaurant = await res.json();
            // sync with currentRestaurants
            const index = currentRestaurants.findIndex((r) => r.id === id);
            if (index !== -1) currentRestaurants[index] = restaurant;
          }
        } catch (e) {
          console.warn('No se pudo refrescar desde API:', e);
        }
      }

      const menu = restaurant.menu || [];
      const reviews = restaurant.reviews || [];

      document.querySelector('#detail-content').innerHTML = `
        <div class="detail-cover cover-${escapeHtml(restaurant.color || 'sand')}">
          <span class="cover-category">${escapeHtml(restaurant.category)}</span>
          <span class="detail-monogram">${escapeHtml(restaurant.initials || 'MC')}</span>
        </div>
        <div class="detail-heading">
          <div>
            <p class="eyebrow">${escapeHtml(restaurant.neighborhood || '')} · ${escapeHtml(restaurant.city || '')}</p>
            <h2 id="detail-title">${escapeHtml(restaurant.name)}</h2>
          </div>
          <span class="rating detail-rating"><span aria-hidden="true">★</span> ${escapeHtml(restaurant.rating)} <small id="modal-review-count">(${restaurant.reviewCount || reviews.length} reseñas)</small></span>
        </div>
        <p class="detail-description">${escapeHtml(restaurant.description || '')}</p>
        <div class="detail-info">
          <div>
            <span class="info-label">Dirección</span>
            <p>${escapeHtml(restaurant.address || 'No especificada')}</p>
            <div class="map-links">
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + (restaurant.address || '') + ' ' + (restaurant.city || ''))}" target="_blank" rel="noopener noreferrer" class="map-btn map-btn-google" title="Abrir en Google Maps">
                📍 Google Maps ↗
              </a>
              <a href="https://waze.com/ul?q=${encodeURIComponent(restaurant.name + ' ' + (restaurant.address || '') + ' ' + (restaurant.city || ''))}&navigate=yes" target="_blank" rel="noopener noreferrer" class="map-btn map-btn-waze" title="Navegar con Waze">
                🚗 Waze ↗
              </a>
            </div>
          </div>
          <div><span class="info-label">Horario</span><p>${escapeHtml(restaurant.hours || 'Consultar en el local')}</p></div>
        </div>

        <section class="detail-section">
          <div class="section-heading">
            <h3>Del menú (${menu.length})</h3>
            <span class="muted">Platillos registrados</span>
          </div>
          <div class="menu-list" id="modal-menu-list">
            ${menu.length === 0 ? '<p class="muted" style="padding:10px 0;">Aún no hay platillos registrados en el menú.</p>' : menu.map((dish) => `
              <div class="menu-item">
                <div><strong>${escapeHtml(dish.name)}</strong><p>${escapeHtml(dish.detail || '')}</p></div>
                <span>${escapeHtml(dish.price || '')}</span>
              </div>`).join('')}
          </div>

          <details class="add-subitem-details">
            <summary class="add-subitem-toggle">+ Agregar platillo a este menú</summary>
            <form class="subitem-form" id="form-add-menu" data-restaurant-id="${escapeHtml(restaurant.id)}" style="margin-top:10px;">
              <div class="form-grid">
                <input name="dishName" placeholder="Nombre del platillo (ej. Pizza Margarita)" required maxlength="80">
                <input name="dishPrice" placeholder="Precio (ej. $8.50)" required maxlength="20">
              </div>
              <input name="dishDetail" placeholder="Ingredientes o descripción breve" maxlength="150">
              <button class="button button-dark" type="submit" style="justify-self:start;min-height:36px;padding:0 14px;">Guardar platillo</button>
            </form>
          </details>
        </section>

        <section class="detail-section">
          <div class="section-heading">
            <h3>Lo que cuentan (${reviews.length})</h3>
            <span class="muted">Reseñas de la comunidad</span>
          </div>
          <div class="review-list" id="modal-review-list">
            ${reviews.length === 0 ? '<p class="muted" style="padding:10px 0;">Sé el primero en dejar una reseña.</p>' : reviews.map((rev) => `
              <article class="review">
                <div class="review-top">
                  <strong>${escapeHtml(rev.author)} <span class="review-date">${rev.created_at ? new Date(rev.created_at).toLocaleDateString() : ''}</span></strong>
                  <span class="rating"><span aria-hidden="true">★</span> ${escapeHtml(rev.score)}</span>
                </div>
                <p>${escapeHtml(rev.text)}</p>
              </article>`).join('')}
          </div>

          <div class="add-review-box">
            <h4>Escribe una reseña</h4>
            <form class="subitem-form" id="form-add-review" data-restaurant-id="${escapeHtml(restaurant.id)}">
              <div class="form-grid">
                <input name="author" placeholder="Tu nombre" required maxlength="50">
                <select name="score" required>
                  <option value="5.0">★★★★★ (5.0 Excelente)</option>
                  <option value="4.5">★★★★☆ (4.5 Muy bueno)</option>
                  <option value="4.0">★★★★☆ (4.0 Bueno)</option>
                  <option value="3.5">★★★☆☆ (3.5 Regular)</option>
                  <option value="3.0">★★★☆☆ (3.0 Aceptable)</option>
                  <option value="2.0">★★☆☆☆ (2.0 Mejorable)</option>
                  <option value="1.0">★☆☆☆☆ (1.0 Malo)</option>
                </select>
              </div>
              <textarea name="text" rows="2" placeholder="¿Qué platillo recomiendas? ¿Cómo estuvo el servicio?" required maxlength="300"></textarea>
              <button class="button button-dark" type="submit" style="justify-self:start;min-height:36px;padding:0 16px;">Publicar reseña</button>
            </form>
          </div>
        </section>
      `;

      // Attach listener for adding dish
      const menuForm = document.querySelector('#form-add-menu');
      if (menuForm) {
        menuForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const dishName = menuForm.dishName.value.trim();
          const dishPrice = menuForm.dishPrice.value.trim();
          const dishDetail = menuForm.dishDetail.value.trim();
          if (!dishName || !dishPrice) return;

          if (isConnectedToApi) {
            try {
              const res = await fetch(`/api/restaurants/${restaurant.id}/menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: dishName, price: dishPrice, detail: dishDetail }),
              });
              if (res.ok) {
                const newDish = await res.json();
                if (!restaurant.menu) restaurant.menu = [];
                restaurant.menu.push(newDish);
                showToast(`¡Platillo "${dishName}" agregado al menú en SQLite!`);
                openRestaurant(restaurant.id);
                return;
              }
            } catch (err) {
              console.error(err);
            }
          }

          // Fallback if not connected to server
          if (!restaurant.menu) restaurant.menu = [];
          restaurant.menu.push({ name: dishName, price: dishPrice, detail: dishDetail });
          showToast(`Platillo guardado localmente.`);
          openRestaurant(restaurant.id);
        });
      }

      // Attach listener for adding review
      const reviewForm = document.querySelector('#form-add-review');
      if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const author = reviewForm.author.value.trim();
          const score = reviewForm.score.value;
          const text = reviewForm.text.value.trim();
          if (!author || !text) return;

          if (isConnectedToApi) {
            try {
              const res = await fetch(`/api/restaurants/${restaurant.id}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, score, text }),
              });
              if (res.ok) {
                const data = await res.json();
                showToast('¡Tu reseña fue guardada en la base de datos SQLite!');
                await loadRestaurantsFromApi();
                openRestaurant(restaurant.id);
                return;
              }
            } catch (err) {
              console.error(err);
            }
          }

          // Fallback if offline
          if (!restaurant.reviews) restaurant.reviews = [];
          restaurant.reviews.unshift({ author, score, text, created_at: new Date().toISOString() });
          restaurant.reviewCount = (restaurant.reviewCount || 0) + 1;
          showToast('Reseña agregada localmente.');
          renderRestaurants();
          openRestaurant(restaurant.id);
        });
      }

      detailDialog.showModal();
    }

    categoryList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      selectedCategory = button.dataset.category;
      renderCategories();
      renderRestaurants();
    });

    search.addEventListener('input', renderRestaurants);
    document.querySelector('#clear-search').addEventListener('click', () => {
      search.value = '';
      selectedCategory = 'Todas';
      renderCategories();
      renderRestaurants();
      search.focus();
    });

    grid.addEventListener('click', (event) => {
      const button = event.target.closest('[data-open]');
      if (button) openRestaurant(button.dataset.open);
    });

    document.querySelectorAll('[data-close-dialog]').forEach((button) => {
      button.addEventListener('click', () => button.closest('dialog').close());
    });
    const osmDialog = document.querySelector('#osm-dialog');
    const osmSearchForm = document.querySelector('#osm-search-form');
    const osmResults = document.querySelector('#osm-results');
    const osmResultsStatus = document.querySelector('#osm-results-status');

    document.querySelectorAll('[data-open-osm]').forEach((button) => {
      button.addEventListener('click', () => {
        if (osmDialog) osmDialog.showModal();
      });
    });

    if (osmSearchForm) {
      osmSearchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = osmSearchForm.query.value.trim();
        if (!query) return;

        osmResultsStatus.textContent = 'Buscando en OpenStreetMap (libre y gratis)...';
        osmResults.innerHTML = '';

        try {
          const res = await fetch(`/api/osm/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();

          if (!res.ok) {
            osmResultsStatus.textContent = `❌ ${data.error || 'Error al buscar en OpenStreetMap'}`;
            return;
          }

          if (data.length === 0) {
            osmResultsStatus.textContent = 'No se encontraron lugares con esa búsqueda. Prueba con otra zona o nombre.';
            return;
          }

          osmResultsStatus.textContent = `Se encontraron ${data.length} lugares en el mapa:`;
          osmResults.innerHTML = data.map((item, idx) => `
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px;border:1px solid #e5e3db;background:#fff;">
              <div style="flex:1;">
                <div style="display:flex;align-items:baseline;gap:8px;">
                  <strong style="font-family:var(--serif);font-size:14px;">${escapeHtml(item.name)}</strong>
                  <span style="font-size:11px;color:#c28e46;">★ 4.8</span>
                </div>
                <p style="margin:3px 0 0;font-size:11px;color:#77796e;">${escapeHtml(item.address)}</p>
                <span style="display:inline-block;margin-top:4px;font-size:9px;font-weight:700;padding:2px 6px;background:#f3f1e8;color:#55584d;">${escapeHtml(item.category)} · ${escapeHtml(item.price)}</span>
              </div>
              <button class="button button-dark btn-import-osm" data-index="${idx}" style="min-height:34px;padding:0 12px;font-size:10px;white-space:nowrap;">
                Importar a SQLite
              </button>
            </div>
          `).join('');

          // Bind import buttons
          document.querySelectorAll('.btn-import-osm').forEach((btn) => {
            btn.addEventListener('click', async () => {
              const place = data[parseInt(btn.dataset.index, 10)];
              if (!place) return;

              btn.disabled = true;
              btn.textContent = 'Guardando...';

              try {
                const importRes = await fetch('/api/osm/import', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(place),
                });

                if (importRes.ok) {
                  const imported = await importRes.json();
                  btn.textContent = '✓ Guardado';
                  btn.style.background = '#2e7d32';
                  showToast(`¡"${imported.name}" importado con menú a SQLite!`);
                  await loadRestaurantsFromApi();
                } else {
                  const errData = await importRes.json();
                  btn.disabled = false;
                  btn.textContent = 'Error';
                  showToast(`Error al guardar: ${errData.error || ''}`);
                }
              } catch (err) {
                btn.disabled = false;
                btn.textContent = 'Reintentar';
                showToast('Error de conexión.');
              }
            });
          });
        } catch (err) {
          osmResultsStatus.textContent = 'Error al comunicarse con el servidor.';
        }
      });
    }

    [detailDialog, addDialog, osmDialog].filter(Boolean).forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
      });
    });

    document.querySelectorAll('[data-open-add]').forEach((button) => {
      button.addEventListener('click', () => addDialog.showModal());
    });

    contributionForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!contributionForm.reportValidity()) return;
      const formData = new FormData(contributionForm);
      const values = Object.fromEntries(formData.entries());

      if (isConnectedToApi) {
        try {
          const res = await fetch('/api/restaurants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });
          if (res.ok) {
            contributionForm.reset();
            addDialog.close();
            showToast('¡Restaurante guardado exitosamente en la base de datos SQLite!');
            await loadRestaurantsFromApi();
            return;
          }
        } catch (e) {
          console.error('Error al guardar en API:', e);
        }
      }

      // Offline fallback
      const submission = createSubmission(values);
      try {
        const pending = JSON.parse(localStorage.getItem('mesa-cercana-pending') || '[]');
        pending.push(submission);
        localStorage.setItem('mesa-cercana-pending', JSON.stringify(pending));
      } catch (error) {
        showToast('No se pudo guardar en este navegador. Intenta de nuevo.');
        return;
      }
      contributionForm.reset();
      addDialog.close();
      showToast('Aporte guardado localmente en este navegador.');
    });

    renderCategories();
    renderRestaurants();
    loadRestaurantsFromApi();
  });
}

