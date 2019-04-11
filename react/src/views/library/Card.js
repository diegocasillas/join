import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Card extends Component {
  renderName () {
    if (this.props.name && this.props.name.length > this.props.nameLength) {
      const string = this.props.name
      return string.substring(0, this.props.nameLength) + '...'
    }

    return this.props.name
  }

  partyDate () {
    const str = this.props.date
    const dateArray = str.split('-')
    const options = { year: 'numeric', month: 'short', day: '2-digit' }
    const partydate = Intl.DateTimeFormat('en-GB', options).format(new Date(Date.UTC(dateArray[0], dateArray[1], dateArray[2])))
    const datesplit = partydate.split(' ')
    return { day: datesplit[0], month: datesplit[1] }
  }

  render () {
    return (
      <div className='Card col-md-4 p-0'>
        <div className='m-4 text-center shadow'>
          <Link to={`/events/${this.props.id}`}><img src='https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png' className='img-fluid' /></Link>
          <div className='container'>
            <div className='row'>
              <p className='font-weight-light m-1'>
                {this.partyDate().month}<br />
                {this.partyDate().day}
              </p>
            </div>
            <div className='row p-1'>
              <div className='col-8 align-self-center'>
                <Link to={`/events/${this.props.id}`}><u><b>{this.renderName()}</b></u></Link>
              </div>
              <div className='col-4 align-self-center'>
                <button type='button' className='button1'>Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Card
