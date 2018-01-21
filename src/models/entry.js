import Base from './base'
import axios from 'axios'
import { DateTime } from 'luxon'

export default class Entry extends Base {
  constructor(data) {
    super()
    Object.assign(this, data)
  }

  static get endpoint() {return 'entries'}

  save = () => axios.post(
      Entry.endpoint,
      {
        id: this.id,
        records: this.records,
        day: this.day,
      },
      { ...this.config }
    )

  static getTodayEntry = () => {
    return Entry.get(`${Entry.endpoint}/${DateTime.local().toISODate()}`)
  }
}
