import Record from '../models/record'

export default (record) => {
	return {
		type: 'ADD_RECORD',
		payload: Record.save(record).then(res => res.data.record)
	}
}
