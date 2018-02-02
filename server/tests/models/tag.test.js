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
      const records = await tag.records().fetch()
      expect(records.first().attributes).toMatchObject(record.attributes)
    })
    it('return recordsTags', async () => {
      const recordsTags = await tag.recordsTags().fetch()
      expect(recordsTags.first().attributes).toMatchObject(recordTag.attributes)
    })
  })
})
