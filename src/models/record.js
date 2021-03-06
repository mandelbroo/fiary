import Base from './base'
import axios from 'axios'

export default class Record extends Base {
  static get endpoint() {
    return 'records'
  }

  static create = (data) => axios.post(Record.endpoint, data, Record.config)
  static update = (data) => axios.patch(Record.endpoint, data, Record.config)
  static destroy = (id) =>
    axios.delete(`${Record.endpoint}/${id}`, Record.config)
}
