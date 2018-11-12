import React from 'react'
import 'config/enzyme'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { DateTime } from 'luxon'

import RecordDay from 'components/record-day'
import ConnectedTodayPage from './today-page'

jest.mock('actions/entries', () => ({
  editEntryClear: jest
    .fn()
    .mockImplementation(() => ({ type: 'T', payload: {} })),
  editEntry: jest.fn().mockImplementation(() => ({ type: 'T', payload: {} })),
  getEntryByDate: jest
    .fn()
    .mockImplementation(() => ({ type: 'T', payload: {} })),
}))
import { editEntryClear, editEntry, getEntryByDate } from 'actions/entries'

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
    expect(getEntryByDate).toBeCalledWith(today)
    expect(editEntry).toBeCalledWith(today)
    expect(wrapper.find(RecordDay)).toHaveLength(1)
  })

  it('clears on unmount', () => {
    wrapper.unmount()
    expect(editEntryClear).toBeCalled()
  })
})
