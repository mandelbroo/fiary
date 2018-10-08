const jwtGenerate = require('../../utils/jwt-generate')
const knex = require('../../../db/connection')
const User = require('../../models/user')
const server = require('../../app').listen()
const app = require('supertest').agent(server)

describe('tags', () => {
  let tags
  let user
  let token

  beforeAll(async () => {
    tags = [{ name: 'abc' }, { name: 'abcd' }, { name: 'aaa' }]
    user = await User.findOrCreate({
      username: 'riter',
      email: 'riter@tag.org',
      password: 'DrawEverywhere',
    })
    token = jwtGenerate(user.attributes)
  })

  afterAll(async () => {
    knex('tags')
      .whereIn('name', tags.map((tag) => tag.name))
      .del(),
      await Promise.all([User.connection.destroy()])
  })

  it('look up for tags', async (done) => {
    await knex('tags').insert(tags, 'id')
    app
      .get('/api/tags?like=ab')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body[0].name).toBe(tags[0].name)
        expect(res.body[1]).toHaveProperty('id')
        expect(res.body[1].name).toBe(tags[1].name)
        done()
      })
  })
})
