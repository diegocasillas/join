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

  fetchEvents (category) {
    const uri = !category || category === 0
      ? 'http://localhost/index.php/api/events'
      : 'http://localhost/index.php/api/events?category=' + category

    return fetch(uri)
      .then((response) => response.json())
      .then((events) => events)
  }

  fetchAttendances (events) {
    if (this.auth.loggedIn()) {
      return fetch('http://localhost/index.php/api/attendance?user=' + this.auth.getDecodedToken().id)
        .then(response => response.json())
        .then(attendances => {
          attendances.forEach((attendance) => {
            const eventIndex = events.findIndex(event => event.id === attendance.eventId)
            if (eventIndex !== -1) {
              events[eventIndex].attendanceId = attendance.id
              events[eventIndex].joined = true
            }
          })
          return attendances
        })
        .catch((error) => console.log(error))
    }

    return []
  }

  componentDidMount () {
    this.fetchEvents()
      .then(events => {
        this.setState({ events })
        return this.fetchAttendances(events)
      }).then(attendances => {
        this.setState({ attendances, loaded: true })
      }).catch(() => this.setState({ loaded: true }))
  }

  filterByCategory (category) {
    this.setState({ loaded: false })

    this.fetchEvents(category)
      .then(events => {
        this.setState({ events })
        return this.fetchAttendances(events)
      }).then(attendances => {
        this.setState({ attendances, loaded: true })
      }).catch(() => this.setState({ loaded: true }))
  }

  deleteAttendance (id) {
    const { events } = this.state

    return fetch(
      'http://localhost/index.php/api/attendance/' + id,
      { method: 'POST' }
    ).then((response) => response.json())
  }

  postAttendance (eventId) {
    const data = new FormData()

    data.append('userId', this.auth.getDecodedToken().id)
    data.append('eventId', eventId)

    return fetch('http://localhost/index.php/api/attendance', {
      method: 'POST',
      body: data
    }).then(response => response.json())
  }

  toggleJoin (eventId) {
    const { events } = this.state
    const eventIndex = events.findIndex(event => event.id === eventId)

    if (events[eventIndex].joined) {
      return this.deleteAttendance(events[eventIndex].attendanceId).then((json) => {
        events[eventIndex].attendanceId = null
        events[eventIndex].joined = false
        this.setState({ events: events, loaded: true })
      })
    }

    return this.postAttendance(eventId).then(attendances => {
      events[eventIndex].attendanceId = attendances[0].id
      events[eventIndex].joined = true
      this.setState({ events, loaded: true })
    })
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
                    <div className='col-12 mb-4'>
                      <Card
                        id={event.id}
                        name={event.name}
                        thumbnail={event.thumbnail}
                        description={event.description}
                        location={event.location}
                        date={event.date}
                        nameLength={20}
                        joined={event.joined}
                        toggleJoin={(eventId) => this.toggleJoin(eventId)}
                      />
                    </div>
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
