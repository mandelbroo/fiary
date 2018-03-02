import Base from './base'
import axios from 'axios'
import { DateTime } from 'luxon'

export default class Entry extends Base {
	constructor(data) {
		super()
		Object.assign(this, data)
	}

	static get endpoint() {return 'entries'}

	save = () => axios.post(
			Entry.endpoint,
			{
				id: this.id,
				records: this.records,
				day: this.day,
			},
			{ ...this.config }
		)

	static getByDate = (date) => {
		return Entry.get(`${Entry.endpoint}/${date}`)
			.then(res => res.status === 204
				? { day: date, records: [] } : res.data)
	}

	static getTodayEntry = () => {
		const today = DateTime.local().toISODate()
		return Entry.get(`${Entry.endpoint}/${today}`)
			.then(res => res.status === 204
				? { day: today, records: [] } : res.data)
	}
}
