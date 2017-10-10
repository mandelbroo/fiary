import React, { Component } from 'react'
import Session from '../../services/session'

const guest = () => (<h3>Welcome to fiary</h3>)
const logged = (user) => (<h3>Greetings, {user.name}</h3>)

class Home extends Component {
  render() {
    const user = Session.getUser()
    const content = user ? logged(user) : guest()
    return (
      <div className="home">
        {content}
      </div>
    )
  }
}

export default Home
