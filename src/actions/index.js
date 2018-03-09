import Entry from '../models/entry'

export const ENTRIES_LOADED = 'ENTRIES_LOADED'
export const ENTRIES_LOADING = 'ENTRIES_LOADING'
export const ENTRIES_LOADING_FAILED = 'ENTRIES_LOADING_FAILED'


export const loadDishes = () => ({
    type: 'PROMISE',
    actions: [ENTRIES_LOADED, ENTRIES_LOADING, ENTRIES_LOADING_FAILED],
    promise: Entry.getTodayEntry()
  })
  
 