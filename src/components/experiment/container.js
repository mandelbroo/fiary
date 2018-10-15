import React from 'react'
import { connect } from 'react-redux'

import { getEntries as entries } from 'actions'
import ExperimentComponent from './experiment'

class ExperimentCotainer extends React.Component {
  render() {
    const { entries, getEntries } = this.props
    return <ExperimentComponent entries={entries} getEntries={getEntries} />
  }
}

const connectFunc = connect(
  ({ entries }) => ({
    entries: entries.list,
  }),
  (dispatch) => ({
    getEntries: () => dispatch(entries()),
    dispatch,
  })
)

export default connectFunc(ExperimentCotainer)
