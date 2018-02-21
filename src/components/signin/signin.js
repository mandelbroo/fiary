import React from 'react'
import User from '../../models/user'
import { jss } from 'react-jss'
import styles from './styles'

export default class Signin extends React.Component {
	state = {
		email: '',
		password: ''
	}
	style = jss.createStyleSheet(styles).attach().classes
	user = this.props.user || User	// DI for tests

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
		const inputClass = `w3-input w3-round-large ${this.style.publicInput}`
		const buttonClass = `w3-btn w3-round-large w3-border ${this.style.publicButton}`
		return (
			<div>
				<h3>Enter</h3>
				<form onSubmit={this.submit} className={this.style.publicForm}>
					<input className={inputClass} type='email' name='email'
						onChange={this.change}
						placeholder='Email'
						autoComplete='email'
						required />
					<input className={inputClass} type='password' name='password'
						onChange={this.change}
						placeholder='Password'
						autoComplete='current-password'
						required />
					<input className={buttonClass}
						type='submit' />
					{this.errorMessage
						? <div name='error' style={{color: 'red'}}>{this.errorMessage}</div>
						: null
					}
				</form>
			</div>
		)
	}
}
