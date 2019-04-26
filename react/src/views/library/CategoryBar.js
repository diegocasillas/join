import React, { Component } from 'react'

class CategoryBar extends Component {
  constructor (props) {
    super(props)

    this.state = { categories: [] }
  }

  componentDidMount () {
    fetch('http://localhost/index.php/api/categories', {
      method: 'GET'
    }).then(response => response.json())
      .then(categories => this.setState({ categories }))
  }

  render () {
    return (
      <div className='CategoryBar text-center mb-5'>
        <button className='btn btn-primary' onClick={() => this.props.filterByCategory(0)}>All</button>
        {this.state.categories.map(category => <button className='btn btn-primary' onClick={() => this.props.filterByCategory(category.id)}>{category.name}</button>)}
      </div>
    )
  }
}

export default CategoryBar
