const { Entry, Record, RecordTag, Tag, User } = require('../../models')

describe('Record model', () => {
  let user, entry, record, tag, recordTag

  afterAll(async () => await User.connection.destroy())

  it('endpoint is ok', () => {
    const record = new Record()
    expect(record.tableName).toBe('records')
  })
  it('income property ok', () => {
    const record = new Record({ income: true })
    expect(record.income).toBe(true)
  })
  describe('relations', () => {
    beforeAll(async () => {
      user = await User.findOrCreate({
        email: 'record@testet',
        username: 'record-tester',
        password: '1234',
      })
      entry = await Entry.findOrCreate({
        userId: user.id,
        day: '2013-01-01',
      })
      record = await Record.findOrCreate({
        entryId: entry.id,
        amount: 10,
        income: true,
      })
      tag = await Tag.findOrCreate({
        name: 'someTag',
      })
      recordTag = await RecordTag.findOrCreate({
        recordId: record.id,
        tagId: tag.id,
      })
    })
    it('return entry', async () => {
      const result = await record.entry().fetch()
      expect(result.attributes.id).toBe(entry.id)
      expect(result.attributes.day).toBe(entry.day)
      expect(result.attributes.userId).toBe(entry.userId)
    })
    it('return recordsTags', async () => {
      const result = (await record.recordsTags().fetch()).first()
      expect(result.id).toBe(recordTag.id)
      expect(result.recordId).toBe(recordTag.recordId)
      expect(result.tagId).toBe(recordTag.tagId)
    })
    it('return tags', async () => {
      const result = (await record.tags().fetch()).first()
      expect(result.id).toBe(tag.id)
      expect(result.name).toBe(tag.name)
    })
  })
})
