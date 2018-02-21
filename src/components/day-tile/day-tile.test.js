import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import { DayTile } from './day-tile'

describe('DayTile', () => {
	it('success mount', () => {
		const wrapper = mount(<DayTile />)
	})
	it('call provided click handler', () => {
		const fakeClick = jest.fn()
		const fakeEntry = {
			id: 777
		}
		const wrapper = mount(<DayTile click={fakeClick} entry={fakeEntry}/>)
		wrapper.simulate('click')
		expect(fakeClick).toBeCalledWith(777)
	})
})
