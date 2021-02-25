
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('peeps').del()
    .then(function () {
      // Inserts seed entries
      return knex('peeps').insert([
        {body: 'test peep 1', user_id: 1},
        {body: 'test peep 2', user_id: 2},
        {body: 'test peep 3', user_id: 3}
      ]);
    });
};
