import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import { Entries } from './entries'
import DayTile from '../day-tile/day-tile'

jest.mock('../../actions', () => ({ getEntries: jest.fn() }))
import actions from '../../actions'

describe('Entries component', () => {

	const fakeDispatch = jest.fn()
	const fakeEntry = { day: '2022-04-20' }

	it('get entries dispatch', async () => {
		const wrapper = mount(<Entries entries={[fakeEntry]} dispatch={fakeDispatch} />)
		expect(fakeDispatch).toBeCalled()
		expect(actions.getEntries).toBeCalled()
	})

	it('clicking on day entry redirects to its page', async () => {
		const fakeRedirect = jest.fn().mockReturnValue('')
		const fakeHistory = { push: jest.fn() }
		const wrapper = mount(
			<Entries
				entries={[fakeEntry]}
				dispatch={fakeDispatch}
				redirect={fakeRedirect}
				history={fakeHistory} />
		)
		wrapper.find(DayTile).first().simulate('click')
		const expected = `/entry/${fakeEntry.day}`
		expect(fakeRedirect).toBeCalledWith(expected)
		expect(fakeHistory.push).toBeCalledWith(expected)
	})
})
