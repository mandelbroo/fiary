import React from 'react'
import '../config/enzyme'
import { shallow, mount } from 'enzyme'
import TodayPage from './today-page'
import { DateTime } from 'luxon'
import RecordDay from '../components/record-day/record-day'
import Entry from '../models/entry'
import 'jest-localstorage-mock'
jest.mock('axios', () => {
	return {
		get: jest.fn().mockImplementation(() => Promise.resolve({
			status: 204
		}))
	}
})
import Session from '../services/session'
import axios from 'axios'
import jwt from 'jsonwebtoken'

describe('TodayPage', () => {
	it('check for today entry with result', async () => {
		let promise = {}
		const fakeRes = {
			id: 991,
			day: '2045-12-30',
			records: [{id: 223, tags: ['fakeTag']}]
		}
		const fakeEntry = {
			getTodayEntry: jest.fn()
				.mockImplementation(() => promise = Promise.resolve(fakeRes))
		}
		const wrapper = mount(<TodayPage entry={fakeEntry}/>)
		expect(fakeEntry.getTodayEntry).toBeCalled()
		await promise
		expect(wrapper.state('entry')).toMatchObject(fakeRes)
		wrapper.update()
		expect(wrapper.find(RecordDay).props().data).toMatchObject(fakeRes)
	})
	it('check for today entry with NO result', () => {
		const fakeToken = jwt.sign({userId: 1}, 'secret', {expiresIn: 86400})
		const fakeSession = {
			token: fakeToken,
			user: {id: 1, username: 'fakeUser'}
		}
		Session.authorize(fakeSession)
		const wrapper = shallow(<TodayPage entry={Entry}/>)
		expect(axios.get).toBeCalled()
		expect(wrapper.state('entry')).toBe(null)
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
