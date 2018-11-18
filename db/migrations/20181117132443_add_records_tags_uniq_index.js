exports.up = (knex) =>
  knex.schema.alterTable('records_tags', (table) => {
    table.unique(['record_id', 'tag_id'])
  })

exports.down = (knex) =>
  knex.schema.alterTable('records_tags', (table) => {
    table.dropIndex(['record_id', 'tag_id'])
  })
