
exports.up = function (knex) {
  return knex.schema.createTable('likes', function (table) {
    table.increments()
    table.unique(['user_id', 'peep_id'])
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.integer('peep_id').notNullable().references('id').inTable('peeps').onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('likes')
}
