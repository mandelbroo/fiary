import jwtDecode from 'jwt-decode'

const now = () => new Date().getTime() / 1000

export default class Session {
  static authorize(res) {
    const decoded = jwtDecode(res.token)
    if (decoded.exp > now()) {
      Store.setItem('token', res.token)
      this.setUser(res.user)
    }
  }
  static authToken() {
    return Store.getItem('token')
  }
  static getUser() {
    const userString = Store.getItem('user')
    if (userString)
      return JSON.parse(userString)
  }
  static setUser(user) {
    if (user)
      Store.setItem('user', JSON.stringify(user))
  }
  static logout() {
    Store.removeItem('token')
    Store.removeItem('user')
  }
}

export class Store {
  static getKeyName(value) {
    if (!sessionStorage.origin)
      sessionStorage.origin = window.location.origin.replace('http://', '').replace('https://', '')
    return `${sessionStorage.origin}-${value}`
  }
  static setItem (key, value) {
    return localStorage.setItem(this.getKeyName(key), value)
  }
  static getItem(key) {
    return localStorage.getItem(this.getKeyName(key))
  }
  static removeItem(key) {
    localStorage.removeItem(this.getKeyName(key))
  }
}
