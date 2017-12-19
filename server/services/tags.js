const knex = require('../../db/connection')
const Tag = require('../models/tag')

module.exports = {
  post: async (data) => {
    return (
      await knex('tags')
        .insert(data)
        .returning(['id', 'name'])
    )
    .map(tag => Tag.forge(tag))
  },
  get: async (fieldName, values) => {
    return (
      await knex('tags')
        .whereIn(fieldName, values)
        .returning(['id', 'name'])
      )
      .map(tag => Tag.forge(tag))
  }
}
