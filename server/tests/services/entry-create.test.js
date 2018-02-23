const entryCreate = require('../../services/entry-create')
const User = require('../../models/user')

describe('entryCreate', () => {
	beforeAll(async () => {
		citizen = await User.create({
			username: `${Date.now()}creator`,
			email: `${Date.now()}cre@tor`,
			password: 'pass'
		})
	})

	it('success case', async () => {
		const params = {
			day: '20-04-2013',
			userId: citizen.id
		}
		const entry = await entryCreate(params, citizen)
		expect(entry).toHaveProperty('id')
		expect(entry).toHaveProperty('day')
		expect(entry).toHaveProperty('userId')
		expect(entry.id).toBeDefined()
		expect(entry.day).toBe(params.day)
		expect(entry.userId).toBe(citizen.id)
	})
})
