const User = require('../../models/user')

describe('User', () => {
  afterAll(done => User.connection.destroy(() => done()))

  describe('.create(attributes)', () => {
    it('creates and saves user', done => {
      User.create({
        username: 'dotest',
        email: 'email@do.test',
        password: 'pass',
        role: 'user'
      })
      .then(user => {return user.refresh()})  // to apply bookshelf-camelcase
      .then(user => {
        expect(user.attributes).toHaveProperty('username')
        expect(user.attributes).toHaveProperty('email')
        expect(user.attributes).toHaveProperty('role')
        expect(user.attributes.createdAt).toBeDefined()
        expect(user.attributes.updatedAt).toBeDefined()
        done()
      })
    })
  })
  describe('create before each', () => {
    beforeAll(done => {
      User.encryptPassword('pass')
        .then(crypted => {
          User.create({
            username: 'dotest',
            email: 'email@do.test',
            password: crypted,
            role: 'user'
          })
          .then(user => citizen = user)
          .then(() => done())
        })
    })

    describe('.findById(id)', () => {
      it('is defined', () => expect(User.findById).toBeDefined())
      it('returns existing user', done => {
        User.findById(citizen.id)
          .then(user => {return user.refresh()})  // to apply bookshelf-camelcase
          .then(user => {
            expect(user.attributes).toHaveProperty('username')
            expect(user.attributes).toHaveProperty('email')
            expect(user.attributes).toHaveProperty('role')
            expect(user.attributes.createdAt).toBeDefined()
            expect(user.attributes.updatedAt).toBeDefined()
            done()
          })
      })
    })
    describe('.isValidPass(password)', () => {
      it('is defined', () => expect(citizen.isValidPass).toBeDefined())
      it("returns true if user's password match", done => {
        const result = citizen.isValidPass('pass')
        expect(result).toBeTruthy()
        done()
      })
    })
    describe('.entries', () => {
      it('is defined', () => expect(citizen.entries).toBeDefined())
      it("returns user's entires", () => {
        const entries = citizen.entries()
        expect(entries.length).toEqual(0)
      })
    })
  })
})
