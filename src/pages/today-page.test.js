import React from 'react'
import '../config/enzyme'
import { shallow, mount } from 'enzyme'

import RecordDay from '../components/record-day/record-day'
import ConnectedTodayPage from './today-page'
import { Provider } from 'react-redux'

jest.mock('../actions/get-today-records')
import getRecordsAction from '../actions/get-today-records'


const fakeStore = {
	dispatch: jest.fn(),
	getState: jest.fn().mockImplementation(() => ({ today: {}})),
	subscribe: jest.fn(),
}

describe('TodayPage', () => {
	it('load today records', async () => {
		const wrapper = mount(
			<Provider store={ fakeStore }>
				<ConnectedTodayPage />
			</Provider>)
		expect(fakeStore.dispatch).toBeCalled()
		expect(getRecordsAction).toBeCalled()
		expect(wrapper.find(RecordDay).length).toBe(1)
	})
})
