import axios from 'axios'
import config from '../config/default'
import Session from '../services/session'

export default {
  routes: {
    signup: 'signup',
    signin: 'signin',
  },
  post(path, params) {
    return axios.post(config.serverUrl + path, params)
      .then(res => {
        console.log(res.error)
        if (res.data.success)
          Session.authorize(res.data)
        return res.data
      })
      .catch(err => console.log('post error', err, err.response))
  }
}
