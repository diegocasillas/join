import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Card extends Component {

    // Deals with event titles when they are too long to display.
    renderName() {
        if (this.props.name && this.props.name.length > this.props.nameLength) {
            const string = this.props.name
            return string.substring(0, this.props.nameLength) + '...'
        }

        return this.props.name
    }
    // Function to deal with date so we can format it.
    partyDate() {
        const str = this.props.date
        const dateArray = str.split('-')
        const options = { year: 'numeric', month: 'short', day: '2-digit' }
        const partydate = Intl.DateTimeFormat('en-GB', options).format(new Date(Date.UTC(dateArray[0], dateArray[1], dateArray[2])))
        const datesplit = partydate.split(' ')
        return { day: datesplit[0], month: datesplit[1] }
    }
    render() {
        return (
            <div className='Card mb-5 col-9 p-0 shadow mx-auto'>
                <div className='row'>
                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={`/events/${this.props.id}`}
                        className='col-8 background1 p-0 d-flex align-items-end'
                    >
                        <div className='d-flex flex-column m-3 mark'>
                            <div className='display-4'>
                                {this.renderName()}
                            </div>
                            <div className='p-2'>
                                {this.props.location}
                            </div>
                        </div>
                    </Link>
                    <div className='col-4 background2 p-0'>
                        <div className='h-75'>
                            <div className='display-2 colourtext text-center mark p-2 m-0'>
                                {this.partyDate().day}
                            </div>
                            <div className='colourtext p-1 m-0 text-center mark' style={{ fontSize: 30 }}>
                                {this.partyDate().month.toUpperCase()}
                            </div>

                        </div>
                        <div className='h-25'>
                            <div className='gradient-border' />
                            <button type='button' className='button1 m-0 p-0 brush' onClick={() => this.props.toggleJoin(this.props.id, this.props.joined)}>{this.props.joined ? 'Joined' : 'Join'}</button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Card
