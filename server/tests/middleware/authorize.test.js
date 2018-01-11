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
  afterAll(async () => await User.connection.destroy())

  it('401 when token is empty', () => {
    let req = new ReqMock('empty', 'empty@mail')
    let res = new ResMock()
    req.token = ""
    authorize(req, res)
    expect(res.statusCode).toEqual(401)
    const expectBody = {
      success: false,
      message: 'Not authorized. Missing or invalid token'
    }
    expect(res.body).toMatchObject(expectBody)
  })
  it('401 when token is invalid', () => {
    let req = new ReqMock('invalid', 'invalid@mail')
    let res = new ResMock()
    req.token = "asdLASASdasj2asd"
    authorize(req, res)
    expect(res.statusCode).toEqual(401)
    const expectBody = {
      success: false,
      message: 'Not authorized. Missing or invalid token'
    }
    expect(res.body).toMatchObject(expectBody)
  })
  it('401 when token is valid but user not exists', async () => {
    let req = new ReqMock('user-not-exist', 'not-exist@mail')
    let res = new ResMock()
    authorize(req, res)
    expect(req.currentUserPromise).toBeDefined()
    const user = await req.currentUserPromise
    expect(user).toBeUndefined()
    expect(res.statusCode).toEqual(401)
    const expectBody = {
      success: false,
      message: 'Not authorized. User not found'
    }
    expect(res.body).toMatchObject(expectBody)
  })
  it('200 token valid and user exists', async () => {
    const user = await User.findOrCreate({
      username: `${Date.now()}success`,
      email: `${Date.now()}success@case.mail`,
      password: 'Qwerty1111'
    })
    await user.refresh()
    const req = new ReqMock(
      user.attributes.username,
      user.attributes.email,
      user.attributes.id
    )
    const res = new ResMock()
    expect.assertions(3)
    authorize(req, res, () => {
      expect(true).toBeTruthy()  // ensure next() being called
    })
    expect(req.currentUserPromise).toBeDefined()
    await req.currentUserPromise
    expect(req.currentUser).toBeDefined()
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
