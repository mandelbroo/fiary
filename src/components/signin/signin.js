import React from 'react'
import User from '../../models/user'
import './signin.css'

export default class Signin extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = ({target}) => {
    let newState = {}
    newState[target.name] = target.value
    this.setState(newState)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const res = await User.signin(this.state)
    const nextRoute = res.success ? '/' : '/signin'
    this.props.history.push(nextRoute)
  }

  render() {
    return (
      <div>
        <h3>Enter</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input className="text-field" type="email" name="email"
              onChange={this.handleChange}
              placeholder='Email'
              autoComplete='email'
              required />
          </div>
          <div>
            <input className="text-field" type="password" name="password"
              onChange={this.handleChange}
              placeholder='Password'
              autoComplete='current-password'
              required />
          </div>
          <input className="button-primary" type="submit" />
        </form>
      </div>
    )
  }
}
