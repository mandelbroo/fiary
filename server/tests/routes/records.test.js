const server = require('../../app').listen()
const app = require('supertest').agent(server)
const User = require('../../models/user')
const Entry = require('../../models/entry')
const Tag = require('../../models/tag')
const jwtGenerate = require('../../utils/jwt-generate')
const {DateTime} = require('luxon')

describe('records route', () => {
  afterAll(async () => {
    await User.connection.destroy(),
    server.close()
  })

  describe('post /api/records', () => {
    beforeAll(async () => {
      citizen = await User.create({
        username: `${Date.now()}admin`,
        email: `${Date.now()}admin@email.net`,
        password: 'Supersecret098'
      })
      token = jwtGenerate(citizen.attributes)
      entry = await Entry.create({
        userId: citizen.id,
        day: DateTime.local().toISODate()
      })
    })

    it('successfully add record', done => {
      app.post('/api/records')
        .send({
          entryId: entry.id,
          amount: 20,
          income: false,
          tags: [{ id: -1, name: Date.now().toString() }]
        })
        .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.success).toBeTruthy()
            done(err)
          })
    })
    it('handle error', async(done) => {
      await Tag.findOrCreate({name: 'exist'})
      app.post('/api/records')
        .send({
          entryId: entry.id,
          amount: 20,
          income: false,
          tags: [{ id: -1, name: 'exist' }]
        })
        .set('Authorization', token)
          .expect(422)
          .end((err, res) => {
            expect(res.body.success).toBe(false)
            expect(res.body.message).toBeDefined()
            done(err)
          })
    })
  })
})
