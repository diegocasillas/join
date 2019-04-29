import React, { Component } from 'react'
import Auth from './Auth'
import Loader from 'react-loader-spinner'

const withEventInterface = (WrappedComponent, fetchFrom) => {
  return class extends Component {
    constructor (props) {
      super(props)
      this.auth = new Auth()
      this.state = { events: [], loaded: false }
    }

    fetchEvents (fetchFrom, category) {
      let uri = 'http://localhost/index.php/api/events'

      if (fetchFrom === 'user') {
        uri = 'http://localhost/index.php/api/users/' + this.auth.getDecodedToken().id + '/events'
      } else if (category && category !== 0) {
        uri = 'http://localhost/index.php/api/events?category=' + category
      }

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

    filterByCategory (category) {
      this.setState({ loaded: false })

      this.fetchEvents(fetchFrom, category)
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

    componentDidMount () {
      this.fetchEvents(fetchFrom)
        .then(events => {
          this.setState({ events })
          return this.fetchAttendances(events)
        }).then(attendances => {
          this.setState({ loaded: true })
        }).catch(() => this.setState({ loaded: true }))
    }

    render () {
      return this.state.loaded
        ? <WrappedComponent events={this.state.events} filterByCategory={(id) => this.filterByCategory(id)} toggleJoin={(id) => this.toggleJoin(id)} {...this.props} />
        : <div className='container'>
          <div className='row'>
            <div className='mx-auto mt-5'>

              <Loader
                type='ThreeDots'
                color='white'
                height='140'
                width='140'
              />
            </div>
          </div>
        </div>
    }
  }
}

export default withEventInterface
