import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import HomeView from '../home/HomeView'
import LoginView from '../login/LoginView'
import LibraryView from '../library/LibraryView'
import EventView from '../event/EventView'
import EventCreationView from '../event/EventCreationView'
import Header from './header/Header'
import Footer from './footer/Footer'
import EventCreationButton from './eventCreationButton/EventCreationButton'
import './mainView.css'
import './transitions.css'

class MainView extends Component {
  render () {
    return (
      <div className='MainView background'>
        <div className='position-fixed h-100 text-light' style={{ left: 0, backgroundColor: 'rgba(0,0,0,0.55)' }} >LEFT</div>
        <div className='position-fixed h-100 text-light' style={{ right: 0, backgroundColor: 'rgba(0,0,0,0.55)' }}>RIGHT</div>
        <div className=''>
          <div className='sticky-top'>

            <Header />
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-1' />
                {this.props.location.pathname !== '/create' ? <EventCreationButton /> : null}
              </div>
            </div>
          </div>

          <div className='container'>
            <div className='wrapper'>
              <TransitionGroup className='transition-group'>
                <CSSTransition
                  key={this.props.location.key}
                  timeout={{ enter: 2000, exit: 2000 }}
                  classNames={'slide'}
                >
                  <Switch location={this.props.location}>
                    <Route exact path='/' render={() => <HomeView />} />
                    <Route exact path='/login' render={() => <LoginView />} />
                    <Route exact path='/events' render={() => <LibraryView />} />
                    <Route path='/events/:id' render={(props) => <EventView {...props} />} />
                    <Route exact path='/create' render={(props) => <EventCreationView {...props} />} />

                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MainView)
