import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import RoutesRender from '../../config/routes-render'
import { Logo, Navbar } from '../../components'
import styles from './styles'

class LayoutGuest extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Logo />
          <div className={classes.titleWrapper}>
            <Link className="title" to="/">
              fiary
            </Link>
          </div>
          <span>Your personal financial diary</span>
        </div>
        <Navbar />
        <div className={classes.content}>
          <RoutesRender />
        </div>
        <footer>made by vitalii@funemployed</footer>
      </div>
    )
  }
}

LayoutGuest.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(LayoutGuest)
