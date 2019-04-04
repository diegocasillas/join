import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import HomeView from '../home/HomeView'
import LibraryView from '../library/LibraryView'
import EventView from '../event/EventView'
import './transitions.css'

class MainView extends Component {
  render() {
    return (
      <div className='MainView'>
        <header>Header</header>
        <div className='wrapper'>
          <TransitionGroup className='transition-group'>
            <CSSTransition
              key={this.props.location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'slide'}
            >
              <Switch location={this.props.location}>
                <Route exact path='/' render={() => <HomeView />} />
                <Route exact path='/events' render={() => <LibraryView />} />
                <Route path='/events/:id' render={(props) => <EventView {...props} />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <header>Footer</header>
      </div>
    )
  }
}

export default withRouter(MainView)
