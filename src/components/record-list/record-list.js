import React from 'react'
import RecordView from '../record-view/record-view'

export default class RecordList extends React.Component {
  listItem = (item, index) =>
    <li key={index}>
      <RecordView data={item}/>
      <a onClick={() => {this.props.onRemove(item)}}>×</a>
    </li>

  render = () => {
    const items = this.props.data ? [].concat(this.props.data) : []
    return (<ul>
        {items.map(this.listItem)}
      </ul>)
  }
}
