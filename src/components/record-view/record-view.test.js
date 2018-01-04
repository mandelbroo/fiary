import React from 'react'
import '../../config/enzyme'
import { mount } from 'enzyme'
import RecordView from './record-view'

describe('RecordView', () => {
  it('get data property and render component', () => {
    const record = {
      income: true,
      amount: 55.23,
      tags: [{name: 'deposit'}, {name: 'percent'}]
    }
    const wrapper = mount(<RecordView data={record} />)
    expect(wrapper.props().data).toEqual(record)
    expect(wrapper.find('.operation').props().children).toBe('+')
    expect(wrapper.find('.amount').props().children).toBe(record.amount)
    const tagsList = wrapper.find('ul').props().children
    expect(tagsList[0].props.children).toBe(record.tags[0].name)
    expect(tagsList[1].props.children).toBe(record.tags[1].name)
  })
})
