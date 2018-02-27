import Entry from '../models/entry'

export default function getTodayRecords () {
	return {
		type: 'GET_TODAY_RECORDS',
		payload: Entry.getTodayEntry()
	}
}
