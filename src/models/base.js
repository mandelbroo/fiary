import axios from 'axios'
import config from 'config'
import Session from 'services/session'

export default class Base {
  static get(path) {
    return axios.get(path, this.config)
  }

  static get config() {
    return {
      baseURL: config.serverUrl,
      timeout: 1000,
      headers: { Authorization: Session.authToken() },
    }
  }

  static getPaged(page = 1, size = 15) {
    return this.get(`${this.endpoint}?page=${page}&size=${size}`)
  }

  static getAll() {
    return this.get(this.endpoint)
  }

  static getById(id) {
    return this.get(`${this.endpoint}/${id}`)
  }

  get config() {
    return Base.config
  }
}
