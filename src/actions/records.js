import Record from '../models/record'

export function addRecord(record) {
  return {
    type: 'ADD_RECORD',
    payload: Record.create(record).then((res) => res.data.record),
  }
}

export function updateRecord(record) {
  return {
    type: 'UPDATE_RECORD',
    payload: Record.update(record).then(({ data: { record } }) => record),
  }
}

export function removeRecord(record) {
  return {
    type: 'REMOVE_RECORD',
    payload: Record.destroy(record.id),
  }
}

export function editRecord(record) {
  return {
    type: 'EDIT_RECORD',
    payload: record,
  }
}

export function cancelEditRecord() {
  return {
    type: 'CANCEL_EDIT_RECORD',
    payload: '',
  }
}

export function selectRecord(record) {
  return {
    type: 'SELECT_RECORD',
    payload: record,
  }
}

export function clearSelectedRecord() {
  return {
    type: 'CLEAR_SELECTED_RECORD',
    payload: '',
  }
}
