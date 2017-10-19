exports.up = (knex, Promise) => {
  return knex.schema.createTable('entries_records', (table) => {
    table.increments('id').primary().notNullable()
    table.integer('entry_id').notNullable()
    table.integer('record_id').notNullable()
    table.foreign('entry_id').references('entries.id')
    table.foreign('record_id').references('records.id')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.alterTable('entries_records', (table) => {
      table.dropForeign('entry_id')
      table.dropForeign('record_id')
    }),
    knex.schema.dropTable('entries_records')
  ])
}
