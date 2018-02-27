import Entry from '../models/entry'

export default {
  type: 'GET_TODAY_RECORDS',
  payload: Entry.getTodayEntry()
}
