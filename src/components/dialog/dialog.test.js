import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import Dialog from './dialog'

describe('Dialog', () => {
	it('render nested component', () => {
		const wrapper = mount(
			<Dialog>
				<h1>Test</h1>
			</Dialog>
		)
		expect(wrapper.find('h1').length).toBe(1)
	})
	it('render and use action', () => {
		const fakeAction = jest.fn()
		const wrapper = mount(
			<Dialog show={ true } onAction={ fakeAction } onActionText='fakeAction' />
		)
		expect(wrapper.state('show')).toBe(true)
		wrapper.find('button').first().simulate('click')
		expect(fakeAction).toBeCalled()
		expect(wrapper.state('show')).toBe(false)
	})
	it('hide on close clicked', () => {
		const fakeOnClose = jest.fn()
		const wrapper = mount(<Dialog show={ true } onClose={ fakeOnClose } />)
		wrapper.find('button').first().simulate('click')
		expect(fakeOnClose).toBeCalled()
		expect(wrapper.state('show')).toBe(false)
	})
	it('react on show prop update', () => {
		const wrapper = mount(<Dialog show={ true } />)
		expect(wrapper.state('show')).toBe(true)
		wrapper.setProps({ show: false })
		expect(wrapper.state('show')).toBe(false)
	})
	it('hide on click on background', () => {
		const wrapper = mount(<Dialog show={ true } />)
		expect(wrapper.state('show')).toBe(true)
		wrapper.simulate('click')
		expect(wrapper.state('show')).toBe(false)
	})
	it('do nothing on click on actual dialog', () => {
		const wrapper = mount(<Dialog show={ true } />)
		expect(wrapper.state('show')).toBe(true)
		wrapper.find('dialog').simulate('click')
		expect(wrapper.state('show')).toBe(true)
	})
})
