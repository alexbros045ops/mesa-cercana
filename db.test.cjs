const test = require('node:test');
const assert = require('node:assert/strict');
const db = require('./database');

test('database loads restaurants from seed', () => {
  const restaurants = db.getAllRestaurants();
  assert.ok(restaurants.length >= 6, 'Should have at least 6 seed restaurants');
  const brasa = restaurants.find(r => r.name === 'Brasa Norte');
  assert.ok(brasa, 'Brasa Norte should exist');
  assert.equal(brasa.category, 'Carnes');
});

test('database retrieves restaurant with menu and reviews', () => {
  const brasa = db.getRestaurantById('brasa-norte');
  assert.ok(brasa, 'Should find Brasa Norte by id');
  assert.ok(Array.isArray(brasa.menu), 'Menu should be an array');
  assert.ok(brasa.menu.length >= 3, 'Should have at least 3 menu dishes');
  assert.ok(Array.isArray(brasa.reviews), 'Reviews should be an array');
  assert.ok(brasa.reviews.length >= 2, 'Should have reviews');
});

test('database creates a new restaurant and adds menu and review', () => {
  const newRest = db.createRestaurant({
    name: 'Pupusería El Buen Gusto',
    category: 'Otra',
    city: 'San Salvador',
    address: 'Calle Los Planes #4',
    price: '$',
    description: 'Pupusas tradicionales revueltas y de queso con loroco.',
  });

  assert.ok(newRest.id, 'Restaurant should have an ID');
  assert.equal(newRest.name, 'Pupusería El Buen Gusto');

  // Add menu item
  const dish = db.addMenuItem(newRest.id, {
    name: 'Pupusa revuelta',
    detail: 'Chicharrón, frijoles y queso',
    price: '$1.25',
  });
  assert.equal(dish.name, 'Pupusa revuelta');

  // Add review
  const review = db.addReview(newRest.id, {
    author: 'Carlos E.',
    score: 5.0,
    text: 'Las mejores pupusas de la zona.',
  });
  assert.equal(review.score, 5.0);

  // Verify updated restaurant
  const updated = db.getRestaurantById(newRest.id);
  assert.equal(updated.menu.length, 1);
  assert.equal(updated.reviews.length, 1);
  assert.equal(updated.rating, 5.0);
});
