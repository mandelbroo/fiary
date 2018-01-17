import React from 'react'
import Entry from '../../models/entry'
import RecordList from '../record-list/record-list'
import injectSheet from 'react-jss'
import styles from './styles'
import { Redirect } from "react-router-dom"

export class Entries extends React.Component {
  state = { entries: [] }

  componentDidMount = async () => {
    const res = await Entry.getAll({where: {}}, 15)
    if (res.data)
      this.setState({entries: res.data.collection})
  }

  click = (id) => this.setState({ redirectId: id })

  render() {
    if (this.state.redirectId) {
      const path = `/entry/${this.state.redirectId}`
      return <Redirect to={path} />
    }
    const records = this.state.entries
      .map((entry, index) =>
        <div key={ index } className={ this.props.classes.tile }
          onClick={ () => {this.click(entry.id)} }>
          <h4>{ entry.day }</h4>
          <RecordList data={entry.records} />
          </div>)
    return <div>{ records }</div>
  }
}

export default injectSheet(styles)(Entries)
