import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Search from './search/Search';
import logo from './Project-logo.png';
import './header.css';

class Header extends Component {
    render() {
        return (
            <div className='Header'>
                <nav className="container-fluid headerBox">
                    <ul className="navbar-nav">

                        <div className="row">

                            <div className="col-1">
                                <Link to='/'><img className="logo" src={logo} alt="Responsive image" width="120" height="55" /></Link>
                            </div>

                            <Search />

                            <div className="col-1 top-links text-right">
                                <li className="nav-item d-inline-block">
                                    <a className="nav-link" href="#3">Login</a>
                                </li>
                            </div>

                        </div>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header
