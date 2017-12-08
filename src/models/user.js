import axios from 'axios'
import config from '../config/default'
import Session from '../services/session'

export default class User {
  static get routes() {
    return {
      signup: 'signup',
      signin: 'signin',
      users: '/api/users',
    }
  }
  static post(path, data) {
    return axios.post(config.serverUrl + path, data)
      .then(res => {
        if (res.data.success)
          Session.authorize(res.data)
        return res.data
      })
      .catch(err => console.log('post error', err, err.response))
  }
}
