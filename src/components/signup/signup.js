import React, { Component } from 'react'
import User from '../../models/user'

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }

  handleChange = ({target}) => {
    let newState = {}
    newState[target.name] = target.value
    this.setState(newState)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const res = await User.signup({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
    const nextRoute = res.success ? '/' : '/signup'
    this.props.history.push(nextRoute)
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input className="text-field" type="text" name="username"
              onChange={this.handleChange}
              placeholder='Username'
              required />
          </div>
          <div>
            <input className="text-field" type="email" name="email"
            onChange={this.handleChange}
            placeholder='Email'
            required />
          </div>
          <div>
            <input className="text-field" type="password" name="password"
            onChange={this.handleChange}
            placeholder='Password'
            required />
          </div>
          <div>
            <input className="text-field" type="password" name="passwordConfirm"
            onChange={this.handleChange}
            placeholder='Confirm password'
            required />
          </div>
          <input className="button-primary" type="submit" />
        </form>
      </div>
    )
  }
}
