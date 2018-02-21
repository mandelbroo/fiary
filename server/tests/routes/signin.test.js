const server = require('../../app').listen()
const request = require('supertest').agent(server)
const User = require('../../models/user')

describe('signin', () => {
	afterAll(async () => {
		await User.connection.destroy()
		server.close()
	})

	it('successfully logs in', async (done) => {
		const req = {
			email: `${Date.now()}success@signin.com`,
			password: 'StrongPass123'
		}
		const cryptedPass = await User.encryptPassword(req.password)
		await User.findOrCreate({
			email: req.email,
			password: cryptedPass,
			username: `${Date.now()}success`
		})
		request
			.post('/api/signin')
			.type('json')
			.send(req)
			.expect(200)
			.end((err, {body}) => {
				expect(body).toHaveProperty('success')
				expect(body).toHaveProperty('message')
				expect(body).toHaveProperty('token')
				expect(body).toHaveProperty('user')
				expect(body.user).toHaveProperty('id')
				expect(body.user).toHaveProperty('name')
				expect(body.success).toBe(true)
				expect(body.message).toBe('Authenticated successfully')
				done(err)
			})
	})
	it('401 if user does not exist', done => {
		const req = {
			email: 'not@exists.com',
			password: 'pass'
		}
		request
			.post('/api/signin')
			.type('json')
			.send(req)
			.expect(401)
			.end((err, {body}) => {
				expect(body).toHaveProperty('success')
				expect(body).toHaveProperty('message')
				expect(body.success).toBe(false)
				expect(body.message).toBe('User not found')
				done(err)
			})
	})
	it('401 if password is wrong', async (done) => {
		const req = {
			email: 'wrong@pass.com',
			password: 'pass'
		}
		await User.findOrCreate({
			email: req.email,
			username: 'wrongname',
			password: 'wrong'
		})
		request
			.post('/api/signin')
			.type('json')
			.send(req)
			.expect(401)
			.end((err, {body}) => {
				expect(body).toHaveProperty('success')
				expect(body).toHaveProperty('message')
				expect(body.success).toBe(false)
				expect(body.message).toBe('Wrong credentials')
				done(err)
			})
	})
})
