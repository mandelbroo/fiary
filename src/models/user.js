import axios from 'axios'
import config from '../config'
import Session from '../services/session'

export default class User {
  static async post(path, data) {
    try {
      const res = await axios.post(config.serverUrl + path, data)
      const { success, user, token } = res.data
      if (success) {
        Session.authorize(user, token)
      }
      return res.data
    } catch (err) {
      return err.response
        ? err.response.data
        : {
            success: false,
            message: 'Service is not accessible. Please try later',
          }
    }
  }

  static signin(data) {
    return this.post('/signin', data)
  }
  static signup(data) {
    return this.post('/signup', data)
  }
}
