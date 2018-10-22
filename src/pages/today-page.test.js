import React from 'react'
import '../config/enzyme'
import { mount } from 'enzyme'

import RecordDay from '../components/record-day'
import ConnectedTodayPage from './today-page'
import { Provider } from 'react-redux'
import { DateTime } from 'luxon'

jest.mock('../actions', () => ({
  clearEdit: jest.fn().mockImplementation(() => ({ type: 'T', payload: {} })),
  clearSelectedRecord: jest
    .fn()
    .mockImplementation(() => ({ type: 'T', payload: {} })),
  editEntry: jest.fn().mockImplementation(() => ({ type: 'T', payload: {} })),
  getEntries: jest.fn().mockImplementation(() => ({ type: 'T', payload: {} })),
  getTodayDate: jest
    .fn()
    .mockImplementation(() => ({ type: 'T', payload: {} })),
}))
import { clearEdit, editEntry, getEntries, getTodayDate } from '../actions'

const fakeStore = {
  dispatch: jest.fn(),
  getState: jest.fn().mockImplementation(() => ({
    selectedRecord: { tags: [] },
    entries: { list: [] },
  })),
  subscribe: jest.fn(),
}

describe('TodayPage', () => {
  const wrapper = mount(
    <Provider store={fakeStore}>
      <ConnectedTodayPage />
    </Provider>
  )

  it('load today records', () => {
    const today = DateTime.local().toISODate()
    expect(fakeStore.dispatch).toBeCalled()
    expect(getTodayDate).toBeCalled()
    expect(getEntries).toBeCalledWith(today)
    expect(editEntry).toBeCalledWith(today)
    expect(wrapper.find(RecordDay)).toHaveLength(1)
  })

  it('clears on unmount', () => {
    wrapper.unmount()
    expect(clearEdit).toBeCalled()
  })
})
