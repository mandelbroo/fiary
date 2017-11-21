const app = require('../app')
const request = require('supertest')(app)
const {postRecords} = require('./records')
const {User} = require('../models')
const jwtGenerate = require('../utils/jwt-generate')

describe('records route', () => {
  describe('post /api/records', () => {
    beforeAll(done => {
      User.create({
        username: 'admin',
        email: 'admin@email.net',
        password: 'Supersecret098'
      })
      .then(user => citizen = user)
      .then(user => token = jwtGenerate(user.attributes))
      .then(() => done())
    })

    it('successfully add records', done => {
      request
        .post('/api/records')
        .send({
          records:[
            {amount: 20, tags:['beer']},
            {amount: 10, tags:['Yulia', 'returned'], income: true}
          ],
        })
        .set('Authorization', token)
        .expect(200)
        .end((err, {body}) => {
          expect(body.success).toBeTruthy()
          done(err)
        })
    })
  })
})
