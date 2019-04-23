import React, { Component } from 'react'
import './search.css';
import searchIcon from './search_icon.png'

class Search extends Component {
    render() {
        return (
            <div className="Search col-8 border-0">
                <div className="input-group mb-3 col-10 col-md-5 mx-auto top-links">
                    <div className="input-group-prepend">
                        <span className="searchBox rounded-0 input-group-text" id="basic-addon1">
                            <img className="search-icon" src={searchIcon} width="23" height="23" />
                        </span>
                    </div>
                    <input type="text" className="search-box rounded-0 form-control border-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                </div>


            </div>
        )
    }
}

export default Search
