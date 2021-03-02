
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.string('handle').unique().notNullable()
    table.string('password').notNullable()
    table.string('auth_token')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
