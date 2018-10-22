import React from 'react'
import '../../config/enzyme'
import { mount } from 'enzyme'
import { DayTile } from './day-tile'

describe('DayTile', () => {
  const fakeEntry = {
    day: '2018-01-21',
    records: [],
  }

  const classes = {}

  it('success mount', () => {
    mount(<DayTile click={() => {}} entry={fakeEntry} classes={classes} />)
  })
  it('call provided click handler', () => {
    const fakeClick = jest.fn()

    const wrapper = mount(
      <DayTile click={fakeClick} entry={fakeEntry} classes={classes} />
    )
    wrapper.simulate('click')
    expect(fakeClick).toBeCalledWith(fakeEntry.day)
  })
})
