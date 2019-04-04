import React, { Component } from 'react'
import logo from './Project-logo.png';
import './header.css';

class Header extends Component {
    render() {
        return (
            <div className='Header'>
                <nav className="container-fluid">
                    <ul className="navbar-nav">

                        <div className="row white shadow-sm">

                            <div className="col-4">
                                <img className="logo" src={logo} alt="Responsive image" width="60" height="60" /> Join
                            </div>

                            <div className="col-8 top-links text-right">
                                <li className="nav-item d-inline-block">
                                    <a className="nav-link" href="#1">Home</a>
                                </li>

                                <li className="nav-item d-inline-block">
                                    <a className="nav-link" href="#2">About us</a>
                                </li>

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
