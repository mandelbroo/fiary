import React from 'react'
import 'jest-localstorage-mock'
import Index from './index'

it('index.js renders without crashing', () => {
	expect(JSON.stringify(
		Object.assign({}, Index, { _reactInternalInstance: 'censored' })
	)).toMatchSnapshot();
})
