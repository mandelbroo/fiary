import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import RecordList from './record-list'

describe('RecordList', () => {
  it('render initial state', () => {
    const wrapper = shallow(<RecordList />)
    expect(wrapper.children().length).toBe(0)
  })
  it('data prop set state', () => {
    const data = [
      {amount: 80, tags:['lunch']},
      {amount: 10, tags:['tips']},
    ]
    const wrap = mount(<RecordList data={data}/>)
    const recordViews = wrap.find('RecordView')
    expect(recordViews.length).toBe(2)
    expect(recordViews.first().props().data).toMatchObject(data[0])
    expect(recordViews.last().props().data).toMatchObject(data[1])
  })
})
