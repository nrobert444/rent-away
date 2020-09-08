import React, { Component } from 'react'
import './Login.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openModal from '../../actions/openModal'
import SignUp from './SignUp'
// import axios from 'axios'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  emailSignIn = e => {
    this.setState({ email: e.target.value })
  }

  passwordSignIn = e => {
    this.setState({ password: e.target.value })
  }

  submitLogin = e => {
    e.preventDefault()
    console.log(this.state.email)
    console.log(this.state.password)
  }

  render() {
    return (
      <div className='login-form'>
        <form onSubmit={this.submitLogin}>
          <button className='facebook-login'>Connect With Facebook</button>
          <button className='google-login'>Connect With Google</button>
          <div className='login-or center'>
            <span>or</span>
            <div className='or-divider'></div>
          </div>
          <input
            type='text'
            className='browser-default'
            placeholder='Email address'
            onChange={this.emailSignIn}
          />
          <input
            type='password'
            className='browser-default'
            placeholder='Password'
            onChange={this.passwordSignIn}
          />
          <button className='sign-up-button'>Login</button>
          <div className='divider'></div>
          <div>
            Don't have an account?
            <span
              className='pointer'
              onClick={() => {
                this.props.openModal('open', <SignUp />)
              }}
            >
              Sign Up
            </span>
          </div>
        </form>
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

export default connect(null, mapDispatchToProps)(Login)
