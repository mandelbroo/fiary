import React from 'react'
import {Link} from 'react-router-dom'

export const PATHS = [
	{name: 'Today', path: 'today'},
	{name: 'All', path: 'entries'}
]

export default class TabBar extends React.Component {
	render() {
		const items = PATHS.map((item, index) =>
			<Link className='w3-bar-item w3-button'
				key={index} to={`/${item.path}`}
			>
				{ item.name }
			</Link>
		)
		return (
			<div className={`w3-bar w3-black ${this.props.className}`}>
				{ items }
			</div>)
	}
}
