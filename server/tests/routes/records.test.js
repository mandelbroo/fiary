const server = require('../../app').listen()
const request = require('supertest').agent(server)
const {postRecords} = require('../../routes/records')
const User = require('../../models/user')
const jwtGenerate = require('../../utils/jwt-generate')

describe('records route', () => {
  afterAll(done => {
    Promise.all([
      User.connection.destroy(),
    ]).then(() => {
      server.close()
      done()
    })
  })

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
