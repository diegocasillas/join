import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../Auth'
import Loader from 'react-loader-spinner'
import CategoryBar from './CategoryBar'
import Card from './Card'
import './libraryView.css'

class LibraryView extends Component {
  constructor (props) {
    super(props)

    this.state = { events: [], attendances: [], loaded: false }
    this.auth = new Auth()
  }

  componentDidMount () {
    fetch('http://localhost/index.php/api/events')
      .then((response) => response.json())
      .then((json) => {
        const events = json
        fetch('http://localhost/index.php/api/attendance?user=' + this.auth.getDecodedToken().id)
          .then(response => response.json())
          .then(json => {
            const attendances = json

            attendances.forEach((attendance) => {
              const eventIndex = events.findIndex(event => event.id === attendance.eventId)
              events[eventIndex].joined = true
            })

            this.setState({ events: events, attendances: attendances, loaded: true })
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => this.setState({ loaded: true }))
  }

  filterByCategory (categoryId) {
    this.setState({ loaded: false })
    const uri = categoryId === 0
      ? 'http://localhost/index.php/api/events'
      : 'http://localhost/index.php/api/events?category=' + categoryId

    fetch(uri, {
      method: 'GET'
    }).then(response => response.json())
      .then(json => {
        const events = json
        fetch('http://localhost/index.php/api/attendance?user=' + this.auth.getDecodedToken().id)
          .then(response => response.json())
          .then(json => {
            const attendances = json

            attendances.forEach((attendance) => {
              const eventIndex = events.findIndex(event => event.id === attendance.eventId)

              eventIndex !== -1 ? events[eventIndex].joined = true : null
            })

            this.setState({ events: events, attendances: attendances, loaded: true })
          })
          .catch((error) => console.log(error))
      })
  }

  toggleJoin (eventId, joined) {
    if (joined) {
      const attendanceIndex = this.state.attendances.findIndex(attendance => attendance.eventId === eventId)
      const attendance = this.state.attendances[attendanceIndex]

      fetch('http://localhost/index.php/api/attendance/' + attendance.id,
        { method: 'POST' }
      ).then((response) => response.json())
        .then((json) => {
          const eventIndex = this.state.events.findIndex(event => event.id === eventId)
          this.state.events[eventIndex].joined = false
          this.state.attendances.splice(attendanceIndex, 1)

          this.setState({ events: this.state.events, attendances: this.state.attendances, loaded: true })
        })
        .catch((error) => this.setState({ loaded: true }))
    } else {
      const data = new FormData()

      data.append('userId', this.auth.getDecodedToken().id)
      data.append('eventId', eventId)

      fetch('http://localhost/index.php/api/attendance', {
        method: 'POST',
        body: data
      }).then(response => response.json())
        .then(json => {
          const eventIndex = this.state.events.findIndex(event => event.id === eventId)
          this.state.events[eventIndex].joined = true
          this.state.attendances.push(json[0])
          this.setState({ events: this.state.events, attendances: this.state.attendances, loaded: true })
        })
    }
  }

  render () {
    return (
      <div className='LibraryView container'>
        <CategoryBar filterByCategory={(id) => this.filterByCategory(id)} />
        <div className='row'>
          {
            this.state.loaded
              ? this.state.events.length !== 0
                ? this.state.events.map((event) => {
                  return (
                    <Card
                      id={event.id}
                      name={event.name}
                      thumbnail={event.thumbnail}
                      description={event.description}
                      location={event.location}
                      date={event.date}
                      nameLength={20}
                      joined={event.joined}
                      toggleJoin={(eventId, joined) => this.toggleJoin(eventId, joined)}
                    />
                  )
                })
                : <div className='mx-auto mt-5'>
                  <h2>No events</h2>
                </div>
              : <div className='mx-auto mt-5'>
                <Loader
                  type='ThreeDots'
                  color='white'
                  height='140'
                  width='140'
                />
              </div>
          }
        </div>
      </div>
    )
  }
}

export default LibraryView
