import React, { Component } from 'react'
import Login from './Login'
import './Login.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openModal from '../../actions/openModal'
import axios from 'axios'
import swal from 'sweetalert'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      lowerPartOfForm: (
        <button
          type='button'
          onClick={this.showInputs}
          className='sign-up-button'
        >
          Sign up with email
        </button>
      ),
      password: '',
      email: '',
      user: {}
    }
  }

  changeEmail = e => {
    this.setState({ email: e.target.value })
  }
  changePassword = e => {
    this.setState({ password: e.target.value })
  }

  submitLogin = async e => {
    e.preventDefault()

    const signUpUrl = `${window.apiHost}/users/signup`
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    const resp = await axios.post(signUpUrl, data)
    const token = resp.data.token
    console.log(token)
    console.log(resp.data)

    if (resp.data.msg === 'userExists') {
      swal({
        title: 'Email Exists',
        text: 'Email already created. Please use a different email',
        icon: 'error'
      })
    } else if (resp.data.msg === 'userAdded') {
      swal({
        title: 'Success!',
        icon: 'success'
      })
    } else if (resp.data.msg === 'invalidData') {
      swal({
        title: 'Invalid Email/Password',
        text: 'Please provide a valid email and password',
        icon: 'error',
        dangerMode: true
      })
    }
  }

  showInputs = () => {
    this.setState({
      lowerPartOfForm: (
        <SignUpInputFields
          changeEmail={this.changeEmail}
          changePassword={this.changePassword}
        />
      )
    })
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
          {this.state.lowerPartOfForm}
          <div className='divider'></div>
          <div>
            Already have an account?
            <div>
              Don't have an account?
              <span
                className='pointer'
                onClick={() => {
                  this.props.openModal('open', <Login />)
                }}
              >
                Log In
              </span>
            </div>
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

export default connect(null, mapDispatchToProps)(SignUp)

const SignUpInputFields = props => {
  return (
    <div className='sign-up-wrapper'>
      <div className=' col m12'>
        <div className='input-field' id='email'>
          <div className='form-label'>Email</div>
          <input type='text' placeholder='Email' onChange={props.changeEmail} />
        </div>
      </div>
      <div className=' col m12'>
        <div className='input-field' id='password'>
          <div className='form-label'>Password</div>
          <input
            type='password'
            placeholder='Password'
            onChange={props.changePassword}
          />
        </div>
      </div>
      <div className='col m12'>
        <button type='submit' className='btn red accent-2'>
          Sign Up!
        </button>
      </div>
    </div>
  )
}
