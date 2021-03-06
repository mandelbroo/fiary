const server = require('../../app').listen()
const app = require('supertest').agent(server)

describe('status-codes', () => {
  afterAll(() => {
    server.close()
  })

  describe('200', () => {
    it('return index.html on get not existing route', (done) => {
      app
        .get('/not-exist')
        .type('json')
        .send({})
        .expect(200)
        .end((err, res) => {
          const contentType = res.header['content-type'].toLowerCase()
          expect(contentType).toBe('text/html; charset=utf-8')
          expect(res).toBeDefined()
          done(err)
        })
    })
  })
  describe('400', () => {
    it('fire when validation fails', (done) => {
      app
        .post('/api/signin')
        .type('json')
        .send({})
        .expect(400)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err) => done(err))
    })
  })
  describe('401', () => {
    it('fire on get not existing /api route (/api/* always requires authorization)', (done) => {
      app
        .get('/api/non-existing')
        .type('json')
        .send({})
        .expect(401)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err) => done(err))
    })
  })
  describe('404', () => {
    it('fire on post not existing route', (done) => {
      app
        .post('/not-exist')
        .type('json')
        .send({})
        .expect(404)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end((err) => done(err))
    })
  })
  describe('500', () => {
    it('fire on runtime error', (done) => {
      app
        .get('/with-error')
        .type('json')
        .send({})
        .expect(500)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((err) => done(err))
    })
  })
})
