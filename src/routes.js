import React from 'react'
import {
  Home,
  Logout,
  Signin,
  Signup,
  Users,
} from './components'

const About = () => <h3>About Us</h3>
const NoMatch = () => <h3>404</h3>
const User = ({match}) => <h3>User {match.params.userId} </h3>

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/about', component: About, exact: true },
  { path: '/signup', component: Signup, exact: true },
  { path: '/signin', component: Signin, exact: true },
  { path: '/logout', component: Logout, exact: true },
  { path: '/users', component: Users, exact: true },
  { path: '/user/:userId', component: User },
  { component: NoMatch }
]

export default routes
