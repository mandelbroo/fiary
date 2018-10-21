import React from 'react'

import Authorized from './authorized/'
import Guest from './guest/'
import Session from '../services/session'

class Layout extends React.Component {
  render() {
    return Session.getUser() ? <Authorized /> : <Guest />
  }
}

export default Layout
