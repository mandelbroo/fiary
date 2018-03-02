import { DateTime } from 'luxon'

export default () => {
	return {
		type: 'TODAY_DATE',
		payload: DateTime.local().toISODate()
	}
}
