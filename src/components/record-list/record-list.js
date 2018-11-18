import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import RecordView from '../record-view/record-view'
import RemoveButton from './remove-button'
import styles from './styles'

export class RecordList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    records: PropTypes.array,
    onRemove: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    onRemoveCancel: PropTypes.func.isRequired,
    onRecordClick: PropTypes.func.isRequired,
  }

  NoRecords = (classes) => <div className={classes}>no records yet</div>

  render() {
    const {
      classes,
      records,
      onRemoveClick,
      onRemoveCancel,
      onRemove,
      onRecordClick,
    } = this.props
    if (records.length === 0) return this.NoRecords(classes.noRecords)
    return (
      <ul className={classes.list}>
        {records.map((rec, ix) => (
          <li key={ix} className={classes.listItem}>
            <RecordView record={rec} onClick={onRecordClick} />
            <RemoveButton
              record={rec}
              onClick={onRemoveClick}
              onCancel={onRemoveCancel}
              onApprove={onRemove}
            />
          </li>
        ))}
      </ul>
    )
  }
}

export default injectSheet(styles)(RecordList)
