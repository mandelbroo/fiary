import React from 'react'
import App from './App'
import './config/enzyme'
import { mount } from 'enzyme'
import 'jest-localstorage-mock'

it('renders without crashing', () => {
  mount(<App />)
})
