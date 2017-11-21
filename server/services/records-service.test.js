const {recordsAdd, getTodayEntry, RecordsServiceError} = require('./records-service')
const {Entry, Record, User} = require('../models')

describe('recordsAdd({records: [], user: {}, entry: {}})', () => {
  beforeAll(done => {
    User.create({
      username: 'creator',
      email: 'cre@tor',
      password: 'pass'
    })
    .then(user => citizen = user)
    .then(() => done())
  })

  it('creates new entry when it is not provided', done => {
    expect.assertions(4)
    let data = {
      records:[
        {amount: 10, tags:['bus'], kind: 'expense'},
        {amount: 25000, tags:['salary'], kind: 'income'}
      ],
      user: citizen
    }
    recordsAdd(data)
      .then(entry => {
        expect(entry).toBeDefined()
        expect(entry).toHaveProperty('id')
        Record.where({entry_id: entry.id})
          .fetchAll()
          .then((records) => {
            expect(records).toBeDefined()
            expect(records.length).toEqual(2)
            done()
          })
      })
  })
  it('add records to provided entry', done => {
    Entry.create({userId: citizen.id})
      .then(entry => {
        recordsAdd({
          records:[
            {amount: 20, tags:['beer']},
            {amount: 10, tags:['Yulia', 'returned'], income: true}
          ],
          entry: entry,
          user: citizen
        })
        .then(newEntry => {
          expect(newEntry).toHaveProperty('id')
          expect(newEntry.id).toEqual(entry.id)
          done()
        })
      })
  })
  it('error when empty object passed', done => {
    expect.assertions(2)
    recordsAdd({ })
      .then(entry => expect(true).toBeTruthy()) // expecting to not execute
      .catch(err => {
        expect(err).toBeDefined()
        expect(err.message).toBe('data is empty')
        done()
      })
  })
  it('error when there are 0 records', done => {
    expect.assertions(2)
    recordsAdd({records:[], user: citizen})
      .then(entry => expect(true).toBeTruthy()) // expecting to not execute
      .catch(err => {
        expect(err).toBeDefined()
        expect(err.message).toBe('no records provided')
        done()
      })
  })
  it('error when user not provided', done => {
    expect.assertions(2)
    recordsAdd({records: [{}]})
      .then(entry => expect(true).toBeTruthy()) // expecting to not execute
      .catch(err => {
        expect(err).toBeDefined()
        expect(err.message).toBe('user not provided')
        done()
      })
  })
})

describe('getTodayEntry(user)', () => {
  beforeAll(done => {
    User.create({
      username: 'todayer',
      email: 'tod@yer',
      password: 'pass'
    })
    .then(user => citizen = user)
    .then(() => done())
  })

  it("return today's user entry", done => {
    recordsAdd({
      records:[{amount: 65, tags:['mcdonalds', 'fastfood'], kind: 'expense'}],
      user: citizen
    }).then(() => {
      getTodayEntry(citizen)
        .then(entry => {
          expect(entry).toBeDefined()
          done()
        })
    })
  })
})
