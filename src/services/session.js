import jwtDecode from 'jwt-decode'

const now = () => Date.now().valueOf() / 1000

export default class Session {
  static authorize(user, token) {
    const decoded = jwtDecode(token)
    if (decoded.exp > now()) {
      Store.setItem('token', token)
      this.setUser(user)
    }
  }
  static authToken() {
    return Store.getItem('token')
  }
  static getUser() {
    const userString = Store.getItem('user')
    if (userString) return JSON.parse(userString)
  }
  static setUser(user) {
    if (user) Store.setItem('user', JSON.stringify(user))
  }
  static logout() {
    Store.removeItem('token')
    Store.removeItem('user')
  }
  static get isValid() {
    const token = this.authToken()
    if (token) {
      const decoded = jwtDecode(token)
      return decoded.exp > now()
    }
    return false
  }
}

export class Store {
  static getKeyName(value) {
    if (!sessionStorage.origin)
      sessionStorage.origin = window.location.origin
        .replace('http://', '')
        .replace('https://', '')
    return `${sessionStorage.origin}-${value}`
  }
  static setItem(key, value) {
    localStorage.setItem(this.getKeyName(key), value)
  }
  static getItem(key) {
    return localStorage.getItem(this.getKeyName(key))
  }
  static removeItem(key) {
    localStorage.removeItem(this.getKeyName(key))
  }
}
