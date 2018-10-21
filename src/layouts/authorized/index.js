import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import Sidebar from 'react-sidebar'

import RoutesRender from 'config/routes-render'
import TabBar from 'components/tab-bar/tab-bar'
import Hamburger from 'components/hamburger'
import logo from 'components/logo/logo.svg'
import Session from 'services/session'
import Logout from 'components/logout/logout'
import styles from './styles'

const OVERRIDE = {
  overlay: { zIndex: 11 },
  sidebar: { zIndex: 12 },
}

class Authorized extends React.Component {
  state = { sidebarOpen: false }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open })
  openSidebar = () => this.onSetSidebarOpen(true)

  get sidebarContent() {
    const { classes } = this.props
    // const classes = `w3-light-grey w3-bar-block ${classes.side}`
    return (
      <div className={classes.side}>
        <h3 className="w3-bar-item w3-button">
          <img src={logo} alt="fiary logo" />
          fiary
        </h3>
        <Link className="w3-bar-item w3-button" to="/">
          Home
        </Link>
        <Link className="w3-bar-item w3-button" to="/logout">
          Logout
        </Link>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    if (!Session.isValid) return <Logout />
    return (
      <Sidebar
        sidebar={this.sidebarContent}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={OVERRIDE}
      >
        <div className="App">
          <Hamburger onClick={this.openSidebar} classes={classes.hamburger} />
          <TabBar className="w3-cell" />
          <div className="content">
            <RoutesRender />
          </div>
        </div>
      </Sidebar>
    )
  }
}

Authorized.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(Authorized)
