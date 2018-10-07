import React from 'react'
import '../config/enzyme'
import { mount } from 'enzyme'
import EntriesPage, { redirect } from './entries-page'
import { Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'jest-localstorage-mock'

jest.mock('axios', () => ({
  get: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: { collection: [] } })),
}))

describe('EntriesPage', () => {
  const fakeStore = {
    dispatch: jest.fn(),
    getState: jest.fn().mockImplementation(() => ({ entries: { list: [] } })),
    subscribe: jest.fn(),
  }

  it('render ok', () => {
    mount(
      <Provider store={fakeStore}>
        <EntriesPage />
      </Provider>
    )
  })
  it('redirect ok', async () => {
    const result = redirect('/path')
    expect(result.type).toBe(Redirect)
    expect(result.props.to).toBe('/path')
  })
})
