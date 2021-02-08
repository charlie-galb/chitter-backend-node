exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        handle: 'nigel',
        password: 'dorwssap'
      },
      {
        id: 2,
        handle: 'nakaz',
        password: 'password1'
      },
      {
        id: 3,
        handle: 'jaywon',
        password: 'password123'
      }
    ]);
  });
};