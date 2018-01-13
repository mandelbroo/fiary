import React from 'react'
import {Link} from 'react-router-dom'
import Session from '../../services/session'
import './navbar.css'

const guestPaths = [
  'signin',
  'signup',
]
const sessionPaths = [
  'today',
  'entries',
]

export default class Navbar extends React.Component {
  render() {
    let paths = Session.getUser() ? sessionPaths : guestPaths
    let items = []
    for(let path of paths) {
      let name = path.replace(path[0], path[0].toUpperCase())
      items.push(<li key={path}><Link to={`/${path}`}>{name}</Link></li>)
    }
    return <ul className='navbar'>{items}</ul>
  }
}
