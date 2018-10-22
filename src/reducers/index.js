import entriesUpdate from './entries-update'
import editEntry from './edit-entry'
import selectRecord from './select-record'

export default (store = {}, action) => {
  return {
    ...store,
    entries: entriesUpdate(store, action),
    editingEntry: editEntry(store.editingEntry, action),
    selectedRecord: selectRecord(store.selectedRecord, action),
  }
}
