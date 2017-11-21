const jwtGenerate = require('../utils/jwt-generate')
const {Entry, User} = require('../models')
const app = require('../app')
const request = require('supertest')(app)

describe('entries', () => {
  afterAll(done => User.connection.destroy().then(() => done()))

  beforeAll(done => {
    User.create({
      username: 'admin',
      email: 'admin@email.net',
      password: 'Supersecret098'
    })
    .then(user => citizen = user)
    .then(user => token = jwtGenerate(user.attributes))
    .then(() => {
      Promise.all([
        Entry.create({userId: citizen.id}),
        Entry.create({userId: citizen.id}),
      ])
      .then(() => done())
    })
  })

  it('get /api/entries', done => {
    request
      .get('/api/entries')
      .set('Authorization', token)
      .expect(200)
      .end((err, {body}) => {
        expect(body).toBeDefined()
        expect(body.length).toBe(2)
        expect(body.totalCount).toBe(2)
        expect(body.collection).toBeDefined()
        expect(body.collection.length).toEqual(2)
        done(err)
    })
  })
})
