import React from 'react'
import 'config/enzyme'
import { shallow, mount } from 'enzyme'
import { RecordDay } from './record-day'
import RecordList from '../record-list/record-list'
import RecordNew from '../record-new/record-new'
import DayHeader from '../day-header'
import 'jest-localstorage-mock'

jest.mock('actions/records', () => ({
  addRecord: jest.fn(),
  removeRecord: jest.fn(),
  selectRecord: jest.fn(),
  clearSelectedRecord: jest.fn(),
}))
import actions from 'actions/records'

const fakeEntry = {
  day: '',
  records: [
    { id: 12, income: true, amount: 100, tags: ['found', 'in-park'] },
    { id: 13, amount: 30, tags: ['beer', 'pravda'] },
  ],
}

describe('RecordDay', () => {
  it('render RecordList and RecordNew', () => {
    const wrapper = shallow(
      <RecordDay dispatch={jest.fn()} entry={fakeEntry} {...actions} />
    )
    expect(
      wrapper.containsAllMatchingElements([
        <DayHeader key={1} />,
        <RecordList key={2} />,
        <RecordNew key={3} />,
      ])
    ).toBe(true)
  })
  it('render list of records based on entry prop', () => {
    const wrapper = mount(
      <RecordDay entry={fakeEntry} dispatch={jest.fn()} {...actions} />
    )
    expect(wrapper.find('li')).toHaveLength(2)
  })
  it('add record dispatch', () => {
    const fakeRecord = { amount: 99 }
    const wrapper = shallow(<RecordDay entry={fakeEntry} {...actions} />)
    wrapper.instance().props.addRecord(fakeRecord, fakeEntry)
    expect(actions.addRecord).toBeCalledWith(fakeRecord, fakeEntry)
  })
  it('remove record dispatch', () => {
    const fakeEntry = {
      day: '',
      records: [{ amount: 99, tags: ['aaa'] }],
    }
    const wrapper = shallow(<RecordDay entry={fakeEntry} {...actions} />)
    wrapper.instance().props.removeRecord(fakeEntry.records[0])
    expect(actions.removeRecord).toBeCalledWith(fakeEntry.records[0])
  })
  it('select record dispatch', () => {
    const fakeRecord = { amount: 101 }
    const wrapper = shallow(<RecordDay entry={fakeEntry} {...actions} />)
    wrapper.instance().props.selectRecord(fakeRecord)
    expect(actions.selectRecord).toBeCalledWith(fakeRecord)
  })
  it('clear selected record dispatch', () => {
    const wrapper = shallow(<RecordDay entry={fakeEntry} {...actions} />)
    wrapper.instance().props.clearSelectedRecord()
    expect(actions.clearSelectedRecord).toBeCalled()
  })
  it('unmount call clear selected record', () => {
    const wrapper = shallow(<RecordDay entry={fakeEntry} {...actions} />)
    wrapper.unmount()
    expect(actions.clearSelectedRecord).toBeCalled()
  })
})
