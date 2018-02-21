const { Entry, Record, RecordTag, Tag, User } = require('../../models')

describe('RecordTag model', () => {
	it('endpoint is ok', () => {
		const recordTag = new RecordTag()
		expect(recordTag.tableName).toBe('records_tags')
	})
	describe('relations', () => {
		beforeAll(async () => {
			user = await User.findOrCreate({
				email: 'record-tag@tester',
				username: 'record-tag',
				password: '1234'
			})
			entry = await Entry.findOrCreate({
				userId: user.id,
				day: '2013-01-01'
			})
			record = await Record.findOrCreate({
				entryId: entry.id,
				amount: 10,
				income: true
			})
			tag = await Tag.create({
				name: Date.now().toString()
			})
			recordTag = await RecordTag.findOrCreate({
				recordId: record.id,
				tagId: tag.id
			})
		})
		it('return record', async () => {
			const result = await recordTag.record().fetch()
			expect(result.id).toBe(record.id)
			expect(result.amount).toBe(record.amount)
			expect(result.income).toBe(record.income)
			expect(result.attributes.entryId).toBe(record.entryId)
		})
		it('return tag', async () => {
			const result = await recordTag.tag().fetch()
			expect(result.id).toBe(tag.id)
			expect(result.attributes.name).toBe(tag.name)
		})
	})
})
