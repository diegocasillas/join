import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import Auth from '../../Auth'
import './eventCreation.css'

class EventCreationView extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '', description: '', date: '', formattedDate: '', location: '', category: '', categories: [], toEvents: false, eventId: null }
    this.auth = new Auth()
  }

  componentDidMount () {
    fetch('http://www.students.oamk.fi/~c8blos00/index.php/api/categories', {
      method: 'GET'
    }).then(response => response.json())
      .then(json => this.setState({ categories: json }))
  }

  handleChange (field, value) {
    this.setState({ [field]: value })
  }

  handleCalendar (date) {
    const date2 = new Date(date)

    const year = date2.getFullYear()
    const month = date2.getMonth()
    const day = date2.getDate()
    this.setState({ date: date, formattedDate: year + '-' + month + '-' + day })
  }

  createEvent () {
    const data = new FormData()

    data.append('name', this.state.name)
    data.append('description', this.state.description)
    data.append('location', this.state.location)
    data.append('date', this.state.formattedDate)
    data.append('category', this.state.category)
    data.append('thumbnail', this.state.thumbnail)
    data.append('manager', this.auth.getDecodedToken().id)

    fetch('http://www.students.oamk.fi/~c8blos00/index.php/api/events', {
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
      <div className='EventCreationView container mt-5'>
        <div className='col-5 mx-auto'>
          <div className='form-group'>
            <label for='name' />
            <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='name' placeholder='Write here the name of your event' value={this.state.name} onChange={(event) => this.handleChange('name', event.target.value)} />
          </div>

          <div className='form-group'>
            <label for='description' />
            <textarea className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='description' aria-label='With textarea' placeholder='What is your event about? Write something descriptive so people feel like joining!' value={this.state.description} onChange={(event) => this.handleChange('description', event.target.value)} />
          </div>

          <div className='form-group'>
            <label for='location' />

          </div> <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='location' placeholder='Where?' value={this.state.location} onChange={(event) => this.handleChange('location', event.target.value)} />
          <div className='form-group'>
            <Calendar onChange={(date) => this.handleCalendar(date)} value={this.state.date} />
          </div>

          <div className='form-group'>
            <label for='category' />
            <select class='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='category' onChange={(event) => this.handleChange('category', event.target.value)}>
              <option>Select a category</option>
              {this.state.categories.map(category => <option value={category.id}>{category.name}</option>)}
            </select>
          </div>

          <div className='form-group'>
            <label for='thumbnail' />
            <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='thumbnail' placeholder='Add an image URL' value={this.state.thumbnail} onChange={(event) => this.handleChange('thumbnail', event.target.value)} />
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
