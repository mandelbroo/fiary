import Session, { Store } from './session'
import jwt from 'jsonwebtoken'
import 'jest-localstorage-mock'

const token = jwt.sign({ userId: 1 }, 'secret', { expiresIn: 86400 })
const user = { id: 1, username: 'fakeUser' }

describe('Session service', () => {
  it('.authorize works', () => {
    Session.authorize(user, token)
    expect(Store.getItem('token')).toBe(token)
    expect(Store.getItem('user')).toBe(JSON.stringify(user))
  })
  it('.authToken works', () => {
    Session.authorize(user, token)
    expect(Session.authToken()).toBe(token)
  })
  it('.getUser works', () => {
    Session.authorize(user, token)
    expect(Session.getUser()).toMatchObject(user)
  })
  it('.setUser works', () => {
    const fakeUser = {
      id: 123,
      username: 'one-two-three',
    }
    Session.setUser(fakeUser)
    expect(Session.getUser()).toMatchObject(fakeUser)
  })
  it('.logout works', () => {
    const fakeUser = {
      id: 321,
      username: 'three-two-one',
    }
    Session.authorize(fakeUser, token)
    expect(Session.authToken()).toBeDefined()
    expect(Session.getUser()).toMatchObject(fakeUser)
    Session.logout()
    expect(Session.authToken()).toBe(null)
    expect(Session.getUser()).not.toBeDefined()
  })
  it('.isValid returns false if not authorized', () => {
    expect(Session.isValid).toBe(false)
  })
  it('.isValid returns false if token is expired', () => {
    const fakeUser = {
      id: 99,
      username: 'expired-user',
    }
    const fakeToken = jwt.sign({ userId: fakeUser.id }, 'secret', {
      expiresIn: -86400,
    })
    Session.authorize(fakeUser, fakeToken)
    expect(Session.isValid).toBe(false)
  })
  it('.isValid returns true if authorized', () => {
    const fakeUser = {
      id: 88,
      username: 'valid-user',
    }
    Session.authorize(fakeUser, token)
    expect(Session.isValid).toBe(true)
  })

  describe('Store object', () => {
    it('.getKeyName set session origin', () => {
      const key = Store.getKeyName('fakeKey')
      expect(sessionStorage.origin).toBe('localhost')
      expect(key).toBe('localhost-fakeKey')
    })
    it('.setItem works', () => {
      Store.setItem('setFakeKey', 'setFakeValue')
      expect(localStorage).toMatchObject({
        'localhost-setFakeKey': 'setFakeValue',
      })
    })
    it('.getItem works', () => {
      Store.setItem('getFakeKey', 'getFakeValue')
      expect(Store.getItem('getFakeKey')).toBe('getFakeValue')
    })
    it('.removeItem works', () => {
      Store.setItem('removeFakeKey', 'removeFakeValue')
      Store.removeItem('removeFakeKey')
      expect(Store.getItem('removeFakeKey')).toBe(null)
    })
  })
})
