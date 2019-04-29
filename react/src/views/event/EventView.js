import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from '../library/Card'
import Auth from '../../Auth'
class EventView extends Component {
  constructor (props) {
    super(props)
    this.auth = new Auth()
    this.state = { event: null, loaded: false }
  }

  componentDidMount () {
    this.props.updatePrevious(this.props.match.params.id)
    fetch('http://localhost/index.php/api/events/' + this.props.match.params.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ event: json[0], loaded: true })
      })
      .catch((error) => this.setState({ loaded: true }))
  }

  render () {
    return (
      <div className='EventView container'>
        {
          this.state.event
            ? <div>
              {
                this.state.event.manager === this.auth.getDecodedToken().id
                  ? <div className='text-center mb-2'>
                    <Link to={'/events/' + this.state.event.id + '/edit'}><button className='btn btn-primary' >Edit</button></Link>
                  </div> : null
              }

              <Card
                id={this.state.event.id}
                name={this.state.event.name}
                thumbnail={this.state.event.thumbnail}
                description={this.state.event.description}
                location={this.state.event.location}
                date={this.state.event.date}
                nameLength={20}
                showDescription
              />
            </div>
            : null}

      </div>
    )
  }
}

export default EventView
