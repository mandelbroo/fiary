const Entry = require('../../models/entry')
const Record = require('../../models/record')
const User = require('../../models/user')

describe('Record model', () => {
  it('endpoint is ok', () => {
    const record = new Record()
    expect(record.tableName).toBe('records')
  })
  it('income property ok', () => {
    const record = new Record()
    expect(record.income).toBe(false)
    record.kind = 'income'
    expect(record.income).toBe(true)
  })
  it.skip('return entry', async () => {
    const user = await User.findOrCreate({
      email: 'someone@s.co',
      username: 'someone',
      password: '1234'
    })
    const entry = await Entry.findOrCreate({
      userId: user.id,
      day: '2013-01-01'
    })
    const record = await Record.create({
      entryId: entry.id,
      amount: 10,
      kind: 'income'
    })
    console.log(record)
    expect(record.entry().fetch()).toBe(2)
  })
})
