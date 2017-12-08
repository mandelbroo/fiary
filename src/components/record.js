import React from 'react'

export default class Record extends React.Component {
  render() {
    return (
      <li>
        {this.props.entry.date}
        <br/>
        {this.props.entry.expences
          .map(ex => ex.amount)
          .reduce((acc, val) => { return acc += val}, 0)}
      </li>
    )
  }
}
