import React from 'react'
import RecordView from '../record-view/record-view'
import injectSheet from 'react-jss'

const style = {
  list: {
    paddingLeft: 0,
    margin: 0
  }
}

const ItemView = (item, index) =>
  <li key={index}>
    <RecordView data={item}/>
    <a onClick={() => {this.props.onRemove(item)}}>×</a>
  </li>

export class RecordList extends React.Component {
  render() {
    const items = this.props.data ? [].concat(this.props.data) : []
    return (<ul className={ this.props.classes.list }>
        { items.map(ItemView) }
      </ul>)
  }
}

export default injectSheet(style)(RecordList)
