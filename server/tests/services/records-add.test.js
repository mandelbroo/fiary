const recordsAdd = require('../../services/records-add')
const Entry = require('../../models/entry')
const Record = require('../../models/record')
const Tag = require('../../models/tag')
const User = require('../../models/user')
const {DateTime} = require('luxon')

describe('recordsAdd', () => {
  afterAll(async () => {
    await Promise.all([
      Entry.connection.destroy(),
      Record.connection.destroy(),
      Tag.connection.destroy(),
      User.connection.destroy(),
    ])
  })

  describe('.execute', () => {
    beforeAll(async () => {
      citizen = await User.create({
        username: `${Date.now()}creator`,
        email: `${Date.now()}cre@tor`,
        password: 'pass'
      })
    })

    it('add records to provided entry', async () => {
      const entry = await Entry.create({
        userId: citizen.id,
        day: DateTime.local().toISODate()
      })
      const newEntry = await recordsAdd.execute({
        records:[
          {amount: 20, tags:['beer']},
          {amount: 10, tags:['Yulia', 'returned'], income: true}
        ],
        id: entry.id,
        user: citizen
      })
      expect(newEntry).toHaveProperty('id')
      expect(newEntry.id).toEqual(entry.id)
      expect(newEntry.records).toBeDefined()
      expect(newEntry.records.length).toBe(2)
    })
    it('create new entry when it is not provided', async () => {
      let data = {
        records: [
          {amount: 10, tags:['bus']},
          {amount: 25000, tags:['salary'], 'income': true}
        ],
        user: citizen,
        day: '2018-01-02'
      }
      const entry = await recordsAdd.execute(data)
      expect(entry).toBeDefined()
      expect(entry).toHaveProperty('id')
      const records = await Record.where({entry_id: entry.id}).fetchAll()
      expect(records).toBeDefined()
      expect(records.length).toEqual(2)
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
        user: citizen,
        day: '2018-01-01'
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
