import React, { useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import openModal from '../../actions/openModal'
import logoutAction from '../../actions/logoutAction'
import Login from '../../pages/LogIn/Login'
import SignUp from '../../pages/LogIn/SignUp'

const Navbar = props => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const email = useSelector(state => state.auth.email)

  useEffect(() => {
    dispatch(openModal('closed', ''))
  }, [dispatch, token])

  let navColor = 'transparent'

  if (props.location.pathname !== '/') {
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
              {email ? (
                <>
                  <li>
                    <Link to='/account'>Hello, {email}</Link>
                  </li>
                  <li onClick={() => dispatch(logoutAction())}>Logout</li>
                </>
              ) : (
                <>
                  <li
                    className='login-signup'
                    onClick={() => {
                      dispatch(openModal('open', <SignUp />))
                    }}
                  >
                    Sign Up
                  </li>
                  <li
                    className='login-signup'
                    onClick={() => {
                      dispatch(openModal('open', <Login />))
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

export default Navbar
