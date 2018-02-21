import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../../config/enzyme'
import { mount } from 'enzyme'
import TabBar, { PATHS } from './tab-bar'

describe('TabBar', () => {
	it('mount ok', () => {
		const wrapper = mount(
			<BrowserRouter>
				<TabBar />
			</BrowserRouter>)
		const links = wrapper.find('a')
		expect(links.length).toBe(PATHS.length)
		expect(links.first().props().children).toBe(PATHS[0].name)
		expect(links.first().props().href).toBe(`/${PATHS[0].path}`)
		expect(links.last().props().children).toBe(PATHS[1].name)
		expect(links.last().props().href).toBe(`/${PATHS[1].path}`)
	})
})
