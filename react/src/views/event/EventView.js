import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from '../library/Card'

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
        <Link to='/'>Home</Link>
        {
          this.state.event
            ? <Card
              id={this.state.event.id}
              name={this.state.event.name}
              thumbnail={this.state.event.thumbnail}
              description={this.state.event.description}
              location={this.state.event.location}
              date={this.state.event.date}
              nameLength={20}
              showDescription
            />
            : null}

      </div>
    )
  }
}

export default EventView
