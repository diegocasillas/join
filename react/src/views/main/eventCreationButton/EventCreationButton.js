import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './eventCreationButton.css';


class EventCreationButton extends Component {
    render() {
        return (
            <div className="EventCreationButton col-12 text-right">
                <Link to='/create'><button className="btn btn-primary rounded-circle">+</button></Link>
            </div>
        )
    }
}

export default EventCreationButton