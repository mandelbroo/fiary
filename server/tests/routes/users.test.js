const jwtGenerate = require('../../utils/jwt-generate')
const User = require('../../models/user')
const server = require('../../app').listen()
const app = require('supertest').agent(server)

describe('users', () => {
  let token
  afterAll(async () => {
    await User.connection.destroy()
    server.close()
  })

  beforeAll(async () => {
    const user = await User.findOrCreate({
      username: 'admin',
      email: 'admin@email.net',
      password: 'Supersecret098',
    })
    token = jwtGenerate(user.attributes)
  })

  it('return list of users', (done) => {
    expect(token).toBeTruthy()
    expect(token).toBeDefined()
    app
      .get('/api/users')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        expect.arrayContaining(res.body)
        expect(res.body.length).not.toBe(0)
        expect(res.body.totalCount).not.toBe(0)
        expect(res.body.pagesCount).not.toBe(0)
        const user = res.body.collection[0]
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('username')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('role')
        expect(user).toHaveProperty('createdAt')
        done(err)
      })
  })

  it('401 if auth header is missing', (done) => {
    app
      .get('/api/users')
      .expect(401)
      .end((err, { body }) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body.success).toBe(false)
        expect(body.message).toBe('Not authorized. Missing or invalid token')
        done(err)
      })
  })

  it('401 if token empty value', (done) => {
    app
      .get('/api/users')
      .set('Authorization', '')
      .expect(401)
      .end((err, { body }) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body.success).toBe(false)
        expect(body.message).toBe('Not authorized. Missing or invalid token')
        done(err)
      })
  })

  it('401 if token is invalid', (done) => {
    app
      .get('/api/users')
      .set('Authorization', 'R@nd0MsYmb0lz')
      .expect(401)
      .end((err, { body }) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body.success).toBe(false)
        expect(body.message).toBe('Not authorized. Missing or invalid token')
        done(err)
      })
  })
})
