import axios from 'axios'
import config from '../config/default'
import Session from '../services/session'

export default class User {
  static async post(path, data) {
    try {
      const res = await axios.post(config.serverUrl + path, data)
      if (res.data.success) {
        Session.authorize(res.data)
      }
      return res.data
    } catch(err) {
      return err.response.data
    }
  }

  static signin(data) { return this.post('/signin', data) }
  static signup(data) { return this.post('/signup', data) }
}
