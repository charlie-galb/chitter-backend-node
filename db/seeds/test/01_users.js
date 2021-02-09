const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  const hash = bcrypt.hashSync("password", saltRounds = 10)
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        handle: 'nigel',
        password: hash
      },
      {
        id: 2,
        handle: 'nakaz',
        password: hash
      },
      {
        id: 3,
        handle: 'jaywon',
        password: hash
      }
    ]);
  });
};