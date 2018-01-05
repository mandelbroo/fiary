import React from 'react'
import {
  Home,
  Logout,
  Signin,
  Signup,
  Entries,
  RecordDay,
} from './components'

const About = () => <h3>About Us</h3>
const NoMatch = () => <h3>404</h3>
const Entry = ({match}) => <h3>Entry {match.params.userId} </h3>

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/about', component: About, exact: true },
  { path: '/signup', component: Signup, exact: true },
  { path: '/signin', component: Signin, exact: true },
  { path: '/logout', component: Logout, exact: true },
  { path: '/entries', component: Entries, exact: true },
  { path: '/entry/:entryId', component: Entry },
  { path: '/new-entry', component: RecordDay, exact: true },
  { component: NoMatch }
]

export default routes
