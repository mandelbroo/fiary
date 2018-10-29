import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import { RecordList } from './record-list'

const records = [
  { amount: 80, tags: ['lunch'] },
  { amount: 10, tags: ['tips'] },
]
const classes = {}
const onRemove = jest.fn()
const onRemoveClick = jest.fn()
const onRemoveCancel = jest.fn()
const args = {
  records,
  classes,
  onRemove,
  onRemoveCancel,
  onRemoveClick,
}

describe('RecordList', () => {
  it('render initial state', () => {
    const wrap = mount(<RecordList {...{ ...args, records: [] }} />)
    expect(wrap.find('div').text()).toBe('no records yet')
  })
  it('records prop set state', () => {
    const wrap = mount(<RecordList {...{ ...args }} />)
    const recordViews = wrap.find('RecordView')
    expect(recordViews).toHaveLength(2)
    expect(recordViews.first().props().data).toMatchObject(records[0])
    expect(recordViews.last().props().data).toMatchObject(records[1])
  })
  it('remove item', () => {
    const onRemove = jest.fn()
    const onRemoveClick = jest.fn()
    const onRemoveCancel = jest.fn()
    const wrapper = mount(
      <RecordList
        {...{ onRemove, onRemoveClick, onRemoveCancel, classes, records }}
      />
    )
    const removeButtons = wrapper.find('button')
    expect(removeButtons).toHaveLength(2)
    removeButtons.first().simulate('click')
    expect(onRemoveClick).toBeCalledWith(records[0])
  })
})
