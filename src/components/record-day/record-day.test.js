import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import RecordDay from './record-day'
import RecordList from '../record-list/record-list'
import RecordNew from '../record-new/record-new'


describe('RecordDay', () => {
  it('render RecordGallery and NewRecord', () => {
    const wrapper = shallow(<RecordDay />)
    expect(wrapper.containsAllMatchingElements([
      <RecordList />,
      <RecordNew />
    ])).toBe(true)
  })
  it('render everything based on data prop', () => {
    const entry = {
      records: [
        {income: true, amount: 100, tags: ['found', 'in-park']},
        {amount: 30, tags: ['beer', 'pravda']}
      ]
    }
    const wrapper = mount(<RecordDay data={entry} />)
    const items = wrapper.find('.record')
    expect(items.length).toBe(entry.records.length)
  })
  it('add record changes state', () => {
    const wrapper = mount(<RecordDay />)
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
  it('calls provided API client on save pressed', async () => {
    const fakeRes = {
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
    let saveCalled = false
    let promise = {}
    class fakeEntry {
      constructor(data) {
        this.id = data.id
        this.records = data.records
      }
      save = () => {
        saveCalled = true
        return promise = Promise.resolve(fakeRes)
      }
    }
    const wrapper = shallow(<RecordDay entry={fakeEntry} />)
    wrapper.find('.saveButton').simulate('click')
    expect(saveCalled).toBe(true)
    await promise
    expect(wrapper.state()).toMatchObject(fakeRes.entry)
  })
  it('load records by provided entry id', () => {
    const fakeEntry = {
      getById: jest.fn().mockImplementation(() => Promise.resolve({data: [1]}))
    }
    const wrapper = mount(<RecordDay id={1} entry={fakeEntry} />)
    expect(fakeEntry.getById).toBeCalledWith(1)
  })
  it('show current date and week day based on day property')
})
