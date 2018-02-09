const server = require('../../app').listen()
const app = require('supertest').agent(server)
const { Entry, Record, RecordTag, Tag, User } = require('../../models')
const jwtGenerate = require('../../utils/jwt-generate')
const { DateTime } = require('luxon')

describe('records route', () => {
  afterAll(async () => {
    await User.connection.destroy()
    server.close()
  })

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

  describe('post /api/records', () => {
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
    it('handle error', async (done) => {
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
  describe('delete /api/records/:id', () => {
    beforeAll(async () => {
      record = await Record.create({
        entryId: entry.id,
        amount: 10,
        income: true
      })
      tag = await Tag.findOrCreate({name: 'exist'})
      await RecordTag.create({recordId: record.id, tagId: tag.id})
    })
    it('successfully remove record', (done) => {
      app.delete('/api/records/' + record.id)
        .set('Authorization', token)
        .expect(200)
        .end(async (err, res) => {
          try {
            await Record.findById(record.id)
          } catch(err) {
            expect(err.message).toBe('EmptyResponse')
            done()
          }
          done(err)
        })
    })
    it('remove not existing record', (done) => {
      app.delete('/api/records/0')
        .set('Authorization', token)
        .expect(422)
        .end((err, res) => {
          expect(res.body.success).toBe(false)
          expect(res.body.message).toBe('record 0 not found')
          done(err)
        })
    })
  })
})
