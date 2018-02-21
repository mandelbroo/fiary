import React from 'react'
import '../config/enzyme'
import { shallow, mount } from 'enzyme'
import TodayPage from './today-page'
import { DateTime } from 'luxon'
import RecordDay from '../components/record-day/record-day'

describe('TodayPage', () => {
	it('check for today entry with NO result', () => {
		const fakeEntry = {
			getTodayEntry: jest.fn().mockImplementation(() => Promise.resolve({}))
		}
		const wrapper = shallow(<TodayPage entry={fakeEntry}/>)
		expect(fakeEntry.getTodayEntry).toBeCalled()
		expect(wrapper.state('entry')).toBe(null)
	})
	it('check for today entry with result', async () => {
		let promise = {}
		const fakeRes = {
			data: {
				id: 991,
				day: '2045-12-30',
				records: [{id: 223, tags: ['fakeTag']}]
			}
		}
		const fakeEntry = {
			getTodayEntry: jest.fn()
				.mockImplementation(() => promise = Promise.resolve(fakeRes))
		}
		const wrapper = mount(<TodayPage entry={fakeEntry}/>)
		expect(fakeEntry.getTodayEntry).toBeCalled()
		await promise
		expect(wrapper.state('entry')).toMatchObject(fakeRes.data)
		wrapper.update()
		expect(wrapper.find(RecordDay).props().data).toMatchObject(fakeRes.data)
	})
	it('show current date and week day based on day property', () => {
		const fakeEntry = {
			getTodayEntry: jest.fn().mockImplementation(() => Promise.resolve({
				data: {
					day: DateTime.local().toISODate(),
				}
			}))
		}
		const wrapper = mount(<TodayPage entry={fakeEntry}/>)
		expect(wrapper.find('h1').text()).toBe(DateTime.local().weekdayLong)
	})
})
