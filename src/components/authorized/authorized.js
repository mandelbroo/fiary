import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import RouterRender from '../../router-render'
import TabBar from '../tab-bar/tab-bar'
import {jss} from 'react-jss'
import logo from '../logo/logo.svg'

const STYLE = {
  side: {
    width: '12em',
    height: '100%',
    backgroundColor: 'white',
    '& h3': {
      margin: 0,
      '& img': {
        height: '30px',
        width: '30px',
        transform: 'rotate(190deg)',
        marginBottom: '8px'
      }
    }
  },
  hamburger: {
    paddingLeft: '20px'
  }
}

const OVERRIDE = {
  overlay: { zIndex: 11},
  sidebar: { zIndex: 12}
}

class Hamburger extends React.Component {
  classes = `w3-container w3-cell w3-bar-item w3-button ${this.props.classes}`

  render = () =>
    <span onClick={this.props.onClick} className={this.classes}>☰</span>
}

export default class Authorized extends React.Component {
  state = { sidebarOpen: false }
  style = jss.createStyleSheet(STYLE).attach().classes

  onSetSidebarOpen = (open) => {
    this.setState({sidebarOpen: open})
  }

  openSidebar = () => this.setState({sidebarOpen: true})

  get sidebarContent() {
    const classes = `w3-light-grey w3-bar-block ${this.style.side}`
    return (
      <div className={classes}>
        <h3 className='w3-bar-item w3-button'>
          <img src={logo} alt='fiary logo'/>
          fiary
        </h3>
        <Link className='w3-bar-item w3-button' to='/'>Home</Link>
        <Link className='w3-bar-item w3-button' to='/logout'>Logout</Link>
      </div>)
  }

  render = () => (
    <Sidebar
      sidebar={this.sidebarContent}
      open={this.state.sidebarOpen}
      onSetOpen={this.onSetSidebarOpen}
      styles={OVERRIDE}
    >
      <div className="App">
        <Hamburger onClick={this.openSidebar} classes={this.style.hamburger} />
        <TabBar className='w3-cell' />
        <div className='content'>
          <RouterRender />
        </div>
      </div>
    </Sidebar>
  )
}
