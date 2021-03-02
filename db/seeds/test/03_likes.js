
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        { user_id: 1, peep_id: 2 },
        { user_id: 2, peep_id: 3 },
        { user_id: 3, peep_id: 1 }
      ])
    })
}
