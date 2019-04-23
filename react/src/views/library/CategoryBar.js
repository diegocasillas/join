import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import './libraryView.css'
class LibraryView extends Component {
  constructor (props) {
    super(props)

    this.state = { categories: [] }
  }

  componentDidMount () {
    fetch('http://localhost/index.php/api/categories', {
      method: 'GET'
    }).then(response => response.json())
      .then(json => this.setState({ categories: json }))
  }

  render () {
    return (
      <div className='CategoryBar text-center'>
        <button className='btn btn-primary' onClick={() => this.props.filterByCategory(0)}>All</button>
        {this.state.categories.map(category => <button className='btn btn-primary' onClick={() => this.props.filterByCategory(category.id)}>{category.name}</button>)}
      </div>
    )
  }
}

export default LibraryView
