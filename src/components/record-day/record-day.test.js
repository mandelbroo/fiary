import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import RecordDay from './record-day'
import RecordList, { RemoveButton } from '../record-list/record-list'
import RecordNew from '../record-new/record-new'
import 'jest-localstorage-mock'

const fakeData = {
  records: [
    {id: 12, income: true, amount: 100, tags: ['found', 'in-park']},
    {id: 13, amount: 30, tags: ['beer', 'pravda']}
  ]
}

describe('RecordDay', () => {
  it('render RecordList and RecordNew', () => {
    const wrapper = shallow(<RecordDay />)
    expect(wrapper.containsAllMatchingElements([
      <RecordList />,
      <RecordNew />
    ])).toBe(true)
  })
  it('render everything based on data prop', () => {
    const wrapper = mount(<RecordDay data={fakeData} />)
    expect(wrapper.find('li').length).toBe(2)
    expect(wrapper.state('records')).toMatchObject(fakeData.records)
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
    expect(wrapper.find('li').length).toBe(1)
  })
  it('calls provided API client on save pressed', async () => {
    const fakeData = {
      id: 594,
      amount: 130,
      entryId: 232,
      income: false,
      tags: [{name: 'burger'}, {name: 'mcdonalds'}]
    }
    const fakeRes = {
      success: true,
      record: fakeData
    }
    let promise = {}
    const  fakeRecord = {
      save: jest.fn().mockImplementation(() => promise = Promise.resolve(fakeRes))
    }
    const fakeEvent = {preventDefault: jest.fn()}
    const wrapper = mount(<RecordDay record={fakeRecord} />)
    wrapper.find('[type="number"]').simulate('change', {target: {value: fakeData.amount}})

    const tagInput = wrapper.find('Tagger [type="text"]')
    tagInput.simulate('change', {target: {value: fakeData.tags[0].name}})
    tagInput.simulate('keyDown', {preventDefault: jest.fn(), key: 'Enter'})
    tagInput.simulate('change', {target: {value: fakeData.tags[1].name}})
    tagInput.simulate('keyDown', {preventDefault: jest.fn(), key: 'Enter'})

    wrapper.find('form').simulate('submit', fakeEvent)
    expect(fakeRecord.save).toBeCalled()
    expect(fakeEvent.preventDefault).toBeCalled()
    await promise
    expect(wrapper.state('records')).toMatchObject([fakeRes.record])
  })
  it('load records by provided entry id', async () => {
    let promise = {}
    const fakeRes = {
      data: {
        id: 1,
        day: '2019-05-05',
        records: [{id: 99, tags: ['fakeTag']}]
      }
    }
    const fakeEntry = {
      getById: jest.fn().mockImplementation(() =>
        promise = Promise.resolve(fakeRes))
    }
    const wrapper = mount(<RecordDay id={1} entry={fakeEntry} />)
    expect(fakeEntry.getById).toBeCalledWith(1)
    await promise
    expect(wrapper.state('records')).toBe(fakeRes.data.records)
    expect(wrapper.state('day')).toBe(fakeRes.data.day)
    expect(wrapper.state('id')).toBe(fakeRes.data.id)
  })
  it('remove record', () => {
    const fakeRecord = { destroy: jest.fn() }
    const wrapper = mount(<RecordDay data={fakeData} record={fakeRecord} />)
    wrapper.find(RemoveButton).first().simulate('click')
    expect(fakeRecord.destroy).toBeCalledWith(fakeData.records[0].id)
    expect(wrapper.state('records')).toMatchObject([fakeData.records[1]])
  })
})
