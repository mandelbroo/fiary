const {Entry, Record} = require('../models')

class RecordsServiceError extends Error {
  static get dataIsEmpty() {return 'data is empty'}
  static get notRecordsProvided() {return 'no records provided'}
  static get userNotProvided() {return 'user not provided'}
}

module.exports = {
  recordsAdd: (data) => {
    return new Promise((resolve, reject) => {
      const err = validate(data)
      if (err) reject(err)
      if (data.entry) {
        recordsCreate(data.records, data.entry)
          .then(entry => resolve(entry))
          .catch(err => reject(err))
      } else {
        Entry.create({userId: data.user.id})
        .then(entry => {
          recordsCreate(data.records, entry)
            .then(entry => resolve(entry))
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
      }
    })
  },
  getTodayEntry: (user) => {
    return todayEntry(user)
  },
  RecordsServiceError: RecordsServiceError
}

function todayEntry(user) {
  return Entry.where({user_id: user.id}).fetch()
}

function validate(data) {
  if (!data || Object.keys(data).length === 0)
    return new RecordsServiceError(RecordsServiceError.dataIsEmpty)
  if (!data.records || data.records.length === 0)
    return new RecordsServiceError(RecordsServiceError.notRecordsProvided)
  if (!data.user || !data.user.id)
    return new RecordsServiceError(RecordsServiceError.userNotProvided)
}

function recordsCreate(records, entry) {
  const promises = []
  for(let rec of records) {
    const attrs = {
      entryId: entry.id,
      amount: rec.amount,
      kind: rec.income ? 'income' : 'expense'}
    promises.push(Record.create(attrs))
  }
  return Promise.all(promises)
    .then((records) => {
      entry.records = records
      return entry
    })

}
