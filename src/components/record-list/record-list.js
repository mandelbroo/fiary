import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import RecordView from '../record-view/record-view'
import RemoveButton from './remove-button'
import styles from './styles'

export class RecordList extends React.Component {
  state = {
    clicked: false,
  }

  NoRecords = (classes) => <div className={classes}>no records yet</div>

  render() {
    const {
      classes,
      records,
      onRemoveClick,
      onRemoveCancel,
      onRemove,
    } = this.props
    const list = records
      ? records.map((rec, ix) => (
          <li key={ix} className={classes.listItem}>
            <RecordView data={rec} />
            <RemoveButton
              record={rec}
              onClick={onRemoveClick}
              onCancel={onRemoveCancel}
              onApprove={onRemove}
            />
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
  onRemove: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onRemoveCancel: PropTypes.func.isRequired,
}

export default injectSheet(styles)(RecordList)
