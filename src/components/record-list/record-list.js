import React from 'react'
import RecordView from '../record-view/record-view'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import styles from './styles'

export class RecordList extends React.Component {
  NoRecords = (classes) => <span className={classes}>no records yet</span>

  CrossButton = (clickFunc) => {
    const { classes } = this.props
    return (
      <button className={classes.removeButton} onClick={clickFunc}>
        <span role="img" aria-label="close">
          ❌
        </span>
      </button>
    )
  }

  removeButton = (item) => {
    const { onRemove } = this.props
    if (onRemove) this.CrossButton(() => onRemove(item))
  }

  render() {
    const { classes, records } = this.props
    const list = records
      ? records.map((r, ix) => (
          <li key={ix} className={classes.listItem}>
            <RecordView data={r} />
            {this.removeButton(r, classes)}
          </li>
        ))
      : []
    const content = list.length > 0 ? list : this.NoRecords(classes.noRecords)
    return <ul className={classes.list}>{content}</ul>
  }
}

RecordList.propTypes = {
  classes: PropTypes.object.isRequired,
  records: PropTypes.array,
  onRemove: PropTypes.func,
}

export default injectSheet(styles)(RecordList)
