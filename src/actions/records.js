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
