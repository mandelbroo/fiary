import Base from './base'
import axios from 'axios'

export default class Entry extends Base {
  constructor(data) {
    super()
    Object.assign(this, data)
  }

  static get endpoint() {return 'entries'}

  static getAll() {
    return this.get(this.endpoint)
  }

  static getPath(path) {
    return this.get(path)
  }

  save = () => {
    const client = axios.create({...this.config})
    return client.post(Entry.endpoint, {
      ids: this.id,
      records: this.records,
    })
  }
}
