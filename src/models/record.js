import Base from './base'
import axios from 'axios'

export default class Record extends Base {
  static get endpoint() {return 'records'}

  static save = (data) => axios.post(Record.endpoint, data, Record.config)
}
