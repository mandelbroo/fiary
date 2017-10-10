import React, { Component } from 'react'
import User from '../../models/user'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange({target}) {
    let newState = {}
    newState[target.name] = target.value
    this.setState(newState)
  }
  handleSubmit(event) {
    event.preventDefault()
    User.post(User.routes.signup, {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then(res => {
        if (res.success) {
          this.props.history.push('/')
        } else {
          this.props.history.push('/signup')
        }
      })
  }
  render() {
    return (
      <div>
        <h3>Registrer</h3>
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
