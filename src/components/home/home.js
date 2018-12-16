import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import Session from 'services/session'
import Stats from 'components/stats'
import styles from './styles'

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props
    const user = Session.getUser()
    const content = user ? (
      <React.Fragment>
        <h3>Greetings, {user.name}</h3>
        <Stats />
      </React.Fragment>
    ) : (
      <h3>Welcome to fiary</h3>
    )
    return <div className={classes.wrapper}>{content}</div>
  }
}

export default injectSheet(styles)(Home)
