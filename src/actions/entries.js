import Entry from '../models/entry'

export function editEntry(day) {
  return {
    type: 'EDIT_ENTRY',
    payload: day,
  }
}

export function editEntryClear() {
  return {
    type: 'EDIT_ENTRY_CLEAR',
  }
}

export function getEntryByDate(date) {
  return {
    type: 'GET_ENTRY_BY_DATE',
    payload: Entry.getByDate(date),
  }
}

export function getEntries(page = 1) {
  return {
    type: 'GET_ENTRIES',
    payload: Entry.getPaged(page).then((res) => {
      return { ...res.data, page }
    }),
  }
}
