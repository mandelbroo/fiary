import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import RecordList from './record-list'

const data = [{ amount: 80, tags: ['lunch'] }, { amount: 10, tags: ['tips'] }]

describe('RecordList', () => {
  it('render initial state', () => {
    const wrapper = shallow(<RecordList />)
    expect(wrapper.children()).toHaveLength(0)
  })
  it('data prop set state', () => {
    const wrap = mount(<RecordList records={data} />)
    const recordViews = wrap.find('RecordView')
    expect(recordViews).toHaveLength(2)
    expect(recordViews.first().props().data).toMatchObject(data[0])
    expect(recordViews.last().props().data).toMatchObject(data[1])
  })
  it('show "no records" text', () => {
    const wrap = mount(<RecordList records={[]} />)
    expect(wrap.find('div').text()).toBe('no records yet')
  })
  it('remove item', () => {
    const fakeRemoveHandler = jest.fn()
    const wrapper = mount(
      <RecordList onRemove={fakeRemoveHandler} records={data} />
    )
    const removeButtons = wrapper.find('button')
    expect(removeButtons).toHaveLength(2)
    removeButtons.first().simulate('click')
    expect(fakeRemoveHandler).toBeCalledWith(data[0])
  })
})
