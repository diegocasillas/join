import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import './libraryView.css'
class LibraryView extends Component {
  constructor(props) {
    super(props)
    this.state = { events: [] }
  }

  componentDidMount() {
    fetch('http://localhost/index.php/api/events')
      .then((response) => response.json())
      .then((json) => this.setState({ events: json }))
  }

  render() {
    return (
      <div className='LibraryView'>
        LibraryView
        <Link to='/'>Home</Link>
        <Link to='/events/1'>Event 1</Link>
        <Link to='/events/2'>Event 2</Link>
        <Link to='/events/3'>Event 3</Link>

        <div class='container'>
          <div class='row'>
            {this.state.events.map((event) => {
              return (
                <Card
                  name={event.name}
                  thumbnail={event.thumbnail}
                  description={event.description}
                  location={event.location}
                  date={event.date}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default LibraryView