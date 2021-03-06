
exports.up = function (knex) {
  return knex.schema.createTable('peeps', function (table) {
    table.increments()
    table.string('body').notNullable()
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('peeps')
}
