import axios from 'axios'
import config from '../config/default'
import Session from '../services/session'

export default class Base {
  static get(path) {
    return axios.get(path, this.config)
  }

  static get config () {
    return {
      baseURL: config.serverUrl,
      timeout: 1000,
      headers: { 'Authorization': Session.authToken() }
    }
  }

  get config() {
    return Base.config
  }
}
