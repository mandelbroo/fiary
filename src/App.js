import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import injectSheet from 'react-jss'

import RouterRender from './router-render'
import { Logo, Navbar } from './components'
import Authorized from './components/authorized/authorized'
import Session from './services/session'
import store from './store'
import './global.css'
import styles from './App.style'

export class App extends React.Component {
  Guest = () => {
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
          <RouterRender />
        </div>
        <footer>made by vitalii@funemployed</footer>
      </div>
    )
  }

  render = () => (
    <Provider store={store}>
      <BrowserRouter>
        <Route>{Session.getUser() ? Authorized : this.Guest}</Route>
      </BrowserRouter>
    </Provider>
  )
}

export default injectSheet(styles)(App)
