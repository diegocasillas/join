import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EventView extends Component {
  render() {
    return (
      <div className='EventView'>
        EventView {this.props.match.params.id}
        <Link to='/'>Home</Link>
      </div>
    )
  }
}

export default EventView
