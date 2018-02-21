const Entry = require('../../models/entry')
const User = require('../../models/user')
const {DateTime} = require('luxon')

describe('Entry', () => {
	afterAll(async () => {
		await Promise.all([
			User.connection.destroy(),
			Entry.connection.destroy(),
		])
	})

	describe('.create(attributes)', () => {
		beforeAll(async () => {
			citizen = await User.create({
				username: `${Date.now()}entry-testing`,
				email: `${Date.now()}entry@testing.yo`,
				password: 'pass',
			})
			await citizen.refresh()	// apply bookshelf-camelcase
		})

		it('creates and saves entry', async () => {
			const entry = await Entry.create({
				userId: citizen.id,
				day: DateTime.local().toISODate()
			})
			await entry.refresh()	// apply bookshelf-camelcase
			expect(entry.attributes).toHaveProperty('userId')
			expect(entry.attributes.userId).toEqual(citizen.id)
			expect(entry.attributes.createdAt).toBeDefined()
			expect(entry.attributes.updatedAt).toBeDefined()
		})
	})
})
