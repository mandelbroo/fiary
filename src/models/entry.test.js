jest.mock('../config/default', () => {
	return {
		serverUrl: 'fakeServerUrl'
	}
})
jest.mock('axios', () => {
	return {
		post: jest.fn().mockImplementation(() => Promise.resolve({success: true}))
	}
})
jest.mock('../services/session')

import Entry from './entry'
import axios from 'axios'
import { DateTime } from 'luxon'

describe('Entry model', () => {
	it('.endpoint returns proper value', () => {
		expect(Entry.endpoint).toBe('entries')
	})
	it('.save works properly', async () => {
		const fakeData = {
			id: 888,
			records: [],
			day: '2019-06-02'
		}
		const entry = new Entry(fakeData)
		const res = await entry.save()
		expect(res).toMatchObject({success: true})
		expect(axios.post).toBeCalledWith('entries', fakeData, Entry.config)
	})
	it('.getTodayEntry return existing today entry', () => {
		Entry.get = jest.fn().mockImplementation(() => Promise.resolve({success: true}))
		Entry.getTodayEntry()
		expect(Entry.get).toBeCalledWith(`entries/${DateTime.local().toISODate()}`)
	})
	it('.getTodayEntry reuturns new entry object if entry not exist', async () => {
		Entry.get = jest.fn().mockImplementation(() => Promise.resolve({status: 204}))
		const today = await Entry.getTodayEntry()
		expect(today.id).not.toBeDefined()
		expect(today.day).toBe(DateTime.local().toISODate())
	})
})
