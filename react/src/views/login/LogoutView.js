import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../../Auth'

class LogoutView extends Component {
  constructor (props) {
    super(props)
    this.auth = new Auth()
    this.state = { toHome: false }
  }

  componentDidMount () {
    this.auth.logout()
    this.props.toggleLogin()
    this.setState({ toHome: true })
  }

  render () {
    if (this.state.toHome) {
      this.setState({ toHome: false })
      return <Redirect to={`/`} />
    }

    return (
      <div className='LogoutView'>
        Logging out
      </div>
    )
  }
}

export default LogoutView
