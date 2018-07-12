import React from 'react'
import injectSheet from 'react-jss'

import style from './style'

export class RecordView extends React.Component {
	TagView = (tag, index) =>
		<span className={ this.props.classes.tag }key={ index }>{ tag.name }</span>

	render() {
		const data = this.props.data
		const operation = data.income ? '+' : '-'
		const operClass = data.income ? this.props.classes.plus : this.props.classes.minus
		return (
			<div>
				<span className={ operClass }>{ operation }</span>
				<span className={ operClass }>{ data.amount }</span>
				{ data.tags.map(this.TagView) }
			</div>)
	}
}

export default injectSheet(style)(RecordView)
