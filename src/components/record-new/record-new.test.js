import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import { RecordNew } from './record-new'

describe('RecordNew', () => {
  it('envoke submit callback', () => {
    const fakeCallback = jest.fn()
    const fakeEvent = { preventDefault: jest.fn() }
    const wrapper = mount(<RecordNew onSubmit={fakeCallback} />)
    wrapper.find('form').simulate('submit', fakeEvent)
    expect(fakeEvent.preventDefault).toBeCalled()
    expect(fakeCallback).toBeCalled()
  })
  it('set state from data prop', () => {
    const record = {
      income: true,
      amount: 1199.99,
      tags: ['airplane', 'ticket'],
    }
    const wrapper = shallow(<RecordNew data={record} />)
    wrapper.update() // make sure component re-rendered
    expect(wrapper.state('amount')).toBe(record.amount)
    expect(wrapper.state('tags')).toBe(record.tags)
    expect(wrapper.state('income')).toBe(record.income)
  })
  it('clear state after done', () => {
    const wrapper = mount(<RecordNew onSubmit={() => {}} />)
    const fakeEvent = { preventDefault: jest.fn() }
    wrapper
      .find('[type="checkbox"]')
      .simulate('change', { target: { checked: true } })
    wrapper
      .find('[type="number"]')
      .simulate('change', { target: { value: 22 } })
    const tagInput = wrapper.find('Tagger [type="text"]')
    tagInput.simulate('change', { target: { value: 'some-tag' } })
    tagInput.simulate('keyDown', { key: 'Enter' })
    wrapper.find('form').simulate('submit', fakeEvent)
    expect(fakeEvent.preventDefault).toBeCalled()
    expect(wrapper.state('income')).toBe(false)
    expect(wrapper.state('amount')).toBe('')
    expect(wrapper.state('tags')).toMatchObject([])
  })
})
