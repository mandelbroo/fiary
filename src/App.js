import React from 'react'
import RouterRender from './router-render'
import {Link} from 'react-router-dom'
import {Logo, Navbar} from './components'
import './App.css'

const Footer = () => (
  <footer>made by vitalii@funeployed</footer>
)

export default class App extends React.Component {
  render() {
    return (
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
  }
}
