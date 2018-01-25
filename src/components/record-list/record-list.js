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
  }
}

const ItemView = (item, index) =>
  <li key={index}>
    <RecordView data={item}/>
    <a onClick={() => {this.props.onRemove(item)}}>×</a>
  </li>

const NoRecords = (className) => <span className={className}>no records yet</span>

export class RecordList extends React.Component {
  classes = this.props.classes || {}

  render() {
    const items = this.props.data ? [].concat(this.props.data) : []
    const records = items.map(ItemView)
    const content = records.length > 0 ? records : NoRecords(this.classes.noRecords)
    return (<ul className={ this.classes.list }>
        { content }
      </ul>)
  }
}

export default injectSheet(style)(RecordList)
