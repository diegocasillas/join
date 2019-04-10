import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EventView extends Component {
  constructor(props) {
    super(props)

    this.state = { event: null, loaded: false }
  }

  componentDidMount() {
    fetch('http://localhost/index.php/api/events/' + this.props.match.params.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ event: json[0], loaded: true })
      })
      .catch((error) => this.setState({ loaded: true }))
  }

  render() {
    return (
      <div className='EventView'>
        <h1>{this.state.event ? this.state.event.name : null}</h1>
        <p>{this.state.event ? this.state.event.description : null}</p>
        <p>{this.state.event ? this.state.event.date : null}</p>
        <p>{this.state.event ? this.state.event.location : null}</p>
        <Link to='/'>Home</Link>
      </div>
    )
  }
}

export default EventView
