jest.mock('../../services/session', () => ({ logout: jest.fn() }))

import React from 'react'
import '../../config/enzyme'
import { shallow } from 'enzyme'
import 'jest-localstorage-mock'
import Session from '../../services/session'
import Logout from './logout'


describe('Logout', () => {
	it('do the stuff', () => {
		const fakeHistory = {
			push: jest.fn()
		}
		const wrapper = shallow(<Logout history={fakeHistory}/>)
		expect(fakeHistory.push).toBeCalledWith('/signin')
		expect(Session.logout).toBeCalled()
	})
})
