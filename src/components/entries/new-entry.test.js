import React from 'react'
import '../../config/enzyme'
import { shallow, mount, render } from 'enzyme'
import DayRecords, { ViewRecord, ListRecords, NewRecord } from './new-entry'

describe('ViewRecord', () => {
  it('get data property and render component', () => {
    const record = {
      income: true,
      amount: 55.23,
      tags: [{name: 'deposit'}, {name: 'percent'}]
    }
    const wrapper = mount(<ViewRecord data={record} />)
    expect(wrapper.props().data).toEqual(record)
    expect(wrapper.find('.operation').props().children).toBe('+')
    expect(wrapper.find('.amount').props().children).toBe(record.amount)
    const tagsList = wrapper.find('ul').props().children
    expect(tagsList[0].props.children).toBe(record.tags[0].name)
    expect(tagsList[1].props.children).toBe(record.tags[1].name)
  })
})

describe('ListRecords', () => {
  it('render initial state', () => {
    const wrapper = shallow(<ListRecords />)
    expect(wrapper.children().length).toBe(0)
  })
  it('data prop set state', () => {
    const list = [
      {amount: 80, tags:['lunch']},
      {amount: 10, tags:['tips']},
    ]
    const wrap = shallow(<ListRecords data={list}/>)
    const recordViews = wrap.find('ViewRecord')
    expect(recordViews.length).toBe(2)
    expect(recordViews.first().props().data).toMatchObject(list[0])
    expect(recordViews.last().props().data).toMatchObject(list[1])
  })
})

describe('NewRecord', () => {
  it('envoke submit callback', () => {
    let envoked = false
    const callback = () => envoked = true
    const wrapper = mount(<NewRecord onSubmit={callback}/>)
    wrapper.find('form').simulate('submit', {preventDefault: () => {}})
    expect(envoked).toBe(true)
  })
  it('set state from data prop', () => {
    const record = {
      income: true,
      amount: 1199.99,
      tags: ['airplane', 'ticket']
    }
    const wrapper = shallow(<NewRecord data={record}/>)
    wrapper.update()  // make sure component re-rendered
    expect(wrapper.state('amount')).toBe(record.amount)
    expect(wrapper.state('tags')).toBe(record.tags)
    expect(wrapper.state('income')).toBe(record.income)
  })
  it('clear state after done', () => {
    const wrapper = mount(<NewRecord onSubmit={()=>{}}/>)
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

describe('DayRecords', () => {
  it('render RecordGallery and NewRecord', () => {
    const wrapper = shallow(<DayRecords />)
    expect(wrapper.containsAllMatchingElements([
      <ListRecords />,
      <NewRecord />
    ])).toBe(true)
  })
  it('render everything based on data prop', () => {
    const entry = {
      records: [
        {income: true, amount: 100, tags: ['found', 'in-park']},
        {amount: 30, tags: ['beer', 'pravda']}
      ]
    }
    const wrapper = mount(<DayRecords data={entry} />)
    const items = wrapper.find('.record')
    expect(items.length).toBe(entry.records.length)
  })
  it('add record changes state', () => {
    const wrapper = mount(<DayRecords />)
    const newState = {
      records: wrapper.state('records').concat({
        amount: 15,
        tags: ['yogurt']
      })
    }
    wrapper.setState(newState)
    wrapper.update()
    expect(wrapper.state('records').length).toBe(1)
    expect(wrapper.find('.record').length).toBe(1)
  })
  it('calls provided API client on save pressed', (done) => {
    let saveEnvoked = false
    const responseMock = {
      success: true,
      entry: {
        id: 256,
        createdAt: '2017-12-06 18:36:12',
        records: [
          {id: 593, amount: 25, tags: ['soap']},
          {id: 594, amount: 130, tags: ['burget', 'mcdonalds']},
        ]
      }
    }
    let promise = false
    class TestClient {
      constructor(data) {
        this.id = data.id
        this.records = data.records
      }
      save = () => {
        saveEnvoked = true
        return promise = Promise.resolve(responseMock)
      }
    }
    const testClient = new TestClient({
      id: -99,
      records: [
        {id: -1, amount: 25, tags: ['soap']},
        {id: -2, amount: 130, tags: ['burget', 'mcdonalds']},
      ]
    })
    const wrapper = shallow(<DayRecords apiClient={TestClient} />)
    wrapper.find('.saveButton').simulate('click')
    expect(saveEnvoked).toBe(true)
    promise.then(() => {
      expect(wrapper.state()).toMatchObject(responseMock.entry)
      done()
    })
  })
})
