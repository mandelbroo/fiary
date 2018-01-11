const server = require('../../app').listen()
const app = require('supertest').agent(server)
const {postRecords} = require('../../routes/records')
const User = require('../../models/user')
const jwtGenerate = require('../../utils/jwt-generate')

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
    })

    it('successfully add records', done => {
      app.post('/api/entries')
        .send({
          records:[
            {amount: 20, tags:[
              {id: -1, name: Date.now().toString()}
            ]},
            {amount: 10, tags:[
              {id: -1, name: Date.now().toString() + 1},
              {id: -2, name: Date.now().toString() + 2}
            ], income: true}
          ],
          day: '2018-01-02'
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
