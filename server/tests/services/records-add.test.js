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
      entry = await Entry.create({
        userId: citizen.id,
        day: DateTime.local().toISODate()
      })
      tags = await Promise.all([
        Tag.findOrCreate({name: 'someone'}),
        Tag.findOrCreate({name: 'returned'})
      ])
    })

    it('add record', async () => {
      const record = await recordsAdd.execute({
        amount: 10,
        income: true,
        entryId: entry.id,
        tags: tags,
      })
      expect(record).toHaveProperty('id')
      expect(record.income).toEqual(true)
      expect(record.amount).toEqual(10)
      expect(
        record.tags.sort((a,b) => a.id - b.id)
      ).toMatchObject(
        tags.map(t => ({id: t.id, name: t.name})).sort((a,b) => a.id - b.id)
      )
    })
    it('resolve tags properly', async () => {
      const data = {
        amount: 1,
        entryId: entry.id,
        tags: [
          ...tags,
          {id: -1, name: Date.now().toString()},
          {id: -2, name: (Date.now() + 1).toString()}]
      }
      const record = await recordsAdd.execute(data)
      expect(record.id).toBeDefined()
      expect(record.entryId).toBe(data.entryId)
      expect(record.amount).toBe(data.amount)
      expect(
        record.tags.map(t => t.name).sort((a,b) => a < b)
      ).toMatchObject(
        data.tags.map(t => t.name).sort((a,b) => a < b)
      )
    })
    it('error when empty object passed', async () => {
      try {
        await recordsAdd.execute({ })
      } catch(err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('data is empty')
      }
    })
    it('error when tags not provided', async () => {
      try {
        await recordsAdd.execute({ amount: 10 })
      } catch(err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('tags not provided')
      }
    })
  })
})
