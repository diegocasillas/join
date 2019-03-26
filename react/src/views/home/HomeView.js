import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HomeView extends Component {
  render() {
    return (
      <div className='HomeView'>
        HomeView
        <Link to='/events'>Events</Link>
      </div>
    )
  }
}

export default HomeView
