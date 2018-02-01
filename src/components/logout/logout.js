import React, { Component } from 'react'
import Session from '../../services/session'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  componentWillMount() {
    Session.logout()
    this.props.history.push('/signin')
  }
  render = () => <Redirect to='/signin' />
}
