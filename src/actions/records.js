import Record from '../models/record'

export function addRecord(record, entry) {
	if (!entry.id)
		record.entry = { day: entry.day }
	else
		record.entryId = entry.id
	return {
		type: 'ADD_RECORD',
		payload: Record.save(record).then(res => res.data.record)
	}
}

export function removeRecord(record) {
	return {
		type: 'REMOVE_RECORD',
		payload: Record.destroy(record.id)
	}
}

export function editRecord(record) {
	return {
		type: 'EDIT_RECORD',
		payload: record
	}
}

export function cancelEditRecord(record) {
	return {
		type: 'CANCEL_EDIT_RECORD',
		payload: ''
	}
}

export function selectRecord(record) {
	return {
		type: 'SELECT_RECORD',
		payload: record
	}
}

export function clearSelectedRecord(record) {
	return {
		type: 'CLEAR_SELECTED_RECORD',
		payload: ''
	}
}