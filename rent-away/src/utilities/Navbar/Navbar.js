import React, { Component } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openModal from '../../actions/openModal'
import logoutAction from '../../actions/logoutAction'
import Login from '../../pages/LogIn/Login'
import SignUp from '../../pages/LogIn/SignUp'

class Navbar extends Component {
  componentDidUpdate(oldProps) {
    if (oldProps.auth.token !== this.props.auth.token) {
      this.props.openModal('closed', '')
    }
  }

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
                {this.props.auth.email ? (
                  <>
                    <li>Hello, {this.props.auth.email}</li>
                    <li onClick={() => this.props.logoutAction()}>Logout</li>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
      openModal: openModal,
      logoutAction: logoutAction
    },
    dispatch
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
