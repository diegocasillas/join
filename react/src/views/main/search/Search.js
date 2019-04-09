import React, { Component } from 'react'
import './search.css';
import searchIcon from './search_icon.png'

class Search extends Component {
    render() {
        return (
            <div className="Search col-10">
                <div className="input-group mb-3 col-10 col-md-5 mx-auto top-links">
                    <div className="input-group-prepend">
                        <span className="rounded-0 input-group-text white" id="basic-addon1">
                            <img className="search-icon" src={searchIcon} width="20" height="20" />
                        </span>
                    </div>
                    <input type="text" className="search-box rounded-0 form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                </div>


            </div>
        )
    }
}

export default Search
