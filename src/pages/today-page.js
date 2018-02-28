import React from 'react'
import RecordDay from '../components/record-day/record-day'
import { connect } from 'react-redux'
import getTodayRecords from '../actions/get-today-records'

export class TodayPage extends React.Component {
	componentDidMount = () => this.props.dispatchGetRecords()
	render = () => <RecordDay data={ this.props.entry } />
}

export const mapStateToProps = (state) => ({
	entry: state.today.entry
})
export const mapDispatchToProps = (dispatch) => ({
	dispatchGetRecords: () => dispatch(getTodayRecords())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TodayPage)
