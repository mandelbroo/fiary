import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types';

import styles from './styles'

export class RecordView extends React.Component {
	TagView = (tag, index) =>
		<span className={this.props.classes.tag} key={index}>{tag.name}</span>

	render() {
		const { data, classes } = this.props
		const operClass = data.income ? classes.plus : classes.minus
		return (
			<div className={classes.container}>
				<span className={operClass}>{ data.amount }</span>
				{ data.tags.map(this.TagView) }
			</div>)
	}
}
RecordView.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
}

export default injectSheet(styles)(RecordView)
