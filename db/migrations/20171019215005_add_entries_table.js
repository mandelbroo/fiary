exports.up = (knex, Promise) => {
  return knex.schema.createTable('entries', (table) => {
    table.increments('id').primary().notNullable()
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id')
    table.string('day').notNullable()
    table.unique(['day', 'user_id'])
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.alterTable('entries', (table) => {
      table.dropForeign('user_id')
    }),
    knex.schema.dropTable('entries')
  ])
}
