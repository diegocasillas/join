import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Auth from '../../Auth'
import Octicon, { Location } from '@githubprimer/octicons-react'

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: false }
    this.auth = new Auth()
  }

  handleClick (id) {
    this.setState({ loading: true })
    this.props.toggleJoin(id).then(() => {
      if (this.props.getCount) {
        this.props.getCount()
      }
      this.setState({ loading: false })
    })
  }

  renderName () {
    if (this.props.name && this.props.name.length > this.props.nameLength) {
      const string = this.props.name
      return string.substring(0, this.props.nameLength) + '...'
    }

    return this.props.name
  }

  partyDate () {
    const str = this.props.date
    const dateArray = str.split('-')
    const options = { year: 'numeric', month: 'short', day: '2-digit' }
    const partydate = Intl.DateTimeFormat('en-GB', options).format(new Date(Date.UTC(dateArray[0], dateArray[1], dateArray[2])))
    const datesplit = partydate.split(' ')
    return { day: datesplit[0], month: datesplit[1] }
  }
  render () {
    return (
      <div className='Card col-9 p-0 shadow mx-auto'>
        <div className='row'>
          <Link
            style={{ textDecoration: 'none', color: 'white' }}
            to={`/events/${this.props.id}`}
            className='col-8 background1 p-0 d-flex align-items-end'
          >
            <div className='d-flex flex-column m-3' style={{ textShadow: 'black 2px 2px 2px' }}>
              <div className='p-0 ubuntu-regular mt-2' style={{ fontSize: '54px' }}>
                {this.renderName()}
              </div>
              <div className='ubuntu-regular ml-2' style={{ fontSize: '25px' }}>
                <Octicon icon={Location} />
                <span
                  className='ml-1'
                  style={{ position: 'relative', top: '-3px' }}
                >
                  {this.props.location}
                </span>
              </div>
            </div>
          </Link>

          <div className='col-4 background2 p-0'>
            <div className='h-75' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ display: 'flex-column', textAlign: 'center' }}>
                <div className='colourtext ubuntu-bold ' style={{ fontSize: '100px' }}>
                  {this.partyDate().day}
                </div>
                <div className='colourtext m-0 ubuntu-bold'
                  style={{ position: 'relative', top: '-20px', fontSize: '35px' }}>
                  {this.partyDate().month.toUpperCase()}
                </div>
              </div>
            </div>

            <div className='h-25'>
              <div className='gradient-border' />
              {
                this.auth.loggedIn()
                  ? <button type='button' className='button1 m-0 p-0 brush' onClick={() => this.handleClick(this.props.id)}>
                    {
                      this.state.loading
                        ? <Loader
                          type='Oval'
                          color='white'
                          height='20'
                          width='20'
                        />
                        : this.props.joined ? 'Joined' : 'Join'
                    }
                  </button>
                  : <Link to='/login'>
                    <button type='button' className='button1 m-0 p-0 brush'>{this.props.joined ? 'Joined' : 'Join'}
                    </button>
                  </Link>
              }

            </div>
          </div>
        </div>
        {
          this.props.showDescription
            ? <div>
              <div className='row description-background ubuntu-regular mt-5'
                style={{ height: '50px', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                <span className='brush'>Joined: </span> {this.props.count}
              </div>
              <div className='row bg-light ubuntu-regular' style={{ minHeight: '150px', overflow: 'auto' }}>
                <div className='col-10 mx-auto mt-4'> {this.props.description}</div>
              </div>
            </div>
            : null
        }
      </div >
    )
  }
}

export default Card
