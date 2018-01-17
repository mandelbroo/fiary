import React from 'react'
import injectSheet from 'react-jss'

const style = {
  plus: {
    color: 'green'
  },
}

const TagView = (tag, index) => <span key={ index }>{ tag.name } </span>

export class RecordView extends React.Component {
  render() {
    const data = this.props.data
    const operation = data.income ? '+' : '-'
    const operClass = data.income ? this.props.classes.plus : ''
    return (
      <div>
        <span className={ operClass }>{ operation }</span>
        <span className={ operClass }>{ data.amount } </span>
        { data.tags.map(TagView) }
      </div>)
  }
}

export default injectSheet(style)(RecordView)
