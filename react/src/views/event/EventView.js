import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from '../library/Card'
import Auth from '../../Auth'
import withEventInterface from '../../EventInterface'
class EventView extends Component {
  constructor (props) {
    super(props)
    this.auth = new Auth()
    this.state = { event: this.props.events }
  }

  render () {
    return (
      <div className='EventView container'>
        {
          this.state.event
            ? <div>
              {
                this.auth.loggedIn() && this.state.event[0].manager === this.auth.getDecodedToken().id
                  ? <div className='text-center mb-2'>
                    <Link to={'/events/' + this.state.event[0].id + '/edit'}><button className='btn btn-primary' >Edit</button></Link>
                  </div> : null

              }
              {
                this.state.event.map((event) => {
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
                      toggleJoin={(eventId) => this.props.toggleJoin(eventId)}
                      showDescription
                    />
                  )
                })
              }
            </div>
            : null}

      </div>
    )
  }
}

export default withEventInterface(EventView, 'event')
