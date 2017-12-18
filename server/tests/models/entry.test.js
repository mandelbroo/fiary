const Entry = require('../../models/entry')
const User = require('../../models/user')

describe('Entry', () => {
  afterAll(done => {
    Promise.all([
      User.connection.destroy(),
      Entry.connection.destroy(),
    ]).then(() => done())
  })

  describe('.create(attributes)', () => {
    beforeAll(done => {
      User.create({
        username: 'entry-testing',
        email: 'entry@testing.yo',
        password: 'pass',
      })
      .then(user => {return user.refresh()})  // to apply bookshelf-camelcase
      .then(user => citizen = user)
      .then(() => done())
    })

    it('creates and saves entry', done => {
      Entry.create({
        userId: citizen.id
      })
      .then(entry => {return entry.refresh()})  // to apply bookshelf-camelcase
      .then(entry => {
        expect(entry.attributes).toHaveProperty('userId')
        expect(entry.attributes.userId).toEqual(citizen.id)
        expect(entry.attributes.createdAt).toBeDefined()
        expect(entry.attributes.updatedAt).toBeDefined()
      })
      .then(() => done())
    })
  })
})
