import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import sideLeftArrow from './SlidebarArrowLeft.png'
import sideRightArrow from './SlidebarArrowRight.png'

class SideNavBar extends Component {
  render () {
    return this.props.route && (
      <button
        className={`SideNavBar ${this.props.side === 'left' ? 'sideNavBarLeft' : 'sideNavBarRight'} position-fixed h-100 text-light`}
        style={{ border: 'none', outline: 'none' }}
        onClick={() => this.props.redirect()}
      >
        <div>
          <img
            className={this.props.side === 'left' ? 'sideLeftArrow' : 'sideRightArrow'}
            src={this.props.side === 'left' ? sideLeftArrow : sideRightArrow}
            alt={this.props.side === 'left' ? 'Left' : 'Right'}
            width='40'
            height='50'
          />
        </div>
        <div>{this.props.text}</div>
      </button>
    )
  }
}

export default SideNavBar
