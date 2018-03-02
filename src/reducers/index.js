import { combineReducers } from 'redux'
import entriesUpdate from './entries-update'
import editEntry from './edit-entry'
import getTodayDate from './get-today-date'

export default combineReducers({
	today: getTodayDate,
	entries: entriesUpdate,
	editingEntry: editEntry
})
