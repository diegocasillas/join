import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import HomeView from '../home/HomeView'
import LoginView from '../login/LoginView'
import LogoutView from '../login/LogoutView'
import RegisterView from '../register/RegisterView'
import LibraryView from '../library/LibraryView'
import EventView from '../event/EventView'
import EventUpdateView from '../event/EventUpdateView'
import EventCreationView from '../event/EventCreationView'
import Header from './header/Header'
import SideNavBar from './SideNavBar'
import EventCreationButton from './eventCreationButton/EventCreationButton'
import './mainView.css'
import './sideNavBar.css'
import './transitions.css'

class MainView extends Component {
  constructor (props) {
    super(props)
    this.state = { previous: null, back: null, backText: null, next: null, nextText: null, slide: 'slide-right' }
    this.slide = 'slide-right'
  }
  componentDidMount () {
    this.prepareRedirect(this.props.location.pathname, this.state.slide)
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.prepareRedirect(this.props.location.pathname, this.state.slide)
    }
  }

  updatePrevious (id) {
    window.scrollTo(0, 0)
    this.setState({ previous: '/events/' + id })
    this.prepareRedirect('/events/' + id, this.state.slide)
  }

  prepareRedirect (route, slide) {
    let { previous, back, backText, next, nextText } = this.state

    const routeTest = /\/events\/.*/.test(route) ? '/events/id' : route

    switch (routeTest) {
      case '/':
        back = this.state.previous || null
        backText = 'Event' || null
        next = '/events'
        nextText = 'Library'
        break
      case '/events':
        back = '/'
        backText = 'Home'
        next = this.state.previous || null
        nextText = 'Event'
        break
      case '/events/id':
        previous = route
        back = '/events'
        backText = 'Library'
        next = '/'
        nextText = 'Home'
        break
    }
    this.slide = slide
    this.setState({ previous, back, backText, next, nextText, slide })
  }

  redirect (route, slide) {
    this.prepareRedirect(route, slide)
    setTimeout(() => this.props.history.push(route), 100)
  }

  render () {
    return (
      <div className='MainView background'>
        <SideNavBar side='left' route={this.state.back} text={this.state.backText} redirect={() => this.redirect(this.state.back, 'slide-left')} />
        <SideNavBar side='right' route={this.state.next} text={this.state.nextText} redirect={() => this.redirect(this.state.next, 'slide-right')} />
        <div className='padding-fix'>
          <div className='sticky-top'>

            <Header loggedIn={this.props.loggedIn} />
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-1' />
                {this.props.loggedIn && this.props.location.pathname !== '/create' ? <EventCreationButton route={this.props.location.pathname} /> : null}
              </div>
            </div>
          </div>

          <div className='container'>
            <div className='wrapper'>
              <TransitionGroup className='transition-group'>
                <CSSTransition
                  key={this.props.location.key}
                  timeout={{ enter: 2000, exit: 2000 }}
                  classNames={this.state.slide}
                >
                  <Switch location={this.props.location}>
                    <Route exact path='/' render={() => <HomeView />} />
                    <Route exact path='/login' render={() => <LoginView toggleLogin={() => this.props.toggleLogin()} />} />
                    <Route exact path='/register' render={() => <RegisterView toggleLogin={() => this.props.toggleLogin()} />} />
                    <Route exact path='/logout' render={() => <LogoutView toggleLogin={() => this.props.toggleLogin()} />} />
                    <Route exact path='/events' render={() => <LibraryView />} />
                    <Route exact path='/events/:id' render={(props) => <EventView updatePrevious={(id) => this.updatePrevious(id)} {...props} />} />
                    <Route path='/events/:id/edit' render={(props) => <EventUpdateView {...props} />} />
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
