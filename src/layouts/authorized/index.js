import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Sidebar from 'react-sidebar'
import injectSheet from 'react-jss'

import RoutesRender from 'config/routes-render'
import TabBar from 'components/tab-bar/tab-bar'
import Hamburger from 'components/hamburger'
import logo from 'components/logo/logo.svg'
import Session from 'services/session'
import Logout from 'components/logout/logout'
import styles from './styles'
import { zIndexOverlay, zIndexSidebar } from 'components/consts-styles'

const OVERRIDE = {
  overlay: { zIndex: zIndexOverlay },
  sidebar: { zIndex: zIndexSidebar, width: '100%' },
}

class Authorized extends React.Component {
  state = { sidebarOpen: false }

  openSidebar = () => this.setState({ sidebarOpen: !this.state.sidebarOpen })

  get sidebarContent() {
    const { classes } = this.props
    return (
      <ul className={classes.side}>
        <li className={classes.logo}>
          <img src={logo} alt="fiary logo" />
          <h3 className={classes.title}>fiary</h3>
        </li>
        <li className={classes.item}>
          <Link to="/" onClick={this.openSidebar}>
            Home
          </Link>
        </li>
        <li className={classes.item}>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    )
  }

  render() {
    const { classes } = this.props
    if (!Session.isValid) return <Logout />
    return (
      <Sidebar
        sidebar={this.sidebarContent}
        open={this.state.sidebarOpen}
        onSetOpen={this.openSidebar}
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
