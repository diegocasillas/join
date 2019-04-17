import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HomeView extends Component {
  render () {
    return (
      <div className='HomeView'>
        <h1>HOMEVIEW</h1>
        <h1>HOMEVIEW</h1>
        <h1>HOMEVIEW</h1>
        <h1>HOMEVIEW</h1>
        <h1>HOMEVIEW</h1>
        <h1>HOMEVIEW</h1>
        <h1>HOMEVIEW</h1>
        <Link to='/events'>Events</Link>
      </div>
    )
  }
}

export default HomeView
