import React from 'react'
import '../../config/enzyme'
import { shallow } from 'enzyme'
import RecordList from './record-list'

describe('RecordList', () => {
  it('render initial state', () => {
    const wrapper = shallow(<RecordList />)
    expect(wrapper.children().length).toBe(0)
  })
  it('data prop set state', () => {
    const list = [
      {amount: 80, tags:['lunch']},
      {amount: 10, tags:['tips']},
    ]
    const wrap = shallow(<RecordList data={list}/>)
    const recordViews = wrap.find('RecordView')
    expect(recordViews.length).toBe(2)
    expect(recordViews.first().props().data).toMatchObject(list[0])
    expect(recordViews.last().props().data).toMatchObject(list[1])
  })
})
