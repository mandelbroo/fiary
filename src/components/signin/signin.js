import React from 'react'
import User from '../../models/user'

export default class Signin extends React.Component {
  state = {
    email: '',
    password: ''
  }

  user = this.props.user || User  // DI for tests

  change = ({target}) => {
    let newState = {}
    newState[target.name] = target.value
    this.setState(newState)
    this._errorMessage = ''
  }

  submit = async (event) => {
    event.preventDefault()
    const res = await this.user.signin(this.state)
    if (res.success)
      this.props.history.push('/')
    else
      this.props.history.push('/signin', {error: res.message})
  }

  get locationState () {
    return this.props.location && this.props.location.state
      ? this.props.location.state : {}
  }

  set locationState (value) { this.props.location.state = value }

  get errorMessage() {
    if (this.locationState.error) {
      this._errorMessage = this.locationState.error
      this.locationState = {}
    }
    return this._errorMessage
  }

  render() {
    return (
      <div>
        <h3>Enter</h3>
        <form onSubmit={this.submit}>
          <div>
            <input className="text-field" type="email" name="email"
              onChange={this.change}
              placeholder='Email'
              autoComplete='email'
              required />
          </div>
          <div>
            <input className="text-field" type="password" name="password"
              onChange={this.change}
              placeholder='Password'
              autoComplete='current-password'
              required />
          </div>
          <input className="button-primary" type="submit" />
          {this.errorMessage
            ? <div name='error' style={{color: 'red'}}>{this.errorMessage}</div>
            : null
          }
        </form>
      </div>
    )
  }
}
