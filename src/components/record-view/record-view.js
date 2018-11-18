import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import styles from './styles'

export class RecordView extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    editMode: PropTypes.bool,
    onClick: PropTypes.func,
  }

  TagView = (tag, index) => (
    <span className={this.props.classes.tag} key={index}>
      {tag.name}
    </span>
  )

  render() {
    const { record, classes, onClick } = this.props
    const operClass = record.income ? classes.plus : classes.minus
    return (
      <div className={classes.container} onClick={() => onClick(record)}>
        <span className={operClass}>{record.amount}</span>
        {record.tags.map(this.TagView)}
      </div>
    )
  }
}

export default injectSheet(styles)(RecordView)
