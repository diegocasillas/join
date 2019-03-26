import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LibraryView extends Component {
  render() {
    return (
      <div className='LibraryView'>
        LibraryView
        <Link to='/'>Home</Link>
      </div>
    )
  }
}

export default LibraryView
