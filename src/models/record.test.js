jest.mock('../config/index', () => {
  return {
    serverUrl: 'fakeServerUrl',
  }
})
jest.mock('axios', () => {
  return {
    post: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ success: true })),
    delete: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ success: true })),
  }
})
jest.mock('../services/session')

import Record from './record'
import axios from 'axios'

describe('Record model', () => {
  it('endpoint returns proper value', () => {
    expect(Record.endpoint).toBe('records')
  })
  it('save works good', async () => {
    const data = {
      id: 242,
      entryId: 43,
      amount: 11,
      income: true,
      tags: [{ name: 'income' }],
    }
    const res = await Record.save(data)
    expect(axios.post).toBeCalledWith('records', data, Record.config)
    expect(res.success).toBe(true)
  })
  it('destroy is working', async () => {
    const res = await Record.destroy(1234)
    expect(axios.delete).toBeCalledWith(
      `${Record.endpoint}/1234`,
      Record.config
    )
    expect(res.success).toBe(true)
  })
})
