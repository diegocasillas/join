import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../../Auth'

class RegisterView extends Component {
  constructor (props) {
    super(props)
    this.auth = new Auth()
    this.state = { name: '', email: '', password: '', toHome: false }
  }

  handleChange (field, value) {
    this.setState({ [field]: value })
  }

  register () {
    this.auth.register(this.state.name, this.state.email, this.state.password)
      .then(() => {
        this.props.toggleLogin()
        this.setState({ toHome: true })
      })
  }

  render () {
    if (this.state.toHome) {
      this.setState({ toHome: false })
      return <Redirect to={`/`} />
    }

    return (
      <div className='RegisterView'>
        <div className='form-group'>
          <input type='text' className='form-control' id='name' placeholder='Username' value={this.state.name} onChange={(event) => this.handleChange('name', event.target.value)} />
        </div>

        <div className='form-group'>
          <input type='text' className='form-control' id='email' placeholder='Email' value={this.state.email} onChange={(event) => this.handleChange('email', event.target.value)} />
        </div>

        <div className='form-group'>
          <input type='password' className='form-control' id='password' placeholder='Password' value={this.state.password} onChange={(event) => this.handleChange('password', event.target.value)} />
        </div>

        <div className='form-group'>
          <button className='btn btn-warning text-light mr-2' onClick={() => this.register()}>Register</button>
        </div>
      </div>
    )
  }
}

export default RegisterView
