import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Auth from '../../Auth'
import './loginView.css';

class LoginView extends Component {
  constructor(props) {
    super(props)
    this.auth = new Auth()
    this.state = { name: '', password: '', toEvents: false }
  }

  handleChange(field, value) {
    this.setState({ [field]: value })
  }

  login() {
    this.auth.login(this.state.name, this.state.password)
      .then(() => {
        this.props.toggleLogin()
        this.setState({ toEvents: true })
      })
  }

  render() {
    if (this.state.toEvents) {
      this.setState({ toEvents: false })
      return <Redirect to={`/events`} />
    }

    return (
      <div className='LoginView'>
        <div className='col-3 mt-5 mx-auto'>
          <div className='form-group'>
            <input type='text' className='form-control border-0 rounded-0 mb-3 col-12 mx-auto' id='name' placeholder='Username' value={this.state.name} onChange={(event) => this.handleChange('name', event.target.value)} />
          </div>

          <div className='form-group'>
            <input type='password' className='form-control border-0 rounded-0 mb-3 mt-4 col-12 mx-auto' id='password' placeholder='Password' value={this.state.password} onChange={(event) => this.handleChange('password', event.target.value)} />
          </div>

          <div className='form-group text-center'>
            <button className='buttonLogin btn btn-warning text-light mr-3 mt-3' onClick={() => this.login()}>Login</button>
            <Link to='/register'><button className='buttonRegister btn btn-danger mt-3'>Register</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginView
