import React, { Component } from 'react'
import injectSheet from 'react-jss'

import Session from 'services/session'
import styles from './styles'

class Home extends Component {
  render() {
    const { classes } = this.props
    const user = Session.getUser()
    const content = user ? (
      <h3>Greetings, {user.name}</h3>
    ) : (
      <h3>Welcome to fiary</h3>
    )
    return <div className={classes.wrapper}>{content}</div>
  }
}

export default injectSheet(styles)(Home)
