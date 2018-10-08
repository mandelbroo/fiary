const jwtGenerate = require('../../utils/jwt-generate')
const Entry = require('../../models/entry')
const User = require('../../models/user')
const server = require('../../app').listen()
const app = require('supertest').agent(server)
const { DateTime } = require('luxon')

describe('entries', () => {
  let citizen
  let token
  let entries

  afterAll(async () => {
    await Promise.all([Entry.connection.destroy(), User.connection.destroy()])
    server.close()
  })

  beforeAll(async () => {
    citizen = await User.create({
      username: `${Date.now()}admin`,
      email: `${Date.now()}admin@email.net`,
      password: 'Supersecret098',
    })
    token = jwtGenerate(citizen.attributes)
    entries = await Promise.all([
      Entry.create({
        userId: citizen.id,
        day: DateTime.local().toISODate(),
      }),
      Entry.findOrCreate({
        userId: citizen.id,
        day: '2017-05-15',
      }),
    ])
  })

  describe('get /api/entries', () => {
    it('success case', (done) => {
      app
        .get('/api/entries')
        .set('Authorization', token)
        .expect(200)
        .end((err, { body }) => {
          expect(body).toBeDefined()
          expect(body).toHaveLength(2)
          expect(body.totalCount).toBe(2)
          expect(body.collection).toBeDefined()
          expect(body.collection).toHaveLength(2)
          done(err)
        })
    })

    it('order by day desc', async () => {
      const firstDay = '2012-01-01'
      const secondDay = '2010-02-02'
      const scenario = await Promise.all([
        Entry.create({
          userId: citizen.id,
          day: firstDay,
        }),
        Entry.create({
          userId: citizen.id,
          day: secondDay,
        }),
      ])
      app
        .get('/api/entries')
        .set('Authorization', token)
        .expect(200)
        .end(async (err, { body }) => {
          expect(body).toHaveLength(4)
          const indexes = await Promise.all([
            body.collection.findIndex((el) => el.day === firstDay),
            body.collection.findIndex((el) => el.day === secondDay),
          ])
          expect(indexes[0] < indexes[1]).toBe(true)
          await Promise.all(scenario.map((entry) => entry.destroy()))
        })
    })
  })

  it('get /api/entries/:id', (done) => {
    const entry = entries[0]
    app
      .get('/api/entries/' + entry.id)
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
    it('find entry', (done) => {
      app
        .get('/api/entries/2017-05-15')
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
    it('entry not exists', (done) => {
      app
        .get('/api/entries/2015-01-02')
        .set('Authorization', token)
        .expect(204)
        .end((err, { body }) => {
          expect(body).toBeDefined()
          expect(body).toMatchObject({})
          done(err)
        })
    })
  })
})
