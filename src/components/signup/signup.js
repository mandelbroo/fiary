import React, { Component } from 'react'
import User from '../../models/user'
import { jss } from 'react-jss'
import styles from '../signin/styles'

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }
  style = jss.createStyleSheet(styles).attach().classes

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
    const inputClass = `w3-input w3-round-large ${this.style.publicInput}`
    const buttonClass = `w3-btn w3-round-large w3-border ${this.style.publicButton}`
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input className={inputClass} type='text' name='username'
              onChange={this.handleChange}
              placeholder='Username'
              autoComplete='username'
              required />
          </div>
          <div>
            <input className={inputClass} type='email' name='email'
              onChange={this.handleChange}
              placeholder='Email'
              autoComplete='email'
              required />
          </div>
          <div>
            <input className={inputClass} type='password' name='password'
              onChange={this.handleChange}
              placeholder='Password'
              autoComplete='new-password'
              required />
          </div>
          <div>
            <input className={inputClass} type='password' name='passwordConfirm'
              onChange={this.handleChange}
              placeholder='Confirm password'
              autoComplete='new-password'
              required />
          </div>
          <input className={buttonClass} type='submit' />
        </form>
      </div>
    )
  }
}
