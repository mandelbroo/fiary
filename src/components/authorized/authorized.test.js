import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../../config/enzyme'
import { mount } from 'enzyme'
import 'jest-localstorage-mock'
import Authorized from './authorized'

describe('Sidebar', () => {
  it('mount ok', () => {
    const wrapper = mount(<BrowserRouter><Authorized /></BrowserRouter>)
  })
})
