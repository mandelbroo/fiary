import React from 'react'
import '../config/enzyme'
import { shallow, mount } from 'enzyme'
import TodayPage from './today-page'

describe('TodayPage', () => {
  it('check for today entry with NO result', () => {
    const fakeEntry = {
      getTodayId: jest.fn()
    }
    const wrapper = shallow(<TodayPage entry={fakeEntry}/>)
    expect(fakeEntry.getTodayId).toBeCalled()
    expect(wrapper.state('todayId')).toBe(null)
  })
  it('check for today entry with result', async () => {
    let promise = {}
    const fakeEntry = {
      getTodayId: jest.fn().mockImplementation(() => {
        return promise = Promise.resolve({id: 166})
      })
    }
    const wrapper = mount(<TodayPage entry={fakeEntry}/>)
    expect(fakeEntry.getTodayId).toBeCalled()
    await promise
    expect(wrapper.state('todayId')).toBe(166)
    wrapper.update()
    expect(wrapper.children().props().id).toBe(166)
  })
})
