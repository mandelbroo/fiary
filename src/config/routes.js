import React from 'react'

import { Home, Logout, Signin, Signup } from 'components'
import TodayPage from 'pages/today-page'
import EntriesPage from 'pages/entries-page'
import EntryPage from 'pages/entry-page'
import CalendarPage from 'pages/calendar-page'

const NoMatch = () => <h3>404</h3>

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/signup', component: Signup, exact: true },
  { path: '/signin', component: Signin, exact: true },
  { path: '/logout', component: Logout, exact: true },
  { path: '/entries', component: EntriesPage, exact: true },
  { path: '/entry/:entryDay', component: EntryPage },
  {
    path: '/today',
    component: TodayPage,
    exact: true,
  },
  { path: '/calendar', component: CalendarPage, exact: true },
  { component: NoMatch },
]

export default routes
