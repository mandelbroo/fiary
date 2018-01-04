import React from 'react'

export default class RecordView extends React.Component {
  render() {
    const data = this.props.data
    const operation = data.income ? '+' : '-'
    const list = data.tags.map((tag, index) =>
      <li key={index} className='tag'>{tag.name}</li>)
    return (
      <div className='record'>
        <span className='operation'>{operation}</span>
        <span className='amount'>{this.props.data.amount}</span>
        <ul>
          {list}
        </ul>
      </div>)
  }
}
