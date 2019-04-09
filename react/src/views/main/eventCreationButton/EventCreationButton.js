import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './eventCreationButton.css';


class EventCreationButton extends Component {
    render() {
        return (
            <div className="EventCreationButton">
                <Link to='/create'>Create</Link>
            </div>
        )
    }
}

export default EventCreationButton