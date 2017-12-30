const recordsAdd = require('../../services/records-add')
const Entry = require('../../models/entry')
const Record = require('../../models/record')
const Tag = require('../../models/tag')
const User = require('../../models/user')

describe('recordsAdd', () => {
  afterAll(done => {
    Promise.all([
      Entry.connection.destroy(),
      Record.connection.destroy(),
      Tag.connection.destroy(),
      User.connection.destroy(),
    ]).then(() => {
      done()
    })
  })

  describe('.execute', () => {
    beforeAll(async () => {
      citizen = await User.create({
        username: 'creator',
        email: 'cre@tor',
        password: 'pass'
      })
    })

    it('add records to provided entry', done => {
      Entry.create({userId: citizen.id})
        .then(entry => {
          recordsAdd.execute({
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
            expect(newEntry.records).toBeDefined()
            expect(newEntry.records.length).toBe(2)
            done()
          })
        })
    })
    it('create new entry when it is not provided', done => {
      expect.assertions(4)
      let data = {
        records:[
          {amount: 10, tags:['bus']},
          {amount: 25000, tags:['salary'], 'income': true}
        ],
        user: citizen
      }
      recordsAdd.execute(data)
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
    it('resolve tags properly', async () => {
      const tag = await Tag.create({name: Date.now()})
      let data = {
        records:[
          { amount: 1, tags:[
            {id: tag.id, name: tag.attributes.name},
            {id: -1, name: Date.now().toString()},
            {id: -2, name: (Date.now() + 1).toString()}]
          },
          { amount: 2, tags:[
            {id: -1, name: Date.now().toString()},
            {id: -2, name: (Date.now() + 1).toString()},
            {id: -3, name: (Date.now() + 2).toString()},
            {id: -4, name: (Date.now() + 3).toString()}]
          },
          { amount: 3, tags:[
            {id: -1, name: (Date.now() + 2).toString()},
            {id: -2, name: (Date.now() + 4).toString()}]
          }
        ],
        user: citizen
      }
      const entry = await recordsAdd.execute(data)
      const records = await Record.where({entry_id: entry.id})
        .fetchAll({withRelated: ['tags']})
      expect(records).toBeDefined()
      expect(records.length).toEqual(3)
      const tags = records.first().related('tags').models
        .map(tag => ({id: tag.id, name: tag.attributes.name}))
      expect(tags).toBeDefined()
      expect(tags.length).toBe(3)
    })
    it('error when empty object passed', done => {
      expect.assertions(2)
      recordsAdd.execute({ })
        .then(entry => expect(true).toBeTruthy()) // expecting to not execute
        .catch(err => {
          expect(err).toBeDefined()
          expect(err.message).toBe('data is empty')
          done()
        })
    })
    it('error when there are 0 records', done => {
      expect.assertions(2)
      recordsAdd.execute({records:[], user: citizen})
        .then(entry => expect(true).toBeTruthy()) // expecting to not execute
        .catch(err => {
          expect(err).toBeDefined()
          expect(err.message).toBe('no records provided')
          done()
        })
    })
    it('error when user not provided', done => {
      expect.assertions(2)
      recordsAdd.execute({records: [{}]})
        .then(entry => expect(true).toBeTruthy()) // expecting to not execute
        .catch(err => {
          expect(err).toBeDefined()
          expect(err.message).toBe('user not provided')
          done()
        })
    })
  })
})
