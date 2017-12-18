const jwtGenerate = require('../../utils/jwt-generate')
const Entry = require('../../models/entry')
const User = require('../../models/user')
const server = require('../../app').listen()
const request = require('supertest').agent(server)

describe('entries', () => {
  afterAll(done => {
    Promise.all([
      Entry.connection.destroy(),
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
