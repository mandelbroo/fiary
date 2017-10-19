exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary().notNullable()
    table.string('username').notNullable()
    table.string('password').notNullable()
    table.string('email').notNullable()
    table.string('role').notNullable().defaultTo('user')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
