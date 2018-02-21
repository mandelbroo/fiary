import React from 'react'
import {
	Home,
	Logout,
	Signin,
	Signup,
	RecordDay,
} from './components'
import TodayPage from './pages/today-page'
import EntriesPage from './pages/entries-page'

const NoMatch = () => <h3>404</h3>
const EntryPage = ({match}) => <RecordDay id={match.params.entryId} />

const routes = [
	{ path: '/', component: Home, exact: true },
	{ path: '/signup', component: Signup, exact: true },
	{ path: '/signin', component: Signin, exact: true },
	{ path: '/logout', component: Logout, exact: true },
	{ path: '/entries', component: EntriesPage, exact: true },
	{ path: '/entry/:entryId', component: EntryPage },
	{ path: '/today', component: TodayPage, exact: true },
	{ component: NoMatch }
]

export default routes
