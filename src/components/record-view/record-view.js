import React from 'react'
import injectSheet from 'react-jss'

const style = {
	plus: {
		color: 'green',
		paddingRight: '4px'
	},
	minus: {
		paddingRight: '4px'
	},
	tag: {
		paddingRight: '4px'
	}
}

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
