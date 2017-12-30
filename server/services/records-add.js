const Entry   = require('../models/entry')
const Record  = require('../models/record')
const RecTag  = require('../models/record-tag')
const Tag     = require('../models/tag')
const User    = require('../models/user')
const knex    = require('../../db/connection')

class RecordsServiceError extends Error {
  static get dataIsEmpty() {return 'data is empty'}
  static get notRecordsProvided() {return 'no records provided'}
  static get userNotProvided() {return 'user not provided'}
}

module.exports = {
  Error: RecordsServiceError,
  execute: (data) => new Promise((resolve, reject) => {
    const err = validate(data)
    if (err) {
      reject(err)
    }
    if (data.entry) {
      return recordsCreate(data.records, data.entry)
        .then(entry => resolve(entry))
        .catch(err => reject(err))
    } else {
      return Entry.create({userId: data.user.id})
        .then(entry => {
          return recordsCreate(data.records, entry)
            .then(entry => resolve(entry))
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    }
  })
}

function validate(data) {
  if (!data || Object.keys(data).length === 0)
    return new RecordsServiceError(RecordsServiceError.dataIsEmpty)
  if (!data.records || data.records.length === 0)
    return new RecordsServiceError(RecordsServiceError.notRecordsProvided)
  if (!data.user || !data.user.id)
    return new RecordsServiceError(RecordsServiceError.userNotProvided)
}

async function recordsCreate(data, entry) {
  let promises = []
  let unsaved = []
  let mapObject = []
  for(let rec of data) {
    const attrs = {
      entryId: entry.id,
      amount: rec.amount,
      kind: rec.income ? 'income' : 'expense'
    }
    unsaved = unsaved.concat(rec.tags.filter(tag => tag.id < 0))
    let promise = Record.create(attrs)
    promises.push(promise)
    mapObject.push({
      id: (await promise).id,
      tags: rec.tags
    })
  }

  const unique = unsaved
    .map(tag => tag.name)
    .filter((tag, index, arr) => arr.indexOf(tag) === index)
  const forSave = unique.map(name => ({name: name}))
  const savedTags = await knex('tags').insert(forSave).returning(['id', 'name'])

  return Promise.all(promises)
    .then(async (records) => {
      entry.records = records
      for(rec of mapObject) {
        for(tag of rec.tags) {
          if (tag.id > 0) {
            await RecTag.create({recordId: rec.id, tagId: tag.id})
          } else if (savedTags.length) {
            const found = savedTags.find(saved => tag.name === saved.name)
            await RecTag.create({recordId: rec.id, tagId: found.id})
          }
        }
      }
      return entry
    })
}
