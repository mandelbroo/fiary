import { TagsFinder } from './tags-finder'

describe('tags-finder', () => {
  it('find method defined', () => {
    const tagFinder = new TagsFinder()
    expect(tagFinder.find).toBeDefined()
  })
  it('use provided http client', async () => {
    const faxios = { get: jest.fn().mockReturnValue(Promise.resolve([])) }
    const tagFinder = new TagsFinder(faxios)
    const tags = await tagFinder.find('UPPER-Cased')
    expect(faxios.get).toBeCalledWith('/tags?like=upper-cased')
    expect(tags).toBeDefined()
  })
})
