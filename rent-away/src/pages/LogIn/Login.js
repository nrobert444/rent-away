import React, { Component } from 'react'
import './Login.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openModal from '../../actions/openModal'
import regAction from '../../actions/regAction'
import SignUp from './SignUp'
import axios from 'axios'
import swal from 'sweetalert'

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

  submitLogin = async e => {
    e.preventDefault()
    const loginUrl = `${window.apiHost}/users/login`
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    const resp = await axios.post(loginUrl, data)
    const token = resp.data.token
    console.log(token)
    console.log(resp.data)

    if (resp.data.msg === 'badPass') {
      swal({
        title: 'Invalid password',
        text: 'Please submit a valid password',
        icon: 'error'
      })
    } else if (resp.data.msg === 'noEmail') {
      swal({
        title: 'No Email',
        text: 'Please provide an email to login',
        icon: 'error'
      })
    } else if (resp.data.msg === 'loggedIn') {
      swal({
        title: 'Success',
        icon: 'success'
      })
      this.props.regAction(resp.data)
    }
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
      openModal: openModal,
      regAction: regAction
    },
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(Login)
