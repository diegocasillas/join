import React, { Component } from 'react'

class Card extends Component {
    render() {
        return (
            <div className='Card col-md-4 p-0'>
                <div className='m-4 text-center shadow'>
                    <h3>{this.props.name}</h3>
                    <img src={this.props.thumbnail} className='img-fluid' />
                    <div className='container'>
                        <div className='row row-buffer row-background'>
                            <div className='col-8'>
                                <p className='text-left'>
                                    {this.props.description}
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