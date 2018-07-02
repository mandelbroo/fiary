import React, {Component} from 'react'

import {jss} from 'react-jss'
import styles from './styles'

export default class Tagger extends Component {
	state = {
		tags: this.props.tags || [],
		currentValue: '',
		suggestions: []
	}
	classes = jss.createStyleSheet(styles).attach().classes

	add = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			const val = this.state.currentValue
			if (val && val.length > 0) {
				const newTag = {
					id: - (this.state.tags.length + 1),
					name: val
				}
				const newTags = this.state.tags.concat([newTag])
				this.setState({
					tags: newTags,
					currentValue: ''
				})
				if (this.props.onChange)
					this.props.onChange(newTags)
			}
		}
	}

	change = ({target}) => {
		this.setState({currentValue: target.value})
		clearTimeout(this.timeout)
		if (this.props.service && target.value) {
			this.timeout = setTimeout(async () => {
				this.setState({suggestPromise: this.props.service.find(target.value)})
				const response = await this.state.suggestPromise
				this.setState({suggestions: response.data})
			}, 300)
		} else if (!target.value) {
			this.clear()
		}
	}

	remove = (id) => {
		const newTags = this.state.tags.filter(tag => tag.id !== id)
		this.setState({tags: newTags})
		if (this.props.onChange)
			this.props.onChange(newTags)
	}

	clear = () => this.setState({tags: [], currentValue: '', suggestions: []})

	pickSuggest = (tag) => {
		const newTags = this.state.tags.concat([tag])
		this.setState({
			tags: newTags,
			suggestions: [],
			currentValue: ''
		})
		if (this.props.onChange)
			this.props.onChange(newTags)
	}

	get tags() {
		return this.state.tags.map((tag, index) => (
			<span key={index} id={tag.id} className='tag'
				onClick={() => {this.remove(tag.id)}}>
				{tag.name}
			</span>
		))
	}

	get suggestions() {
		return this.state.suggestions.map((tag, index) => (
			<span key={index} className='suggest tag'
				onClick={() => {this.pickSuggest(tag)}}
			>
				{tag.name}
			</span>
		))
	}

	render() {
		return (
			<div className={`${this.props.className} ${this.classes.main}`}>
				{this.tags}
				<input type='text'
					placeholder='find a tag'
					value={this.state.currentValue}
					onChange={this.change}
					onKeyDown={this.add} />
				{this.suggestions}
			</div>
		)
	}
}
