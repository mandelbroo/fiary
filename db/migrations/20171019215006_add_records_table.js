exports.up = (knex, Promise) => {
  return knex.schema.createTable('records', (table) => {
    table.increments('id').primary().notNullable()
    table.integer('entry_id').notNullable()
    table.foreign('entry_id').references('entries.id')
    table.boolean('income').notNullable().default(false)
    table.decimal('amount', 10, 2).notNullable()
    table.decimal('quantity', 10, 2).notNullable().default(1)
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.alterTable('records', (table) => {
      table.dropForeign('entry_id')
    }),
    knex.schema.dropTable('records')
  ])
}
