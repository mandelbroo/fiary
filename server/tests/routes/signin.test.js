const request = require('supertest')
const app = require('../../')
const {User} = require('../../models');
const server = app.listen(5000)

describe('signin', () => {
  afterEach(done => server.close(() => done()))

  it('successfully logs in', done => {
    const req = {
      email: 'success@signin.com',
      password: 'StrongPass123'
    }
    User.encryptPassword(req.password)
      .then(crypted => {
        User.create({
          email: req.email,
          password: crypted,
          username: 'success'
        }).then(() => {
          request(app)
          .post('/api/signin')
          .type('json')
          .send(req)
          .expect(200)
          .end((err, {body}) => {
            expect(body).toHaveProperty('success')
            expect(body).toHaveProperty('message')
            expect(body).toHaveProperty('token')
            expect(body).toHaveProperty('user')
            expect(body.user).toHaveProperty('id')
            expect(body.user).toHaveProperty('name')
            expect(body.success).toBe(true)
            expect(body.message).toBe('Authenticated successfully')
            done(err)
          })
        })
      })
  })
  it('sets status to 401 if user does not exist', done => {
    const req = {
      email: 'not@exists.com',
      password: 'pass'
    }
    request(app)
      .post('/api/signin')
      .type('json')
      .send(req)
      .expect(401)
      .end((err, {body}) => {
        expect(body).toHaveProperty('success')
        expect(body).toHaveProperty('message')
        expect(body.success).toBe(false)
        expect(body.message).toBe('User not found')
        done(err)
      })
  })
  it('sets status to 401 if password is wrong', done => {
    const req = {
      email: 'wrong@pass.com',
      password: 'pass'
    }
    User.create({
      email: req.email,
      username: 'wrongname',
      password: 'wrong'
    })
    .then(() => {
      request(app)
        .post('/api/signin')
        .type('json')
        .send(req)
        .expect(401)
        .end((err, {body}) => {
          expect(body).toHaveProperty('success')
          expect(body).toHaveProperty('message')
          expect(body.success).toBe(false)
          expect(body.message).toBe('Wrong credentials')
          done(err)
        })
      })
  })
})
