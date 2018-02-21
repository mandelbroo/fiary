exports.up = (knex, Promise) => {
	return knex.schema.createTable('records_tags', (table) => {
		table.increments('id').primary().notNullable()
		table.integer('record_id').notNullable()
		table.integer('tag_id').notNullable()
		table.foreign('record_id').references('records.id')
		table.foreign('tag_id').references('tags.id')
		table.timestamps()
	})
}

exports.down = (knex, Promise) => {
	return knex.schema.alterTable('records_tags', (table) => {
			table.dropForeign('record_id')
			table.dropForeign('tag_id')
		})
		.then(() => {
			return knex.schema.dropTable('records_tags')
		})
}
