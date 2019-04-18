import React, { Component } from 'react'
import Auth from '../../Auth'

class LoginView extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '', password: '' }
    this.auth = new Auth()
  }

  handleChange (field, value) {
    this.setState({ [field]: value })
  }

  login () {
    this.auth.login(this.state.name, this.state.password)
  }

  render () {
    return (
      <div className='LoginView'>
        <div className='form-group'>
          <input type='text' className='form-control' id='name' placeholder='Username' value={this.state.name} onChange={(event) => this.handleChange('name', event.target.value)} />
        </div>

        <div className='form-group'>
          <input type='password' className='form-control' id='password' placeholder='Password' value={this.state.password} onChange={(event) => this.handleChange('password', event.target.value)} />
        </div>

        <div className='form-group'>
          <button className='btn btn-warning text-light mr-2' onClick={() => this.login()}>Login</button>
        </div>
      </div>
    )
  }
}

export default LoginView
