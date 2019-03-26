import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeView from '../home/HomeView'
import LibraryView from '../library/LibraryView'

class MainView extends Component {
  render() {
    return (
      <div className='MainView'>
        <header>Header</header>
        <Router >
          <Route exact path='/' render={() => <HomeView />} />
          <Route path='/events' render={() => <LibraryView />} />
        </Router>
        <header>Footer</header>
      </div>
    )
  }
}

export default MainView
