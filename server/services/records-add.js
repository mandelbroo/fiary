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
  execute: (entry) => new Promise((resolve, reject) => {
    const err = validate(entry)
    if (err) {
      reject(err)
    }
    if (entry.id) {
      return recordsCreate(entry.records, entry.id)
        .then(records => {
          entry.records = records
          return entry
        })
        .then(entry => resolve(entry))
        .catch(err => reject(err))
    } else {
      return Entry.create({userId: entry.user.id, day: entry.day})
        .then(newEntry => recordsCreate(entry.records, newEntry.id)
            .then(records => {
              newEntry.records = records
              return newEntry
            })
            .then(entry => resolve(entry))
            .catch(err => reject(err)))
        .catch(err => reject(err))
    }
  })
}

function validate(entry) {
  if (!entry || Object.keys(entry).length === 0)
    return new RecordsServiceError(RecordsServiceError.dataIsEmpty)
  if (!entry.records || entry.records.length === 0)
    return new RecordsServiceError(RecordsServiceError.notRecordsProvided)
  if (!entry.user || !entry.user.id)
    return new RecordsServiceError(RecordsServiceError.userNotProvided)
}

async function recordsCreate(records, entryId) {
  let promises = []
  let unsavedTags = []
  let mapObject = []
  for (rec of records) {
    const attrs = {
      entryId: entryId,
      amount: rec.amount,
      kind: rec.income ? 'income' : 'expense'
    }
    unsavedTags = unsavedTags.concat(rec.tags.filter(tag => tag.id < 0))
    let promise = Record.create(attrs)
    promises.push(promise)
    mapObject.push({
      id: (await promise).id,
      tags: rec.tags
    })
  }

  const unique = unsavedTags
    .map(tag => tag.name)
    .filter((tag, index, arr) => arr.indexOf(tag) === index)
  const forSave = unique.map(name => ({name: name}))
  const savedTags = await knex('tags').insert(forSave).returning(['id', 'name'])

  return Promise.all(promises)
    .then(async (resolvedRecords) => {
      for (rec of mapObject) {
        for (tag of rec.tags) {
          if (tag.id > 0) {
            await RecTag.create({recordId: rec.id, tagId: tag.id})
          } else if (savedTags.length) {
            const found = savedTags.find(saved => tag.name === saved.name)
            await RecTag.create({recordId: rec.id, tagId: found.id})
          }
        }
      }
      return resolvedRecords
    })
}
