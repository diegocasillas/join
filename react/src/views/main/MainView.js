import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeView from '../home/HomeView'
import LibraryView from '../library/LibraryView'
import EventView from '../event/EventView'

class MainView extends Component {
  render() {
    return (
      <div className='MainView'>
        <header>Header</header>
        <Router >
          <Route exact path='/' render={() => <HomeView />} />
          <Route exact path='/events' render={() => <LibraryView />} />
          <Route path='/events/:id' render={(props) => <EventView {...props} />} />
        </Router>
        <header>Footer</header>
      </div>
    )
  }
}

export default MainView
