import { TagsFinder } from './tags-finder'

describe('tags-finder', () => {
  it('find method defined', () => {
    const tagFinder = new TagsFinder()
    expect(tagFinder.find).toBeDefined()
  })
  it('use provided http client', async () => {
    expect.assertions(2)
    const searchWord = 'someTag'
    const fakeAxios = {
      get: (path) => {
        expect(path).toBe(`/tags?name=${searchWord}`)
        return Promise.resolve([])
      }
    }
    const tagFinder = new TagsFinder(fakeAxios)
    const tags = await tagFinder.find(searchWord)
    expect(tags).toBeDefined()
  })
})
