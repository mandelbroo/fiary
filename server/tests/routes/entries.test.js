const jwtGenerate = require('../../utils/jwt-generate')
const Entry = require('../../models/entry')
const User = require('../../models/user')
const server = require('../../app').listen()
const app = require('supertest').agent(server)
const {DateTime} = require('luxon')

describe('entries', () => {
	afterAll(async () => {
		await Promise.all([
			Entry.connection.destroy(),
			User.connection.destroy(),
		])
		server.close()
	})

	beforeAll(async () => {
		citizen = await User.create({
			username: `${Date.now()}admin`,
			email: `${Date.now()}admin@email.net`,
			password: 'Supersecret098'
		})
		token = jwtGenerate(citizen.attributes)
		entries = await Promise.all([
			Entry.create({
				userId: citizen.id,
				day: DateTime.local().toISODate()
			}),
			Entry.create({
				userId: citizen.id,
				day: DateTime.fromISO('2017-05-15').toISODate()
			}),
		])
	})

	it('get /api/entries', done => {
		app.get('/api/entries')
			.set('Authorization', token)
			.expect(200)
			.end((err, { body }) => {
				expect(body).toBeDefined()
				expect(body.length).toBe(2)
				expect(body.totalCount).toBe(2)
				expect(body.collection).toBeDefined()
				expect(body.collection.length).toEqual(2)
				done(err)
		})
	})
	it('get /api/entries/:id', done => {
		const entry = entries[0]
		app.get('/api/entries/' + entry.id)
			.set('Authorization', token)
			.expect(200)
			.end((err, { body }) => {
				expect(body.id).toBe(entry.id)
				expect(body.userId).toBe(entry.userId)
				expect(body.day).toBe(entry.day)
				done(err)
			})
	})
	describe('get /api/entries/:isoDate', () => {
		it('find entry', done => {
			app.get('/api/entries/2017-05-15')
				.set('Authorization', token)
				.expect(200)
				.end((err, { body }) => {
					expect(body).toBeDefined()
					expect(body.id).toBeDefined()
					expect(body.userId).toBeDefined()
					expect(body.day).toBeDefined()
					done(err)
				})
			})
		it('entry not exists', done => {
			app.get('/api/entries/2015-01-02')
				.set('Authorization', token)
				.expect(404)
				.end((err, { body }) => {
					expect(body).toBeDefined()
					expect(body).toMatchObject({})
					done(err)
				})
			})
	})
})
