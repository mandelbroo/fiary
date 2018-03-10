import entriesUpdate from './entries-update'
import editEntry from './edit-entry'
import getTodayDate from './get-today-date'
import selectRecord from './select-record'

export default (store = {}, action) => {
	return {
		...store,
		today: getTodayDate(store.today, action),
		entries: entriesUpdate(store, action),
		editingEntry: editEntry(store.editingEntry, action),
		selectedRecord: selectRecord(store.selectedRecord, action)
	}
}
