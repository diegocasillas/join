import React, { Component } from 'react'
import withEventInterface from '../../EventInterface'
import Card from '../library/Card'
import arrowLeft from '../../assets/SlidebarArrowLeft.png'
import arrowRight from '../../assets/SlidebarArrowRight.png'

class UserEvents extends Component {
  constructor (props) {
    super(props)

    this.state = { events: this.props.events }
  }

  render () {
    return (
      <div className='UserEvents'>
        <h4 className='mark mb-4 text-center'>{this.props.title}</h4>
        <div className='row'>
          {
            this.state.events.length !== 0
              ? <div id={this.props.id} class='carousel slide col-12' data-ride='carousel'>
                <div class='carousel-inner'>
                  {
                    this.state.events.map((event, index) => {
                      return (
                        <div className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                          <Card
                            id={event.id}
                            name={event.name}
                            thumbnail={event.thumbnail}
                            description={event.description}
                            location={event.location}
                            date={event.date}
                            nameLength={20}
                            joined={event.joined}
                            toggleJoin={(eventId) => this.props.toggleJoin(eventId)}
                          />
                        </div>

                      )
                    })
                  }
                </div>
                <a class='carousel-control-prev' href={`#${this.props.id}`} role='button' data-slide='prev'>
                  <img src={arrowLeft} />
                  <span class='sr-only'>Previous</span>
                </a>
                <a class='carousel-control-next' href={`#${this.props.id}`} role='button' data-slide='next'>
                  <img src={arrowRight} />
                  <span class='sr-only'>Next</span>
                </a>
              </div>

              : <div className='mx-auto mt-5'>
                <h2>No events</h2>
              </div>

          }
        </div>
      </div>
    )
  }
}

export default withEventInterface(UserEvents, 'user')
