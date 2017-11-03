const request = require('supertest')
const app = require('../../')
const server = app.listen(5000)

describe('error-handlers', () => {
  afterEach(done => server.close(() => done()))

  describe('400', () => {
    it('fire when validation fails', done => {
      request(app)
      .post('/api/signin')
      .type('json')
      .send({})   // send empty body
      .expect(400)
      .end(err => done(err))
    })
  })
  describe('401', () => {
    it("fire on get not existing /api route (/api/* always requires authorization)", done => {
      request(app)
      .get('/api/non-existing')
      .type('json')
      .send({})
      .expect(401)
      .end(err => done(err))
    })
  })
  describe('404', () => {
    it("fire on post not existing route'", done => {
      request(app)
        .post('/not-exist')
        .type('json')
        .send({})
        .expect(404)
        .end(err => done(err))
    })
    it("do not fire on get not existing route", done => {
      request(app)
        .get('/not-exist')
        .type('json')
        .send({})
        .expect(200)
        .end(err => done(err))
    })
  })
  describe('500', () => {
    it("fire on runtime error", done => {
      request(app)
        .get('/with-error')
        .type('json')
        .send({})
        .expect(500)
        .end((err, res) => {
          done(err)
        })
    })
  })
})
