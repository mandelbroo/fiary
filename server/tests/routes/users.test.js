const jwtGenerate = require('../../utils/jwt-generate')
const User = require('../../models/user')
const server = require('../../app').listen()
const request = require('supertest').agent(server)

describe('users', () => {
  afterAll(done => {
    Promise.all([
      User.connection.destroy(),
    ]).then(() => {
      server.close()
      done()
    })
  })

  beforeAll(done => {
    User.create({
      username: 'admin',
      email: 'admin@email.net',
      password: 'Supersecret098'
    })
    .then(user => token = jwtGenerate(user.attributes))
    .then(() => done())
  })

  it('return list of users', done => {
    expect(token).toBeTruthy()
    expect(token).toBeDefined()
    request
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

  it('401 if auth header is missing', done => {
    request
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

  it('401 if token empty value', done => {
    request
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

  it('401 if token is invalid', done => {
    request
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
