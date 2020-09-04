import React, { Component } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    let navColor = 'transparent'

    if (this.props.location.pathname !== '/') {
      navColor = 'black'
    }

    return (
      <div className='container-fluid nav'>
        <div className='row'>
          <nav className={navColor}>
            <div className='nav-wrapper'>
              <Link to='/' className='left'>
                Rent-Away
              </Link>
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
