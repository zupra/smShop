const faker = require('faker/locale/ru');
// faker.locale = "ru";
const createFakeDishes = () => ({
  name: faker.commerce.productName(),
  description: faker.lorem.sentence(12),
  price: faker.commerce.price(),
  khimki: faker.random.boolean(),
  korolev: faker.random.boolean(),
  moscow: faker.random.boolean()
});

exports.seed = async function(knex) {
  const fakeDishes = [];
  const MAX = 120;
  for (let i = 0; i < MAX; i++) {
    fakeDishes.push(createFakeDishes());
  }
  await knex('dishes').insert(fakeDishes);
};

/*
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
*/
