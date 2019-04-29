import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Auth from '../../Auth'
import './eventCreation.css';

class EventCreationView extends Component {
  constructor(props) {
    super(props)
    this.state = { name: '', description: '', date: '', location: '', category: '', categories: [], toEvents: false, eventId: null }
    this.auth = new Auth()
  }

  componentDidMount() {
    fetch('http://localhost/index.php/api/categories', {
      method: 'GET'
    }).then(response => response.json())
      .then(json => this.setState({ categories: json }))
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  createEvent() {
    const data = new FormData()

    data.append('name', this.state.name)
    data.append('description', this.state.description)
    data.append('location', this.state.location)
    data.append('date', this.state.date)
    data.append('category', this.state.category)
    data.append('thumbnail', 'asdadsads')
    data.append('manager', this.auth.getDecodedToken().id)

    fetch('http://localhost/index.php/api/events', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(json => this.setState({ toEvents: true, eventId: json[0].id }))
  }

  render() {
    if (this.state.toEvents) {
      this.setState({ toEvents: false })
      return <Redirect to={`/events/${this.state.eventId}`} />
    }

    return (
      <div className='EventCreationView container mt-5'>
        <div className='col-5 mx-auto'>
          <div className='form-group'>
            <label for='name'></label>
            <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='name' placeholder='Write here the name of your event' value={this.state.name} onChange={(event) => this.handleChange('name', event.target.value)} />
          </div>

          <div className='form-group'>
            <label for='description'></label>
            <textarea className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='description' aria-label='With textarea' placeholder='What is your event about? Write something descriptive so people feel like joining!' value={this.state.description} onChange={(event) => this.handleChange('description', event.target.value)} />
          </div>

          <div className='row'>
            <div className='form-group col-6'>
              <label for='location'></label>
              <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='location' placeholder='Where?' value={this.state.location} onChange={(event) => this.handleChange('location', event.target.value)} />
            </div>
            <div className='form-group col-6'>
              <label for='date'></label>
              <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='date' placeholder='When does it start?' value={this.state.date} onChange={(event) => this.handleChange('date', event.target.value)} />
            </div>
          </div>

          <div className='form-group'>
            <label for='category'></label>
            <select class='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='category' onChange={(event) => this.handleChange('category', event.target.value)}>
              <option>Select a category</option>
              {this.state.categories.map(category => <option value={category.id}>{category.name}</option>)}
            </select>
          </div>

          <div className='form-group'>
            <label for='thumbnail'></label>
            <div className='custom-file'>
              <input type='file' className='custom-file-input' id='thumbnail' />
              <label className='custom-file-label border-0 rounded-0 mb-3 col-12 mx-auto' for='thumbnail'>Add a thumbnail picture</label>
            </div>
          </div>

          <div className='form-group text-center'>
            <button className='buttonCreateEvent btn btn-warning text-light mr-3 mt-2' onClick={() => this.createEvent()}>Create event</button>
            <Link to='/'><button className='buttonCancel btn btn-danger mt-2'>Cancel</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default EventCreationView
