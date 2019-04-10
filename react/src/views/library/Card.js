import React, { Component } from 'react'

class Card extends Component {
    renderName() {
        if (this.props.name && this.props.name.length > this.props.nameLength) {
            const string = this.props.name
            return string.substring(0, this.props.nameLength) + '...'
        }

        return this.props.name
    }
  
    render() {
        return (
            <div className='Card col-md-4 p-0'>
                <div className='m-4 text-center shadow'>
                    <img src="https://carepharmaceuticals.com.au/wp-content/uploads/sites/19/2018/02/placeholder-600x400.png" className='img-fluid' />
                    <div className='container'>
                        <div className='row p-1'>
                            <div className='col-8 align-self-center'>
                                <u><b>{this.renderName()}</b></u>
                            </div>
                            <div className='text-right col-4 align-self-center'>
                                <button type='button' className='button1'>Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Card