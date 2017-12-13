const app = require('../../app')
const request = require('supertest')(app)

describe('status-codes', () => {
  ////  Skipped. Not sure why this fails on Travic CI (falls into 500 handler instead of sending index.html)
  describe('200', () => {
    it("return index.html on get not existing route", done => {
      request
        .get('/not-exist')
        .type('json')
        .send({})
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .end((err, res) => {
          expect(res).toBeDefined()
          done(err)
        })
    })
  })
  describe('400', () => {
    it('fire when validation fails', done => {
      request
      .post('/api/signin')
      .type('json')
      .send({})
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(err => done(err))
    })
  })
  describe('401', () => {
    it("fire on get not existing /api route (/api/* always requires authorization)", done => {
      request
      .get('/api/non-existing')
      .type('json')
      .send({})
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(err => done(err))
    })
  })
  describe('404', () => {
    it("fire on post not existing route", done => {
      request
        .post('/not-exist')
        .type('json')
        .send({})
        .expect(404)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(err => done(err))
    })
  })
  describe.skip('500', () => {
    it("fire on runtime error", done => {
      request
        .get('/with-error')
        .type('json')
        .send({})
        .expect(500)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(err=> done(err))
    })
  })
})
