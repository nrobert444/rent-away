import React, { useState } from 'react'
import './Login.css'
import { useDispatch } from 'react-redux'
import openModal from '../../actions/openModal'
import regAction from '../../actions/regAction'
import SignUp from './SignUp'
import axios from 'axios'
import swal from 'sweetalert'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = async e => {
    e.preventDefault()
    const loginUrl = `${window.apiHost}/users/login`
    const data = {
      email,
      password
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
      dispatch(regAction(resp.data))
    }
  }

  return (
    <div className='login-form'>
      <form onSubmit={submitLogin}>
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
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='browser-default'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className='sign-up-button'>Login</button>
        <div className='divider'></div>
        <div>
          Don't have an account?
          <span
            className='pointer'
            onClick={() => {
              dispatch(openModal('open', <SignUp />))
            }}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  )
}

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       openModal: openModal,
//       regAction: regAction
//     },
//     dispatch
//   )
// }

export default Login
