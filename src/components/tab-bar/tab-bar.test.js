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
      </BrowserRouter>
    )
    const links = wrapper.find('a')
    expect(links).toHaveLength(PATHS.length)
    expect(links.at(0).props().children).toBe(PATHS[0].name)
    expect(links.at(0).props().href).toBe(`/${PATHS[0].path}`)
    expect(links.at(1).props().children).toBe(PATHS[1].name)
    expect(links.at(1).props().href).toBe(`/${PATHS[1].path}`)
    expect(links.at(2).props().children).toBe(PATHS[2].name)
    expect(links.at(2).props().href).toBe(`/${PATHS[2].path}`)
  })
})
