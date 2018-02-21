import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import Entries from './entries'
import DayTile from '../day-tile/day-tile'

describe('Entries component', () => {
	const fakeRes = {data: {collection: [
		{id: 24, day: '2016-01-12', records: [{amount: 10, tags: ['a']}]},
		{id: 25, day: '2016-01-13', records: [{amount: 20, tags: ['b']}]},
	]}}

	let promise = {}

	const fakeEntry = {
		getAll: jest.fn().mockImplementation(() =>
			promise = Promise.resolve(fakeRes))
	}

	it('get entries and render them', async () => {
		const wrapper = mount(<Entries entry={fakeEntry} />)
		await promise
		wrapper.update()
		expect(wrapper.state('entries')).toBe(fakeRes.data.collection)
		expect(wrapper.find(DayTile).length).toBe(2)
		expect(wrapper.find('h4').length).toBe(2)
	})
	it('clicking on day entry redirects to its page', async () => {
		const fakeRedirect = jest.fn().mockReturnValue('redirect...')
		const fakeHistory = {
			push: jest.fn()
		}
		const wrapper = mount(
			<Entries entry={fakeEntry} redirect={fakeRedirect} history={fakeHistory}/>)
		await promise
		wrapper.update()
		wrapper.find(DayTile).first().simulate('click')
		expect(fakeRedirect).toBeCalledWith('/entry/24')
		expect(fakeHistory.push).toBeCalledWith('/entry/24')
	})
})
