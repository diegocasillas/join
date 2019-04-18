import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import decode from 'jwt-decode'
import Auth from '../../Auth'

class EventCreationView extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '', description: '', date: '', location: '', toEvents: false, eventId: null }
    this.auth = new Auth()
  }

  handleChange (field, value) {
    this.setState({ [field]: value })
  }

  createEvent () {
    const data = new FormData()
    
    data.append('name', this.state.name)
    data.append('description', this.state.description)
    data.append('location', this.state.location)
    data.append('date', this.state.date)
    data.append('thumbnail', 'asdadsads')
    data.append('manager', decode(this.auth.getToken()).id)

    fetch('http://localhost/index.php/api/events', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(json => this.setState({ toEvents: true, eventId: json[0].id }))
  }

  render () {
    if (this.state.toEvents) {
      this.setState({ toEvents: false })
      return <Redirect to={`/events/${this.state.eventId}`} />
    }

    return (
      <div className='EventCreationView container'>
        <div className='form-group'>
          <label for='name'>Event name</label>
          <input type='text' className='form-control' id='name' placeholder='Write here the name of your event' value={this.state.name} onChange={(event) => this.handleChange('name', event.target.value)} />
        </div>

        <div className='form-group'>
          <label for='name'>Description</label>
          <textarea className='form-control' id='description' aria-label='With textarea' placeholder='What is your event about? Write something descriptive so people feel like joining!' value={this.state.description} onChange={(event) => this.handleChange('description', event.target.value)} />
        </div>

        <div className='row'>
          <div className='form-group col-6'>
            <label for='name'>Location</label>
            <input type='text' className='form-control' id='location' placeholder='Where will the event happen?' value={this.state.location} onChange={(event) => this.handleChange('location', event.target.value)} />
          </div>
          <div className='form-group col-6'>
            <label for='name'>Date</label>
            <input type='text' className='form-control' id='date' placeholder='When does it start?' value={this.state.date} onChange={(event) => this.handleChange('date', event.target.value)} />
          </div>
        </div>

        <div className='form-group'>
          <label for='thumbnail'>Add a thumbnail picture</label>
          <div className='custom-file'>
            <input type='file' className='custom-file-input' id='thumbnail' />
            <label className='custom-file-label' for='thumbnail'>Add a thumbnail picture</label>
          </div>
        </div>

        <div className='form-group'>
          <button className='btn btn-warning text-light mr-2' onClick={() => this.createEvent()}>Create event</button>
          <Link to='/'><button className='btn btn-danger'>Cancel</button></Link>
        </div>
      </div>
    )
  }
}

export default EventCreationView
