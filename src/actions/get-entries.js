import Entry from '../models/entry'

export default (date) => {
	return {
		type: 'GET_ENTRIES',
		payload: date
			? Entry.getByDate(date)
			: Entry.getAll().then(res => res.collection)
	}
}
