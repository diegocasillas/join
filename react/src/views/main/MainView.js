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
import './sideNavBar.css'
import './transitions.css'
import sideLeftArrow from './SlidebarArrowLeft.png'
import sideRightArrow from './SlidebarArrowRight.png'

class MainView extends Component {
  render() {
    return (
      <div className='MainView background'>
        <div className='sideNavBarLeft position-fixed h-100 text-light'>
          <div><img className='sideLeftArrow' src={sideLeftArrow} alt='Responsive image' width='40' height='50' /></div>
          LEFT</div>
        <div className='sideNavBarRight position-fixed h-100 text-light'>
          <div><img className='sideRightArrow' src={sideRightArrow} alt='Responsive image' width='40' height='50' /></div>
          RIGHT</div>
        <div className='padding-fix'>
          <div className='sticky-top'>

            <Header loggedIn={this.props.loggedIn} />
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
                    <Route exact path='/login' render={() => <LoginView toggleLogin={() => this.props.toggleLogin()} />} />
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
