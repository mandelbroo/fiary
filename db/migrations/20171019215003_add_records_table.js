exports.up = (knex, Promise) => {
  return knex.schema.createTable('records', (table) => {
    table.increments('id').primary().notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.enum('kind', ['income', 'expense']).notNullable()
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('records')
}
