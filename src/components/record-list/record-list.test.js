import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import RecordList, { NoRecords, RemoveButton } from './record-list'

const data = [
  {amount: 80, tags:['lunch']},
  {amount: 10, tags:['tips']},
]

describe('RecordList', () => {
  it('render initial state', () => {
    const wrapper = shallow(<RecordList />)
    expect(wrapper.children().length).toBe(0)
  })
  it('data prop set state', () => {
    const wrap = mount(<RecordList data={data}/>)
    const recordViews = wrap.find('RecordView')
    expect(recordViews.length).toBe(2)
    expect(recordViews.first().props().data).toMatchObject(data[0])
    expect(recordViews.last().props().data).toMatchObject(data[1])
  })
  it('show "no records" text', () => {
    const wrap = mount(<RecordList data={[]}/>)
    expect(wrap.find('span').text()).toBe('no records yet')
  })
  it('remove item', () => {
    const fakeRemoveHandler = jest.fn()
    const wrapper = mount(
      <RecordList onRemove={fakeRemoveHandler} data={data}/>)
    const removeButtons = wrapper.find(RemoveButton)
    expect(removeButtons.length).toBe(2)
    removeButtons.first().simulate('click')
    expect(fakeRemoveHandler).toBeCalledWith(data[0])
  })
})
