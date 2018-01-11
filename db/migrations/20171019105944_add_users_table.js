exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary().notNullable()
    table.string('username').notNullable().unique('username')
    table.string('password').notNullable()
    table.string('email').notNullable().unique('email')
    table.string('role').notNullable().defaultTo('user')
    table.unique(['username', 'email'])
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
