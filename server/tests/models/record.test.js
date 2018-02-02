const { Entry, Record, RecordTag, Tag, User } = require('../../models')

describe('Record model', () => {
  it('endpoint is ok', () => {
    const record = new Record()
    expect(record.tableName).toBe('records')
  })
  it('income property ok', () => {
    const record = new Record({kind: 'income'})
    expect(record.income).toBe(true)
  })
  describe('relations', () => {
    beforeAll(async () => {
      user = await User.findOrCreate({
        email: 'someone@s.co',
        username: 'someone',
        password: '1234'
      })
      entry = await Entry.findOrCreate({
        userId: user.id,
        day: '2013-01-01'
      })
      record = await Record.findOrCreate({
        entryId: entry.id,
        amount: 10,
        kind: 'income'
      })
      tag = await Tag.findOrCreate({
        name: 'someTag'
      })
      recordTag = await RecordTag.findOrCreate({
        recordId: record.id,
        tagId: tag.id
      })
    })
    it('return entry', async () => {
      const recordEntry = await record.entry().fetch()
      expect(recordEntry.attributes).toMatchObject(entry.attributes)
    })
    it('return records-tags', async () => {
      const recordTags = await record.recordsTags().fetch()
      expect(recordTags.first().attributes).toMatchObject(recordTag.attributes)
    })
    it('return tags', async () => {
      const tags = await record.tags().fetch()
      expect(tags.first().attributes).toMatchObject(tag.attributes)
    })
  })
})
