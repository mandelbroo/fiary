const jwtgen = require('../../utils/jwt-generate')
const authorize = require('../../middleware/authorize').default
const {getPayload, getToken} = require('../../middleware/authorize')
const User = require('../../models/user')

function ReqMock(username, email, id = 1) {
  const _payload = {id: id, username: username, email: email, role: 'user'}
  const _token = jwtgen(_payload)
  return {
    payload: _payload,
    token: _token,
    header: 'Authorization',
    baseUrl: '/api',
    connection: {remoteAddress: 'test'},
    get(header) {
      if (this.header === 'Authorization')
        return this.token
    }
  }
}

function ResMock() {
  let _statusCode, _body
  return {
    get statusCode() { return _statusCode },
    get body() { return _body },
    status (value) {
      _statusCode = value
      return this
    },
    send(body){ _body = body}
  }
}

describe('authorize(req, res, next)', () => {
  afterAll(done => {
    Promise.all([
      User.connection.destroy(),
    ]).then(() => done())
  })

  it('401 when token is empty', done => {
    let req = new ReqMock('empty', 'empty@mail')
    let res = new ResMock()
    req.token = ""
    authorize(req, res)
    expect(res.statusCode).toEqual(401)
    expect(res.body).toEqual({
        success: false,
        message: 'Not authorized. Missing or invalid token'
      })
    done()
  })
  it('401 when token is invalid', done => {
    let req = new ReqMock('invalid', 'invalid@mail')
    let res = new ResMock()
    req.token = "asdLASASdasj2asd"
    authorize(req, res)
    expect(res.statusCode).toEqual(401)
    expect(res.body).toEqual({
        success: false,
        message: 'Not authorized. Missing or invalid token'
      })
    done()
  })
  it('401 when token is valid but user not exists', done => {
    let req = new ReqMock('user-not-exist', 'not-exist@mail')
    let res = new ResMock()
    authorize(req, res)
    expect(req.currentUserPromise).toBeDefined()
    req.currentUserPromise.then((user) => {
      expect(user).toBeUndefined()
      expect(res.statusCode).toEqual(401)
      expect(res.body).toEqual({
          success: false,
          message: 'Not authorized. User not found'
        })
      done()
    })
  })
  it('200 token valid and user exists', done => {
    User.create({
      username: 'success',
      email: 'success@case.mail',
      password: 'Qwerty1111'
    })
      .then(user => {return user.refresh()})
      .then(user => {
        const req = new ReqMock(
          user.attributes.username,
          user.attributes.email,
          user.attributes.id)
        const res = new ResMock()
        expect.assertions(3)
        authorize(req, res, () => {
          expect(true).toBeTruthy() // ensure being next() called
        })
        expect(req.currentUserPromise).toBeDefined()
        req.currentUserPromise.then(() => {
          expect(req.currentUser).toBeDefined()
          done()
        })
      })
  })

  it('not crashes when request with empty token', () => {
    const req = ReqMock('')
    req.token = ''
    authorize(req, ResMock())
  })

  describe('.getPayload(token)', () => {
    it('returns payload', () => {
      const req = new ReqMock()
      const payload = getPayload(req)
      expect(payload.email).toBe(req.payload.email)
      expect(payload.username).toBe(req.payload.username)
      expect(payload.id).toBe(req.payload.id)
      expect(payload.role).toBe(req.payload.role)
      expect(payload).toHaveProperty('iat')
      expect(payload).toHaveProperty('exp')
    })
    it('not crashes when request with empty token', () => {
      const req = new ReqMock()
      req.token = ''
      getPayload(req)
    })
  })

  describe('.getToken(req, payload)', () => {
    it('returns token from Authorization header', () => {
      const req = new ReqMock()
      const token = getToken(req)
      expect(token).toBe(req.token)
    })
    it('returns token from params', () => {
      const req = new ReqMock()
      req.header = ''
      req.params = {bearer: {token: req.token}}
      const token = getToken(req)
      expect(token).toBe(req.token)
    })
    it('not crashes when request with empty token', () => {
      const req = new ReqMock()
      req.token = ''
      getToken(req)
    })
  })
})
