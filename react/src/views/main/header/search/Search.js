import React, { Component } from 'react'
import './search.css'
import Octicon, { Search as Icon } from '@githubprimer/octicons-react'

class Search extends Component {
  handleChange (searchText) {
    if (this.props.path !== '/events') {
      this.props.redirect()
    }

    this.props.getSearchText(searchText)
  }

  render () {
    return (
      <div className='Search col-8 border-0'>
        <div className='input-group mb-3 col-10 col-md-5 mx-auto top-links'>
          <div className='input-group-prepend'>
            <span className='searchBox rounded-0 input-group-text text-light' id='basic-addon1'>
              <Octicon icon={Icon} />
            </span>
          </div>
          <input type='text' className='search-box rounded-0 form-control border-0' placeholder='Search' aria-label='Search' aria-describedby='basic-addon1' onChange={(event) => this.handleChange(event.target.value)} />
        </div>

      </div>
    )
  }
}

export default Search
