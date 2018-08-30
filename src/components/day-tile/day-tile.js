import React from 'react'
import PropTypes from 'prop-types'
import RecordList from '../record-list/record-list'

import injectSheet from 'react-jss'
import styles from './styles.js'

export class DayTile extends React.Component {
  entry = this.props.entry || {}
  classes = this.props.classes || {}

  click = () => this.props.click(this.entry.day)

  render() {
    return (
      <div className={this.classes.tile} onClick={this.click}>
        <h4>{this.entry.day}</h4>
        <RecordList data={this.entry.records} />
      </div>
    )
  }
}

DayTile.propTypes = {
  click: PropTypes.func.isRequired,
}

export default injectSheet(styles)(DayTile)
