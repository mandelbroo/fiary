import React from 'react'
import { DateTime } from 'luxon'

import { jss } from 'react-jss'
import styles from './styles'

export class DayHeader extends React.Component {
	get weekday () { return DateTime.fromISO(this.props.entry.day).weekdayLong }

	render() {
		const classes = jss.createStyleSheet(styles).attach().classes
		return (
			<div className={classes.container}>
				<h3 className={classes.heading}>{ this.weekday }</h3>
				<h5>{ this.props.entry.day }</h5>
			</div>
		)
	}
}

export default DayHeader
