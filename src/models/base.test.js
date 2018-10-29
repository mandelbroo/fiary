jest.mock('../config/index', () => {
  return {
    serverUrl: 'fakeServerUrl',
  }
})
jest.mock('../services/session', () => {
  return {
    authToken: jest.fn().mockReturnValue('fakeToken'),
  }
})
jest.mock('axios', () => {
  return {
    get: jest.fn().mockImplementation(() => Promise.resolve({ success: true })),
  }
})
import Base from './base'
import Session from '../services/session'
import axios from 'axios'

describe('Base model', () => {
  it('static .config returns proper values', () => {
    const config = Base.config
    expect(config.baseURL).toBeDefined()
    expect(config.headers).toMatchObject({ Authorization: 'fakeToken' })
    expect(Session.authToken).toBeCalled()
  })
  it('instance .config returns proper values', () => {
    const config = Base.config
    class Offspring extends Base {}
    const instance = new Offspring()
    expect(instance.config).toMatchObject(Base.config)
  })
  it('.get calls axios.get', () => {
    Base.get('somePath')
    expect(axios.get).toBeCalledWith('somePath', {
      baseURL: 'fakeServerUrl',
      headers: { Authorization: 'fakeToken' },
      timeout: 1000,
    })
  })
  it('.getAll called with proper endpoint', () => {
    Base.endpoint = '/base'
    Base.get = jest.fn()
    Base.getAll()
    expect(Base.get).toBeCalledWith('/base')
  })
  it('.getById called properly', () => {
    Base.endpoint = '/base'
    Base.get = jest.fn()
    Base.getById(123)
    expect(Base.get).toBeCalledWith('/base/123')
  })
})
