import {
	editRecord,
	cancelEditRecord,
} from './records'

describe('records actions', () => {
	it('EDIT_RECORD', () => {
		const obj = {
			type: 'EDIT_RECORD',
			payload: 'test'
		}
		expect(editRecord('test')).toMatchObject(obj)
	})
	
	it('CANCEL_EDIT_RECORD', () => {
		const obj = {
			type: 'CANCEL_EDIT_RECORD',
			payload: ''
		}
		expect(cancelEditRecord()).toMatchObject(obj)
	})
})