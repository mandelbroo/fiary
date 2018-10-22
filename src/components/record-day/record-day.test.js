import React from 'react'
import '../../config/enzyme'
import { shallow, mount } from 'enzyme'
import { RecordDay } from './record-day'
import RecordList from '../record-list/record-list'
import RecordNew from '../record-new/record-new'
import DayHeader from '../day-header'
import Dialog from '../dialog/dialog'
import 'jest-localstorage-mock'

jest.mock('../../actions', () => ({
  addRecord: jest.fn(),
  removeRecord: jest.fn(),
  selectRecord: jest.fn(),
  clearSelectedRecord: jest.fn(),
  getEntries: jest.fn(),
}))
import actions from '../../actions'

const fakeEntry = {
  day: '',
  records: [
    { id: 12, income: true, amount: 100, tags: ['found', 'in-park'] },
    { id: 13, amount: 30, tags: ['beer', 'pravda'] },
  ],
}

describe('RecordDay', () => {
  it('render RecordList and RecordNew', () => {
    const wrapper = shallow(<RecordDay dispatch={jest.fn()} />)
    expect(
      wrapper.containsAllMatchingElements([
        <DayHeader />,
        <RecordList />,
        <RecordNew />,
      ])
    ).toBe(true)
  })
  it('render list of records based on entry prop', () => {
    const wrapper = mount(<RecordDay entry={fakeEntry} dispatch={jest.fn()} />)
    expect(wrapper.find('li')).toHaveLength(2)
  })
  it('add record dispatch', () => {
    const fakeDispatch = jest.fn()
    const fakeRecord = { amount: 99 }
    const wrapper = shallow(
      <RecordDay entry={fakeEntry} dispatch={fakeDispatch} />
    )
    wrapper.instance().add(fakeRecord)
    expect(fakeDispatch).toBeCalled()
    expect(actions.addRecord).toBeCalledWith(fakeRecord, fakeEntry)
  })
  it('remove record dispatch', () => {
    const fakeDispatch = jest.fn()
    const fakeEntry = {
      day: '',
      records: [{ amount: 99, tags: ['aaa'] }],
    }
    const wrapper = shallow(
      <RecordDay entry={fakeEntry} dispatch={fakeDispatch} />
    )
    wrapper.instance().remove(fakeEntry.records[0])
    expect(fakeDispatch).toBeCalled()
    expect(actions.removeRecord).toBeCalledWith(fakeEntry.records[0])
  })
  it('select record dispatch', () => {
    const fakeRecord = { amount: 101 }
    const fakeDispatch = jest.fn()
    const wrapper = shallow(
      <RecordDay entry={fakeEntry} dispatch={fakeDispatch} />
    )
    wrapper.instance().selectRecord(fakeRecord)
    expect(fakeDispatch).toBeCalled()
    expect(actions.selectRecord).toBeCalledWith(fakeRecord)
  })
  it('clear selected record dispatch', () => {
    const fakeDispatch = jest.fn()
    const wrapper = shallow(
      <RecordDay entry={fakeEntry} dispatch={fakeDispatch} />
    )
    wrapper.instance().clearSelectedRecord()
    expect(fakeDispatch).toBeCalled()
    expect(actions.clearSelectedRecord).toBeCalled()
  })
  it('unmount call clear selected record', () => {
    const fakeDispatch = jest.fn()
    const wrapper = shallow(
      <RecordDay entry={fakeEntry} dispatch={fakeDispatch} />
    )
    wrapper.unmount()
    expect(fakeDispatch).toBeCalled()
    expect(actions.clearSelectedRecord).toBeCalled()
  })
  it('show removal dialog', () => {
    const fakeRecord = { amount: 88, tags: [{ name: 'spending' }] }
    const wrapper = shallow(<RecordDay entry={fakeEntry} record={fakeRecord} />)
    expect(wrapper.containsMatchingElement(Dialog)).toBe(true)
  })
  it.skip('dialog approve removing', () => {})
  it.skip('dialog cancel removing', () => {})
})
