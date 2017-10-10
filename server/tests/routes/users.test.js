const request = require('supertest')
const app = require('../../')
const usersTruncate = require('../users-truncate')
const server = app.listen(5000)

describe('users', () => {
  let token = false

  beforeAll((done) => {
    usersTruncate()
    const req = {
      username: 'admin',
      email: 'admin@email.net',
      password: 'Supersecret098'
    }
    request(app)
      .post('/api/signup')
      .send(req)
      .end((err, res) => {
        token = res.body.token
        done()
      })
  })
  afterEach(done => server.close(() => done()))

  it('return list of users', done => {
    expect(token).toBeTruthy()
    expect(token).toBeDefined()
    request(app)
      .get('/api/users')
      .set('Authorization', token)
      .expect(200)
      .end((err, {body}) => {
        expect.arrayContaining(body)
        expect(body.length).not.toBe(0)
        const user = body[0]
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('username')
        expect(user).toHaveProperty('email')
        expect(user).toHaveProperty('role')
        expect(user).toHaveProperty('createdAt')
        done(err)
      })
  })

  it('return status 401 if auth header is missing', done => {
    request(app)
      .get('/api/users')
      .expect(401)
      .end((err, {body}) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body.success).toBe(false)
        expect(body.message).toBe('Not authorized. Missing or invalid token')
        done(err)
      })
  })

  it('return status 401 if token empty value', done => {
    request(app)
      .get('/api/users')
      .set('Authorization', '')
      .expect(401)
      .end((err, {body}) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body.success).toBe(false)
        expect(body.message).toBe('Not authorized. Missing or invalid token')
        done(err)
      })
  })

  it('return status 401 if token is invalid', done => {
    request(app)
      .get('/api/users')
      .set('Authorization', 'R@nd0MsYmb0lz')
      .expect(401)
      .end((err, {body}) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body.success).toBe(false)
        expect(body.message).toBe('Not authorized. Missing or invalid token')
        done(err)
      })
  })
})
