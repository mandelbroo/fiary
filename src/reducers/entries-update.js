export default (state, action) => {
  let entries = state.entries || {
    list: [],
    loaded: false,
    loading: false,
    error: '',
    removingRecordId: '',
    page: 1,
    totalPages: 0,
  }
  const record = action.payload
  switch (action.type) {
    case 'ADD_RECORD_FULFILLED':
      const oldEntry = entries.list.find(
        (e) => e.day === state.editingEntry
      ) || {
        day: state.editingEntry,
        records: [],
      }
      let upEntry = { ...oldEntry, records: oldEntry.records.concat([record]) }
      if (!upEntry.id) upEntry.id = record.entryId
      entries = {
        ...entries,
        list: immutableMerge(entries.list, upEntry),
        loading: false,
        loaded: true,
      }
      break
    case 'ADD_RECORD_PENDING':
    case 'GET_ENTRIES_PENDING':
    case 'GET_ENTRY_BY_DATE_PENDING':
      entries = { ...entries, loading: true }
      break
    case 'ADD_RECORD_REJECTED':
    case 'REMOVE_RECORD_REJECTED':
    case 'GET_ENTRIES_REJECTED':
    case 'GET_ENTRY_BY_DATE_REJECTED':
      entries = { ...entries, loading: false, error: action.payload }
      break
    case 'GET_ENTRY_BY_DATE_FULFILLED':
    case 'GET_ENTRIES_FULFILLED':
      const { collection, ...args } = action.payload

      entries = {
        ...entries,
        list: immutableMerge(entries.list, collection),
        loading: false,
        loaded: true,
        ...args,
      }
      break
    case 'REMOVE_RECORD_PENDING':
      entries = {
        ...entries,
        removingRecordId: state.selectedRecord.id,
        loading: true,
      }
      break
    case 'REMOVE_RECORD_FULFILLED':
      const entry = entries.list.find((e) => e.day === state.editingEntry)
      const newRecords = [].concat(entry.records)
      newRecords.pop(newRecords.find((r) => r.id === entries.removingRecordId))
      const newEntry = {
        ...entry,
        records: newRecords,
      }
      entries = {
        ...entries,
        list: immutableMerge(entries.list, newEntry),
        removingRecordId: '',
        loading: false,
        loaded: true,
      }
      break
    default:
      return entries
  }
  return entries
}

function immutableMerge(base, incoming) {
  return Array.isArray(incoming)
    ? immutableMergeArr(base, incoming)
    : immutableMergeItem(base, incoming)
}

function immutableMergeItem(array, item) {
  if (!item) return array
  const uplist = [item]
  return uplist.concat(array.filter((i) => i.day !== item.day))
}
function immutableMergeArr(base, incoming) {
  const incValues = incoming.map((i) => i.day)
  const unchanged = base.filter((i) => !incValues.includes(i.day))
  return [].concat(unchanged, incoming)
}
