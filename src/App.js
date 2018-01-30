import React from 'react'
import RouterRender from './router-render'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {Logo, Navbar} from './components'
import Authorized from './components/authorized/authorized'
import Session from './services/session'
import './App.css'

const Footer = () => (
  <footer className="w3-bottom">made by vitalii@funemployed</footer>
)

const Guest = (
  <div className="App">
    <div className="App-header">
      <Logo />
      <Link className='title' to='/'>fiary</Link>
      <span className="App-header-essence">
        Your personal financial diary
      </span>
    </div>
    <Navbar />
    <div className='content'>
      <RouterRender />
    </div>
    <Footer/>
  </div>
)

export class App extends React.Component {
  render = () => Session.getUser() ? <Authorized /> : Guest
}

class RouteApp extends React.Component {
  render = () => (
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  )
}

export default RouteApp
