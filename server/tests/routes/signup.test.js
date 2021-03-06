const server = require('../../app').listen()
const request = require('supertest').agent(server)

describe('signup', () => {
  afterAll(() => server.close())

  it('successfully register user', (done) => {
    const req = {
      username: `${Date.now()}signup`,
      email: `${Date.now()}success@signup.net`,
      password: 'StrongPass123',
    }
    request
      .post('/api/signup')
      .type('json')
      .send(req)
      .expect(200)
      .end((err, { body }) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body).toHaveProperty('token')
        expect(body).toHaveProperty('user')
        expect(body.user).toHaveProperty('id')
        expect(body.user).toHaveProperty('name')
        expect(body.success).toBe(true)
        expect(body.message).toBe('User created successfully')
        done(err)
      })
  })
  it('400 if password is too weak', (done) => {
    const req = {
      username: 'somename',
      email: 'some@email.net',
      password: 'tooweak',
    }
    request
      .post('/api/signup')
      .type('json')
      .send(req)
      .expect(400)
      .end((err, { body }) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body).toHaveProperty('errors')
        expect(body.success).toBe(false)
        expect(body.message).toBe('Bad request')
        expect(body.errors).toEqual([
          {
            field: ['password'],
            location: 'body',
            messages: [
              '"password" length must be at least 8 characters long',
              '"password" with value "tooweak" fails to match the required pattern: /[a-zA-Z0-9]{8,30}/',
            ],
            types: ['string.min', 'string.regex.base'],
          },
        ])
        done(err)
      })
  })
  it('400 if username is too short', (done) => {
    const req = {
      username: 'a',
      email: 'some@email.net',
      password: 'StrongPass123',
    }
    request
      .post('/api/signup')
      .type('json')
      .send(req)
      .expect(400)
      .end((err, { body }) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body).toHaveProperty('errors')
        expect(body.success).toBe(false)
        expect(body.message).toBe('Bad request')
        expect(body.errors).toEqual([
          {
            field: ['username'],
            location: 'body',
            messages: ['"username" length must be at least 4 characters long'],
            types: ['string.min'],
          },
        ])
        done(err)
      })
  })
})
