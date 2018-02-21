exports.up = (knex, Promise) => {
	return knex.schema.createTable('tags', (table) => {
		table.increments('id').primary().notNullable()
		table.string('name').notNullable().unique('name')
		table.timestamps()
	})
}

exports.down = (knex, Promise) => {
	return knex.schema.dropTable('tags')
}
