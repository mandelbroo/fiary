const Record  = require('../models/record')
const knex    = require('../../db/connection')

class RecordsServiceError extends Error {
  static get dataIsEmpty() {return 'data is empty'}
  static get tagsNotProvided() {return 'tags not provided'}
}

module.exports = {
  Error: RecordsServiceError,
  execute: (record) => new Promise((resolve, reject) => {
    const err = validate(record)
    if (err)
      reject(err)
    return create(record)
      .then(record => resolve(record))
      .catch(err => reject(err))
  })
}

function validate(data) {
  if (!data || Object.keys(data).length === 0)
    return new RecordsServiceError(RecordsServiceError.dataIsEmpty)
  if (!data.tags || data.tags.length === 0)
    return new RecordsServiceError(RecordsServiceError.tagsNotProvided)
}

async function create(data) {
  const attrs = {
    amount: data.amount,
    entryId: data.entryId,
    kind: data.income ? 'income' : 'expense'
  }
  const record = await Record.create(attrs)
  await saveTags(record, data.tags)
  const tags = await record.tags().fetch()
  return {
    id: record.id,
    entryId: record.entryId,
    income: record.income,
    amount: record.amount,
    tags: tags.map(t => ({id: t.id, name: t.name }))
  }
}

async function saveTags(record, tags) {
  const unsaved = tags
    .filter(t => !(t.id > 1))
    .map(t => ({name: t.name}))

  const saved = unsaved.length > 0
    ? await knex('tags').insert(unsaved).returning(['id', 'name'])
    : []

  const recordsTags = tags
    .filter(t => t.id > 0)
    .concat(saved)
    .map(t => ({record_id: record.id, tag_id: t.id}))

  return knex('records_tags').insert(recordsTags)
}
