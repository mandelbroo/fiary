import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import 'jest-localstorage-mock'
import { AuthorizedTest, Hamburger } from './authorized'
import Sidebar from 'react-sidebar'

describe('Sidebar', () => {
  it('mount ok', () => {
    const wrapper = shallow(<AuthorizedTest />)
  })
  it('hamburger open sidebar', () => {
    const wrapper = mount(<AuthorizedTest />)
    expect(wrapper.find(Sidebar).props().open).toBe(false)
    wrapper.find(Hamburger).simulate('click')
    expect(wrapper.find(Sidebar).props().open).toBe(true)
  })
})
