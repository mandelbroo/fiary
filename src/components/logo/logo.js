import React from 'react'
import logo from './logo.svg'
import './logo.css'

export default class Logo extends React.Component {
  render() { return (
      <a href='/'>
        <img src={logo} className="logo" alt="logo" />
      </a>
  )}
}
