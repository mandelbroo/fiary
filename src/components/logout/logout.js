import React, { Component } from 'react'
import Session from '../../services/session'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  componentWillMount() {
    const { history } = this.props
    Session.logout()
    if (history) history.push('/signin')
  }
  render = () => <Redirect to="/signin" />
}
