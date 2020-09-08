import React, { Component } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openModal from '../../actions/openModal'
import Login from '../../pages/LogIn/Login'
import SignUp from '../../pages/LogIn/SignUp'

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
                <li
                  className='login-signup'
                  onClick={() => {
                    this.props.openModal('open', <SignUp />)
                  }}
                >
                  Sign Up
                </li>
                <li
                  className='login-signup'
                  onClick={() => {
                    this.props.openModal('open', <Login />)
                  }}
                >
                  Log In
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      openModal: openModal
    },
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(Navbar)
