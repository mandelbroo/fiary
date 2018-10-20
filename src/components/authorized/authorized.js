import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import RouterRender from '../../router-render'
import TabBar from '../tab-bar/tab-bar'
import { jss } from 'react-jss'
import logo from '../logo/logo.svg'
import Session from '../../services/session'
import Logout from '../logout/logout'
import style from './styles'

const OVERRIDE = {
  overlay: { zIndex: 11 },
  sidebar: { zIndex: 12 },
}

export class Hamburger extends React.Component {
  classes = `w3-container w3-cell w3-bar-item w3-button ${this.props.classes}`

  render = () => (
    <span onClick={this.props.onClick} className={this.classes}>
      ☰
    </span>
  )
}

export default class Authorized extends React.Component {
  state = { sidebarOpen: false }
  classes = jss.createStyleSheet(style).attach().classes

  onSetSidebarOpen = (open) => this.setState({ sidebarOpen: open })
  openSidebar = () => this.onSetSidebarOpen(true)

  get sidebarContent() {
    const classes = `w3-light-grey w3-bar-block ${this.classes.side}`
    return (
      <div className={classes}>
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

  render = () => {
    if (!Session.isValid) return <Logout />
    return (
      <Sidebar
        sidebar={this.sidebarContent}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={OVERRIDE}
      >
        <div className="App">
          <Hamburger
            onClick={this.openSidebar}
            classes={this.classes.hamburger}
          />
          <TabBar className="w3-cell" />
          <div className="content">
            <RouterRender />
          </div>
        </div>
      </Sidebar>
    )
  }
}

export class AuthorizedTest extends Authorized {
  render = () => (
    <BrowserRouter>
      <Authorized />
    </BrowserRouter>
  )
}
