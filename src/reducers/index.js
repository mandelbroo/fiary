import { addRecord, removeRecord } from './entries'
import { immutableMerge } from './utils'

const DEFAULT_STATE = {
  entries: [],
  loading: false,
  error: '',
  removingRecordId: '',
  page: 1,
  totalPages: 0,
  selectedEntry: '',
  selectedRecord: null,
}

export default (store = DEFAULT_STATE, action) => {
  const { entries, selectedRecord, selectedEntry, removingRecordId } = store
  switch (action.type) {
    case 'EDIT_ENTRY':
      return { ...store, selectedEntry: action.payload }
    case 'EDIT_ENTRY_CLEAR':
      return { ...store, selectedEntry: '' }
    case 'ADD_RECORD_FULFILLED':
      return {
        ...store,
        entries: addRecord(entries, selectedEntry, action.payload),
        loading: false,
      }
    case 'ADD_RECORD_PENDING':
    case 'GET_ENTRIES_PENDING':
    case 'GET_ENTRY_BY_DATE_PENDING':
      return { ...store, loading: true }
    case 'ADD_RECORD_REJECTED':
    case 'REMOVE_RECORD_REJECTED':
    case 'GET_ENTRIES_REJECTED':
    case 'GET_ENTRY_BY_DATE_REJECTED':
      return { ...store, loading: false, error: action.payload }
    case 'GET_ENTRIES_FULFILLED':
      const { collection, ...args } = action.payload
      return {
        ...store,
        entries: immutableMerge(entries, collection),
        loading: false,
        ...args,
      }
    case 'GET_ENTRY_BY_DATE_FULFILLED':
      return {
        ...store,
        entries: immutableMerge(entries, action.payload),
        loading: false,
      }
    case 'REMOVE_RECORD_PENDING':
      return {
        ...store,
        removingRecordId: selectedRecord.id,
        loading: true,
      }
    case 'REMOVE_RECORD_FULFILLED':
      return {
        ...store,
        entries: removeRecord(entries, selectedEntry, removingRecordId),
        removingRecordId: '',
        loading: false,
      }
    case 'SELECT_RECORD':
      return {
        ...store,
        selectedRecord: action.payload,
      }
    case 'CLEAR_SELECTED_RECORD':
      return {
        ...store,
        selectedRecord: null,
      }
    default:
      return store
  }
}
