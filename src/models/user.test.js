jest.mock('../config/default', () => ({ serverUrl: 'fakeServerUrl' }))
jest.mock('../services/session', () => ({ authorize: jest.fn() }))
jest.mock('axios', () => ({
  post: jest.fn()
    .mockImplementationOnce(() => Promise.resolve({data: {success: true}}))
    .mockImplementationOnce(() => Promise.resolve({data: {success: true}}))
    .mockImplementationOnce(() => Promise.reject(
      {response: {data: {message: 'error happened'}}}
    ))
}))

import User from './user'
import axios from 'axios'
import session from '../services/session'

describe('User model', () => {
  it('signin works', async () => {
    const data = {
      email: 'anon@mail.go',
      password: '1234'
    }
    const res = await User.signin(data)
    expect(res.success).toBe(true)
    expect(axios.post).toBeCalled()
    expect(session.authorize).toBeCalled()
  })
  it('signup works', async () => {
    const data = {
      username: 'anon',
      email: 'anon@mail.go',
      password: '1234'
    }
    const res = await User.signup(data)
    expect(res.success).toBe(true)
    expect(axios.post).toBeCalled()
    expect(session.authorize).toBeCalled()
  })
  it('error handling works', async () => {
    const data = {
      username: 'anon',
      email: 'anon@mail.go',
      password: '1234'
    }
    const err = await User.signup(data)
    expect(err.message).toBeDefined()
    expect(axios.post).toBeCalled()
  })
})
