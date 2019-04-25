import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../Auth'
import withEventInterface from '../../EventInterface'
import CategoryBar from './CategoryBar'
import Card from './Card'
import './libraryView.css'

class LibraryView extends Component {
  constructor (props) {
    super(props)
    this.state = { events: this.props.events }
  }

  render () {
    return (
      <div className='LibraryView container'>
        <CategoryBar filterByCategory={(id) => this.props.filterByCategory(id)} />
        <div className='row'>
          {
            this.state.events.length !== 0
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
                      toggleJoin={(eventId) => this.props.toggleJoin(eventId)}
                    />
                  </div>
                )
              })
              : <div className='mx-auto mt-5'>
                <h2>No events</h2>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default withEventInterface(LibraryView)
