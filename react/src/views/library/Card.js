import React, { Component } from 'react'

class Card extends Component {
  render () {
    return (
      <div className='Card col-md-4'>
        <div className='m-2 p-0 text-center shadow'>
          <h3>Event 1</h3>
          <img src='https://jlfarchitects.com/wp-content/uploads/2015/03/img-placeholder.jpg ' className='img-fluid' />
          <div className='container'>
            <div className='row row-buffer row-background'>
              <div className='col-8'>
                <p className='text-left'>
                                ASDSADASDSADASDSADASDSADASDSADASDSADASDSADASDSADASDSADASDSADASDSADASDSADASDSADasdasdasdsasdpoasoijdpogWE
                                OPGRJOGOWGHRGBJLNJNIJAENJAENOJPNI
                </p>
              </div>
              <div className='text-right col-4'>
                <button type='button' className='top-buffer button1'>Join</button>
                <button type='button' className='top-buffer button2'>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Card
