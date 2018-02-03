import React from 'react'
import { Redirect } from 'react-router-dom'
import Entries from '../components/entries/entries'

export const redirect = (path) => <Redirect to={path} />

export default (params) => <Entries redirect={redirect} history={params.history} />
