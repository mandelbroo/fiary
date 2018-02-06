import React from 'react'
import RecordView from '../record-view/record-view'
import injectSheet from 'react-jss'

const style = {
  list: {
    paddingLeft: 0,
    margin: 0
  },
  noRecords: {
    color: 'lightgrey'
  },
  listItem: {
    padding: '5px',
    '& div': {
      display: 'inline-block'
    },
    '& span': {
      display: 'inline-block'
    }
  },
}

const NoRecords = (className) => <span className={className}>no records yet</span>

export class RemoveButton extends React.Component {
  render = () => (
    <span role='img'
      aria-label='delete record'
      onClick={this.props.onClick}>❌</span>
    )
}

export class RecordList extends React.Component {
  classes = this.props.classes || {}

  removeButton = (item) => this.props.onRemove
      ? <RemoveButton onClick={ () => this.props.onRemove(item) }/> : ''

  render() {
    const items = this.props.data ? [].concat(this.props.data) : []
    const records = items.map((item, index) => (
      <li key={index} className={this.classes.listItem}>
        <RecordView data={item} />
        { this.removeButton(item) }
      </li>)
    )
    const content = records.length > 0 ? records : NoRecords(this.classes.noRecords)
    return (<ul className={ this.classes.list }>
        { content }
      </ul>)
  }
}

export default injectSheet(style)(RecordList)
