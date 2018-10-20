import React from 'react'
import User from '../../models/user'
import injectSheet, { jss } from 'react-jss'
import styles from './styles'

export class Signin extends React.Component {
  state = {
    email: '',
    password: '',
  }
  style = jss.createStyleSheet(styles).attach().classes
  user = this.props.user || User

  change = ({ target }) => {
    let newState = {}
    newState[target.name] = target.value
    this.setState(newState)
    this._errorMessage = ''
  }

  submit = async (event) => {
    event.preventDefault()
    const res = await this.user.signin(this.state)
    if (res.success) this.props.history.push('/today')
    else this.props.history.push('/signin', { error: res.message })
  }

  get locationState() {
    return this.props.location && this.props.location.state
      ? this.props.location.state
      : {}
  }

  set locationState(value) {
    this.props.location.state = value
  }

  get errorMessage() {
    if (this.locationState.error) {
      this._errorMessage = this.locationState.error
      this.locationState = {}
    }
    return this._errorMessage
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <form onSubmit={this.submit} className={classes.form}>
          <input
            className={classes.input}
            type="email"
            name="email"
            onChange={this.change}
            placeholder="Email"
            autoComplete="email"
            required
          />
          <input
            className={classes.input}
            type="password"
            name="password"
            onChange={this.change}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          <input className={classes.button} type="submit" value="Get in" />
          {this.errorMessage ? (
            <div name="error" style={{ color: 'red' }}>
              {this.errorMessage}
            </div>
          ) : null}
        </form>
      </div>
    )
  }
}

export default injectSheet(styles)(Signin)
