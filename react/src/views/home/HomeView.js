import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../Auth'
import Loader from 'react-loader-spinner'
import welcomeMessage from './welcome-message.png'
import Card from '../library/Card'
import arrowLeft from '../../assets/SlidebarArrowLeft.png'
import arrowRight from '../../assets/SlidebarArrowRight.png'

class HomeView extends Component {
  constructor (props) {
    super(props)

    this.state = { events: [], loaded: false }
    this.auth = new Auth()
  }

  fetchEvents (category) {
    const uri = !category || category === 0
      ? 'http://localhost/index.php/api/users/' + this.auth.getDecodedToken().id + '/events'
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
          console.log(events)
          console.log(attendances)
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

  render () {
    return (
      <div className='HomeView text-light container'>
        <div className='text-center mt-5'>
          <img src={welcomeMessage} />
        </div>
        <div className='text-center mb-5'>
          <Link to='/events'><button className='btn btn-primary mx-auto'>Events</button></Link>
        </div>
        <div className='mb-5'>
          <h4 className='mark mb-4 text-center'>My events</h4>
          <div className='row'>

            {
              this.state.loaded
                ? this.state.events.length !== 0
                  ? <div id='carouselExampleControls' class='carousel slide col-12' data-ride='carousel'>
                    <div class='carousel-inner'>
                      {this.state.events.map((event, index) => {
                        return (
                          <div className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
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
                      })}
                    </div>
                    <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'>
                      <img src={arrowLeft} />
                      <span class='sr-only'>Previous</span>
                    </a>
                    <a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>
                      <img src={arrowRight} />
                      <span class='sr-only'>Next</span>
                    </a>
                  </div>

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
      </div>
    )
  }
}

export default HomeView
