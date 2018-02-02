const User = require('../../models/user')
const Entry = require('../../models/entry')

describe('User', () => {
  afterAll(done => User.connection.destroy(() => done()))

  describe('.create(attributes)', () => {
    it('creates and saves user', async () => {
      const user = await User.create({
        username: `${Date.now()}dotest`,
        email: `${Date.now()}email@do.test`,
        password: 'pass',
        role: 'user'
      })
      await user.refresh()  // apply bookshelf-camelcase
      expect(user.attributes.username).toBeDefined()
      expect(user.attributes.email).toBeDefined()
      expect(user.attributes.role).toBeDefined()
      expect(user.attributes.createdAt).toBeDefined()
      expect(user.attributes.updatedAt).toBeDefined()
    })
  })
  describe('create before each', () => {
    beforeAll(async () => {
      const cryptedPass = await User.encryptPassword('pass')
      citizen = await User.create({
        username: `${Date.now()}dotest`,
        email: `${Date.now()}email@do.test`,
        password: cryptedPass,
        role: 'user'
      })
    })

    describe('.findById(id)', () => {
      it('is defined', () => expect(User.findById).toBeDefined())
      it('returns existing user', async () => {
        const user = await User.findById(citizen.id)
        await user.refresh()  // apply bookshelf-camelcase
        expect(user.attributes.username).toBeDefined()
        expect(user.attributes.email).toBeDefined()
        expect(user.attributes.role).toBeDefined()
        expect(user.attributes.createdAt).toBeDefined()
        expect(user.attributes.updatedAt).toBeDefined()
      })
    })
    describe('.isValidPass(password)', () => {
      it('is defined', () => expect(citizen.isValidPass).toBeDefined())
      it("returns true if user's password match", () => {
        const result = citizen.isValidPass('pass')
        expect(result).toBeTruthy()
      })
    })
    describe('.entries', () => {
      it('is defined', () => expect(citizen.entries).toBeDefined())
      it("returns user's entires", async () => {
        await Entry.create({userId: citizen.id, day: '2000-01-01'})
        const entries = await citizen.entries().fetch()
        expect(entries.length).toEqual(1)
      })
    })
  })
})
