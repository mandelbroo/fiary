import Base from './base'

export default class Stats extends Base {
  static annual() {
    return this.get('annual')
  }
  static monthly() {
    return this.get('monthly')
  }
}
