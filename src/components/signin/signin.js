import React from 'react'
import User from '../../models/user'
import './signin.css'

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
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
    User.post(User.routes.signin, this.state)
      .then(res => {
        if (res.success) {
          this.props.history.push('/')
        } else {
          this.props.history.push('/signin')
        }
      })
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
              required />
          </div>
          <div>
            <input className="text-field" type="password" name="password"
              onChange={this.handleChange}
              placeholder='Password'
              required />
          </div>
          <input className="button-primary" type="submit" />
        </form>
      </div>
    )
  }
}
