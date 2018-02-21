import React from 'react'
import '../config/enzyme'
import { mount } from 'enzyme'
import EntriesPage, {redirect} from './entries-page'
import { Redirect } from 'react-router-dom'
import 'jest-localstorage-mock'

jest.mock('axios', () => ({
	get: jest.fn().mockImplementation(() => Promise.resolve({ data: { collection: [] } }))
}))

describe('EntriesPage', () => {
	it('render ok', () => {
		const wrapper = mount(<EntriesPage />)
	})
	it('redirect ok', async () => {
		const result = redirect('/path')
		expect(result.type).toBe(Redirect)
		expect(result.props.to).toBe('/path')
	})
})
