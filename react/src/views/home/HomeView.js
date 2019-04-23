import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import welcomeMessage from './welcome-message.png'

class HomeView extends Component {
  render () {
    return (
      <div className='HomeView'>
        <div className='text-center mt-5'>
          <img src={welcomeMessage} />
        </div>
        <div className='text-center'>
          <Link to='/events'><button className='btn btn-primary'>Events</button></Link>

        </div>
      </div>
    )
  }
}

export default HomeView
