const User = require('../../models/user')

describe('User', () => {
  describe('.create(attributes)', () => {
    it('creates and saves user', done => {
      User.create({
        username: 'dotest',
        email: 'email@do.test',
        password: 'pass',
        role: 'user'
      })
      .then(user => {
        expect(user.attributes).toHaveProperty('username')
        expect(user.attributes).toHaveProperty('email')
        expect(user.attributes).toHaveProperty('role')
        expect(user.isValidPass).toBeDefined()
        expect(user.createdAt).toBeDefined()
        expect(user.updatedAt).toBeDefined()
        done()
      })
    })
  })
  describe('create before each', () => {
    beforeEach(done => {
      User.encryptPassword('pass')
        .then(crypted => {
          User.create({
            username: 'dotest',
            email: 'email@do.test',
            password: crypted,
            role: 'user'
          })
          .then(user => created = user)
          .then(() => done())
        })
   })

   it('.findById(id)', done => {
    User.findById(created.id)
      .then(user => {
        expect(user.attributes).toHaveProperty('username')
        expect(user.attributes).toHaveProperty('email')
        expect(user.attributes).toHaveProperty('role')
        expect(user.isValidPass).toBeDefined()
        done()
      })
    })
    describe('.isValidPass(password)', () => {
      it('', done => {
        const result = created.isValidPass('pass')
        expect(result).toBeTruthy()
        done()
      })
    })
  })
})
