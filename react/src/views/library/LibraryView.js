import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LibraryView extends Component {
  render() {
    return (
      <div className='LibraryView'>
        LibraryView
        <Link to='/'>Home</Link>
        <Link to='/events/1'>Event 1</Link>
        <Link to='/events/2'>Event 2</Link>
        <Link to='/events/3'>Event 3</Link>
      </div>
    )
  }
}

export default LibraryView
