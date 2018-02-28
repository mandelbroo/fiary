import { combineReducers } from 'redux'
import getTodayRecords from './get-today-records'

export default combineReducers({
	today: getTodayRecords,
})
