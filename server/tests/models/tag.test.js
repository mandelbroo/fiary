const { Entry, Record, RecordTag, Tag, User } = require('../../models')

describe('Tag model', () => {
  it('endpoint is ok', () => {
    const tag = new Tag()
    expect(tag.tableName).toBe('tags')
  })
  describe('relations', () => {
    beforeAll(async () => {
      user = await User.findOrCreate({
        email: 'tags@tester',
        username: 'tags',
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
        name: 'taggyTag'
      })
      recordTag = await RecordTag.findOrCreate({
        recordId: record.id,
        tagId: tag.id
      })
    })
    it('return records', async () => {
      const result = (await tag.records().fetch()).first()
      expect(result.id).toBe(record.id)
      expect(result.amount).toBe(record.amount)
      expect(result.income).toBe(record.income)
      expect(result.entryId).toBe(record.entryId)
    })
    it('return recordsTags', async () => {
      const result = (await tag.recordsTags().fetch()).first()
      expect(result.id).toBe(recordTag.id)
      expect(result.recordId).toBe(recordTag.recordId)
      expect(result.tagId).toBe(recordTag.tagId)
    })
  })
})
