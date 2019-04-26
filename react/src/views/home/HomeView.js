import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../Auth'
import UserEvents from './UserEvents'
import welcomeMessage from './welcome-message.png'

class HomeView extends Component {
  constructor (props) {
    super(props)

    this.state = { events: [], loaded: false }
    this.auth = new Auth()
  }

  render () {
    return (
      <div className='HomeView text-light container'>
        <div className='text-center mt-5'>
          <img src={welcomeMessage} />
        </div>

        <div className='text-center mb-5'>
          <Link to='/events'><button className='btn btn-primary mx-auto'>Events</button></Link>
        </div>

        <UserEvents id='myEvents' title='My events' />
        <UserEvents id='latestEvents' title='Latest events' />
      </div>
    )
  }
}

export default HomeView
