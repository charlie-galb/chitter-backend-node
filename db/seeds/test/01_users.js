const bcrypt = require('bcrypt')

exports.seed = function (knex, Promise) {
  const hash = bcrypt.hashSync('password', saltRounds = 10)
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
    // Inserts seed entries
      return knex('users').insert([
        {
          handle: 'nigel',
          password: hash
        },
        {
          handle: 'nakaz',
          password: hash
        },
        {
          handle: 'jaywon',
          password: hash
        }
      ])
    })
}
