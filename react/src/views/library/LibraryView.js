import React, { Component } from 'react'
import withEventInterface from '../../EventInterface'
import CategoryBar from './CategoryBar'
import Card from './Card'
import './libraryView.css'

class LibraryView extends Component {
  constructor (props) {
    super(props)
    this.state = { events: this.props.events, filteredEvents: this.props.events }
  }

  getFilteredEvents () {
    console.log(this.props.searchText)

    return this.props.searchText
      ? this.state.events.filter(event => event.name.toLowerCase().includes(this.props.searchText.toLowerCase()) || event.location.toLowerCase().includes(this.props.searchText.toLowerCase()))
      : this.state.events
  }

  render () {
    const events = this.getFilteredEvents()
    return (
      <div className='LibraryView container'>
        <CategoryBar filterByCategory={(id) => this.props.filterByCategory(id)} />
        <div className='row'>
          {
            events.length !== 0
              ? events.map((event) => {
                return (
                  <div className='col-12 mb-5'>
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
                <h2 className='text-light ubuntu-bold'>No events</h2>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default withEventInterface(LibraryView)
