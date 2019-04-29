import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../../Auth'
import './registerViewStyle.css';

class RegisterView extends Component {
  constructor(props) {
    super(props)
    this.auth = new Auth()
    this.state = { name: '', email: '', password: '', toHome: false }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  register() {
    this.auth.register(this.state.name, this.state.email, this.state.password)
      .then(() => {
        this.props.toggleLogin()
        this.setState({ toHome: true })
      })
  }

  render() {
    if (this.state.toHome) {
      this.setState({ toHome: false })
      return <Redirect to={`/`} />
    }

    return (
      <div className='RegisterView'>
        <div className='col-4 mt-5 mx-auto'>
          <div className='form-group'>
            <input type='text' className='form-control border-0 rounded-0 mb-3 mt-4 col-12 mx-auto' id='name' placeholder='Username' value={this.state.name} onChange={(event) => this.handleChange('name', event.target.value)} />
          </div>

          <div className='form-group'>
            <input type='text' className='form-control border-0 rounded-0 mb-3 mt-4 col-12 mx-auto' id='email' placeholder='Email' value={this.state.email} onChange={(event) => this.handleChange('email', event.target.value)} />
          </div>

          <div className='form-group'>
            <input type='password' className='form-control border-0 rounded-0 mb-3 mt-4 col-12 mx-auto' id='password' placeholder='Password' value={this.state.password} onChange={(event) => this.handleChange('password', event.target.value)} />
          </div>

          <div className='form-group text-center'>
            <button className='registerButton btn btn-warning text-light mr-3 mt-4' onClick={() => this.register()}>Register</button>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterView
