const test = require('node:test');
const assert = require('node:assert/strict');
const { filterRestaurants, createSubmission, demoRestaurants } = require('./app.js');

test('filterRestaurants finds restaurants by name without case sensitivity', () => {
  const restaurants = [
    { name: 'La Forchetta', category: 'Pizza', city: 'San José' },
    { name: 'Brasa Norte', category: 'Carnes', city: 'Heredia' },
  ];

  assert.deepEqual(
    filterRestaurants(restaurants, { query: 'forchetta', category: 'Todas' }).map((item) => item.name),
    ['La Forchetta'],
  );
});

test('filterRestaurants combines category and query filters', () => {
  const restaurants = [
    { name: 'Pizza Central', category: 'Pizza', city: 'San José' },
    { name: 'Pizza del Valle', category: 'Pizza', city: 'Heredia' },
    { name: 'Brasa Central', category: 'Carnes', city: 'San José' },
  ];

  assert.deepEqual(
    filterRestaurants(restaurants, { query: 'central', category: 'Pizza' }).map((item) => item.name),
    ['Pizza Central'],
  );
});

test('createSubmission marks new contributions as pending review', () => {
  const submission = createSubmission({
    name: 'Café de Prueba',
    category: 'Cafetería',
    address: 'Calle Ejemplo 10',
    city: 'San José',
  });

  assert.equal(submission.name, 'Café de Prueba');
  assert.equal(submission.status, 'pendiente');
  assert.ok(submission.id);
  assert.ok(submission.createdAt);
});

test('demo restaurant records use San Salvador as their city', () => {
  assert.ok(demoRestaurants.length > 0);
  assert.ok(demoRestaurants.every((restaurant) => restaurant.city === 'San Salvador'));
});
