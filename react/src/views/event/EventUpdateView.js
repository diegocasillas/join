import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Auth from '../../Auth'
import './eventCreation.css'

class EventUpdateView extends Component {
  constructor (props) {
    super(props)
    this.state = { event: null, categories: [], toEvents: false, eventId: null, loaded: false }
    this.auth = new Auth()
  }

  componentDidMount () {
    fetch('http://localhost/index.php/api/events/' + this.props.match.params.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ event: json[0], loaded: true })
      })
      .catch((error) => this.setState({ loaded: true }))

    fetch('http://localhost/index.php/api/categories', {
      method: 'GET'
    }).then(response => response.json())
      .then(json => this.setState({ categories: json }))
  }

  handleChange (field, value) {
    this.state.event[field] = value
    this.setState({ event: this.state.event })
  }

  updateEvent () {
    const data = new FormData()

    data.append('name', this.state.event.name)
    data.append('description', this.state.event.description)
    data.append('location', this.state.event.location)
    data.append('date', this.state.event.date)
    data.append('category', this.state.event.category)
    data.append('thumbnail', 'asdadsads')

    fetch('http://localhost/index.php/api/events/' + this.props.match.params.id, {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(json => this.setState({ toEvents: true }))
  }

  render () {
    if (this.state.toEvents) {
      this.setState({ toEvents: false })
      return <Redirect to={`/events/${this.state.event.id}`} />
    }

    return this.state.loaded && (
      <div className='EventUpdateView container mt-5'>
        <div className='col-5 mx-auto'>
          <div className='form-group'>
            <label for='name' />
            <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='name' placeholder='Write here the name of your event' value={this.state.event.name} onChange={(event) => this.handleChange('name', event.target.value)} />
          </div>

          <div className='form-group'>
            <label for='description' />
            <textarea className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='description' aria-label='With textarea' placeholder='What is your event about? Write something descriptive so people feel like joining!' value={this.state.event.description} onChange={(event) => this.handleChange('description', event.target.value)} />
          </div>

          <div className='row'>
            <div className='form-group col-6'>
              <label for='location' />
              <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='location' placeholder='Where?' value={this.state.event.location} onChange={(event) => this.handleChange('location', event.target.value)} />
            </div>
            <div className='form-group col-6'>
              <label for='date' />
              <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='date' placeholder='When does it start?' value={this.state.event.date} onChange={(event) => this.handleChange('date', event.target.value)} />
            </div>
          </div>

          <div className='form-group'>
            <label for='category' />
            <select class='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='category' onChange={(event) => this.handleChange('category', event.target.value)}>
              <option>Select a category</option>
              {this.state.categories.map(category => <option value={category.id} selected={category.id === this.state.event.category}>{category.name}</option>)}
            </select>
          </div>

          <div className='form-group'>
            <label for='thumbnail' />
            <div className='custom-file'>
              <input type='file' className='custom-file-input' id='thumbnail' />
              <label className='custom-file-label border-0 rounded-0 mb-3 col-12 mx-auto' for='thumbnail'>Add a thumbnail picture</label>
            </div>
          </div>

          <div className='form-group text-center'>
            <button className='buttonCreateEvent btn btn-warning text-light mr-3 mt-2' onClick={() => this.updateEvent()}>Create event</button>
            <Link to='/'><button className='buttonCancel btn btn-danger mt-2'>Cancel</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default EventUpdateView
