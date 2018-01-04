import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import RecordNew from './record-new'

describe('RecordNew', () => {
  it('envoke submit callback', () => {
    let envoked = false
    const callback = () => envoked = true
    const wrapper = mount(<RecordNew onSubmit={callback}/>)
    wrapper.find('form').simulate('submit', {preventDefault: () => {}})
    expect(envoked).toBe(true)
  })
  it('set state from data prop', () => {
    const record = {
      income: true,
      amount: 1199.99,
      tags: ['airplane', 'ticket']
    }
    const wrapper = shallow(<RecordNew data={record}/>)
    wrapper.update()  // make sure component re-rendered
    expect(wrapper.state('amount')).toBe(record.amount)
    expect(wrapper.state('tags')).toBe(record.tags)
    expect(wrapper.state('income')).toBe(record.income)
  })
  it('clear state after done', () => {
    const wrapper = mount(<RecordNew onSubmit={()=>{}}/>)
    wrapper.find('[type="checkbox"]').simulate('change', {target: {checked: true}})
    wrapper.find('[type="number"]').simulate('change', {target: {value: 22}})
    wrapper.find('Tagger input').simulate('change', {target: {value: 'some-tag'}})
    wrapper.find('Tagger button').simulate('click')
    wrapper.find('form').simulate('submit', {preventDefault: ()=>{}})
    expect(wrapper.state('income')).toBe(false)
    expect(wrapper.state('amount')).toBe('')
    expect(wrapper.state('tags')).toMatchObject([])
  })
})
