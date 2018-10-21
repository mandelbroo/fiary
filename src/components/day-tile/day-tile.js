import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import RecordList from '../record-list/record-list'
import styles from './styles.js'

export class DayTile extends React.Component {
  onClick = () => {
    const { click, entry } = this.props
    click(entry.day)
  }

  render() {
    const { classes, entry } = this.props
    return (
      <div className={classes.tile} onClick={this.onClick}>
        <h4>{entry.day}</h4>
        <RecordList records={entry.records} />
      </div>
    )
  }
}

DayTile.propTypes = {
  click: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired,
}

export default injectSheet(styles)(DayTile)
