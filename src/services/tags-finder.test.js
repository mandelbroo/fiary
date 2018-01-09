import { TagsFinder } from './tags-finder'

describe('tags-finder', () => {
  it('find method defined', () => {
    const tagFinder = new TagsFinder()
    expect(tagFinder.find).toBeDefined()
  })
  it('use provided http client', async () => {
    const fakeAxios = {
      get: jest.fn().mockReturnValue(Promise.resolve([]))
    }
    const tagFinder = new TagsFinder(fakeAxios)
    const tags = await tagFinder.find('someTag')
    expect(fakeAxios.get).toBeCalledWith('/tags?like=someTag')
    expect(tags).toBeDefined()
  })
})
