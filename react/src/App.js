import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainView from './views/main/MainView'
import Auth from './Auth'
import './views/main/transitions.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.auth = new Auth()
    this.state = { loggedIn: this.auth.loggedIn() }
  }

  toggleLogin () {
    this.setState({ loggedIn: this.auth.loggedIn() })
  }

  render () {
    return (
      <div className='App'>
        <Router basename='/~c8cadi00'>
          <MainView loggedIn={this.state.loggedIn} toggleLogin={() => this.toggleLogin()} />
        </Router>
      </div>
    )
  }
}

export default App
