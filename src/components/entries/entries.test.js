import React from 'react'
import 'config/enzyme'
import { mount } from 'enzyme'
import { Entries } from './entries'
import DayTile from 'components/day-tile/day-tile'

jest.mock('actions/entries', () => ({ getEntries: jest.fn() }))
import { getEntries } from 'actions/entries'

describe('Entries component', () => {
  const fakeDispatch = jest.fn()
  const fakeEntry = { day: '2022-04-20', records: [] }
  const classes = {}

  it('get entries dispatch', async () => {
    mount(
      <Entries
        entries={[fakeEntry]}
        dispatch={fakeDispatch}
        classes={classes}
        redirect={jest.fn()}
      />
    )
    expect(fakeDispatch).toBeCalled()
    expect(getEntries).toBeCalled()
  })

  it('clicking on day entry redirects to its page', async () => {
    const fakeRedirect = jest.fn().mockReturnValue('')
    const fakeHistory = { push: jest.fn() }
    const wrapper = mount(
      <Entries
        entries={[fakeEntry]}
        dispatch={fakeDispatch}
        redirect={fakeRedirect}
        history={fakeHistory}
        classes={classes}
      />
    )
    wrapper
      .find(DayTile)
      .first()
      .simulate('click')
    const expected = `/entry/${fakeEntry.day}`
    expect(fakeRedirect).toBeCalledWith(expected)
    expect(fakeHistory.push).toBeCalledWith(expected)
  })
})
