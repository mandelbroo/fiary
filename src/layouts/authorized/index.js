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

const OVERRIDE = {
  overlay: { zIndex: 11 },
  sidebar: { zIndex: 12, width: '70%' },
}

class Authorized extends React.Component {
  state = { sidebarOpen: false }

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open })
  openSidebar = () => this.onSetSidebarOpen(true)

  get sidebarContent() {
    const { classes } = this.props
    return (
      <ul className={classes.side}>
        <li className={classes.logo}>
          <img src={logo} alt="fiary logo" />
          <h3 className={classes.title}>fiary</h3>
        </li>
        <li className={classes.item}>
          <Link to="/">Home</Link>
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
