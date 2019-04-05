import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import './libraryView.css'
class LibraryView extends Component {
  constructor(props) {
    super(props)
    this.state = { events: [], loaded: false }
  }

  componentDidMount() {
    fetch('http://localhost/index.php/api/events')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ events: json, loaded: true })
      })
      .catch((error) => this.setState({ loaded: true }))
  }

  render() {
    return (
      <div className='LibraryView'>
        LibraryView
        <Link to='/'>Home</Link>
        <Link to='/events/1'>Event 1</Link>
        <Link to='/events/2'>Event 2</Link>
        <Link to='/events/3'>Event 3</Link>

        <div className='container'>
          <div className='row'>
            {
              this.state.loaded
                ? this.state.events.length !== 0
                  ? this.state.events.map((event) => {
                    return (
                      <Card
                        name={event.name}
                        thumbnail={event.thumbnail}
                        description={event.description}
                        location={event.location}
                        date={event.date}
                      />
                    )
                  })
                  : <div className='mx-auto'>
                    <h2>No events</h2>
                  </div>
                : <div className='mx-auto'>
                  <h2>Loading</h2>
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default LibraryView