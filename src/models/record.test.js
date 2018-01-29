jest.mock('../config/default', () => {
  return {
    serverUrl: 'fakeServerUrl'
  }
})
jest.mock('axios', () => {
  return {
    post: jest.fn().mockImplementation(() => Promise.resolve({success: true}))
  }
})
jest.mock('../services/session')

import Record from './record'
import axios from 'axios'

describe('Record model', () => {
  it('.endpoint returns proper value', () => {
    expect(Record.endpoint).toBe('records')
  })
  it('.save works good', async () => {
    const data = {
      id: 242,
      entryId: 43,
      amount: 11,
      income: true,
      tags: [{name: 'income'}]
    }
    const res = await Record.save(data)
    expect(axios.post).toBeCalledWith('records', data, Record.config)
    expect(res.success).toBe(true)
  })
})
