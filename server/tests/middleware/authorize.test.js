const jwtgen = require('../../utils/jwt-generate')
const authorize = require('../../middleware/authorize').default
const {getPayload, getToken} = require('../../middleware/authorize')

function ReqMock() {
  const _payload = {id: 1, username: 'ololo', email: 'em@il.com', role: 'user'}
  const _token = jwtgen(_payload)
  return {
    payload: _payload,
    token: _token,
    header: 'Authorization',
    baseUrl: '/api',
    get(header) {
      if (this.header === 'Authorization')
        return this.token
    }
  }
}

function ResMock() {
  return {
    status() {
      return {send(){}}
    },
  }
}

describe('authorize(req, res, next)', () => {
  it('next() is called when token is valid', done => {
    expect.assertions(1)
    let nextCalled = false
    authorize(ReqMock(), ResMock(), () => {
      nextCalled = true
      expect(nextCalled).toBe(true)
      done()
    })
  })

  it('not crashes when request with empty token', () => {
    const req = ReqMock('')
    req.token = ''
    authorize(req, ResMock())
  })

  describe('.getPayload(token)', () => {
    it('returns payload', () => {
      const req = ReqMock()
      const payload = getPayload(req.token)
      expect(payload.email).toBe(req.payload.email)
      expect(payload.username).toBe(req.payload.username)
      expect(payload.id).toBe(req.payload.id)
      expect(payload.role).toBe(req.payload.role)
      expect(payload).toHaveProperty('iat')
      expect(payload).toHaveProperty('exp')
    })
    it('not crashes when request with empty token', () => {
      const req = ReqMock()
      req.token = ''
      getPayload(req.token)
    })
  })

  describe('.getToken(req, payload)', () => {
    it('returns token from Authorization header', () => {
      const req = ReqMock()
      const token = getToken(req)
      expect(token).toBe(req.token)
    })
    it('returns token from params', () => {
      const req = ReqMock()
      req.header = ''
      req.params = {bearer: {token: req.token}}
      const token = getToken(req)
      expect(token).toBe(req.token)
    })
    it('not crashes when request with empty token', () => {
      const req = ReqMock()
      req.token = ''
      getToken(req)
    })
  })
})
