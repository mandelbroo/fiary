const jwtGenerate = require('../../utils/jwt-generate')
const Entry = require('../../models/entry')
const User = require('../../models/user')
const server = require('../../app').listen()
const request = require('supertest').agent(server)
const {DateTime} = require('luxon')

describe('entries', () => {
  let citizen = {}
  let token = ''

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
    await Promise.all([
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
