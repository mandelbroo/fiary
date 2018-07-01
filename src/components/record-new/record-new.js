import React from 'react'
import Tagger from '../tagger/tagger'
import TagsFinder from '../../services/tags-finder'

import injectSheet from 'react-jss'
import styles from './styles'

export class RecordNew extends React.Component {
	state = this.props.data
		? this.props.data
		: {
			amount: '',
			income: false,
			tags: []
		}
	classes = this.props.classes || {}

	onSubmit = (event) => {
		event.preventDefault()
		this.props.onSubmit(this.state)
		this.clearState()
	}

	clearState = () => {
		this.setState({amount: '', income: false, tags: []})
		this.refs.tagger.clear()
	}

	tagsChange = (newState) => this.setState({tags: newState})

	render() {
		const symbolClass = this.state.income ? this.classes.plus : this.classes.minus
		return (
			<div className={ this.classes.container }>
				<form onSubmit={this.onSubmit} className={this.classes.form}>
					<div className={this.classes.left}>
						<label className={symbolClass}>
							<input type='checkbox'
								className={this.classes.check}
								checked={this.state.income}
								onChange={({target}) => this.setState({income: target.checked})} />
						</label>
						<input type='number' min='0' max='999999' step='0.01' required
							className={this.classes.amount + ' w3-input'}
							placeholder='amount'
							value={this.state.amount}
							onChange={({target}) => this.setState({amount: target.value})} />
					</div>
					<Tagger className={this.classes.right}
						onChange={this.tagsChange} ref='tagger' service={TagsFinder}/>
					<div className={this.classes.button}>
						<input type='submit' value='✓' />
					</div>
				</form>
			</div>)
	}
}

export default injectSheet(styles)(RecordNew)
