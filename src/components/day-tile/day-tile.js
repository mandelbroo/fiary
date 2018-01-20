import React from 'react'
import injectSheet from 'react-jss'
import RecordList from '../record-list/record-list'

export class DayTile extends React.Component {
  entry = this.props.entry || {}
  classes = this.props.classes || {}

  click = () => this.props.click(this.entry.id)

  render() {
    return (
      <div className={ this.classes.tile } onClick={this.click}>
        <h4>{ this.entry.day }</h4>
        <RecordList data={this.entry.records} />
      </div>)
  }
}

const style = {
  tile: {
    boxShadow: '1px 1px 1px 1px lightgrey',
    margin: '10px 5%'
  }
}

export default injectSheet(style)(DayTile)
