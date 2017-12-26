import Base from '../models/base'

class TagsFinder {
  constructor(httpClient) {
    this.client = httpClient
  }
  find = (value) => this.client.get(`/tags?name=${value}`)
}

export default new TagsFinder(Base)
export { TagsFinder }
