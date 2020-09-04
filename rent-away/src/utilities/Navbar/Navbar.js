import React, { Component } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <div className='container-fluid nav'>
        <div className='row'>
          <nav>
            <div className='nav-wrapper'>
              <ul id='nav-mobile' className='right'>
                <li>
                  <Link to='/'>Englsh (US)</Link>
                </li>
                <li>
                  {' '}
                  <Link to='/'>$ USD</Link>
                </li>
                <li>
                  {' '}
                  <Link to='/'>Become a Host</Link>
                </li>
                <li>
                  {' '}
                  <Link to='/'>Sign Up</Link>
                </li>
                <li>
                  {' '}
                  <Link to='/'>Log In</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
export default Navbar
