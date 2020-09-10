import React, { useState, useEffect } from 'react'
import Login from './Login'
import './Login.css'
import { useDispatch } from 'react-redux'
import openModal from '../../actions/openModal'
import axios from 'axios'
import swal from 'sweetalert'
import regAction from '../../actions/regAction'

const SignUp = props => {
  const dispatch = useDispatch()
  const [lowerPartOfForm, setLowerPartOfForm] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setLowerPartOfForm(
      <button type='button' onClick={showInputs} className='sign-up-button'>
        Sign up with email
      </button>
    )
  }, [])

  const submitLogin = async e => {
    e.preventDefault()
    const signUpUrl = `${window.apiHost}/users/signup`
    const data = {
      email,
      password
    }
    const resp = await axios.post(signUpUrl, data)
    const token = resp.data.token
    console.log(token)
    console.log(resp.data)

    if (resp.data.msg === 'userExists') {
      swal({
        title: 'Email Exists',
        text:
          'The email you provided is already registered. Please try another.',
        icon: 'error'
      })
    } else if (resp.data.msg === 'invalidData') {
      swal({
        title: 'Invalid email/password',
        text: 'Please provide a valid email and password',
        icon: 'error'
      })
    } else if (resp.data.msg === 'userAdded') {
      swal({
        title: 'Success!',
        icon: 'success'
      })
    }
    dispatch(regAction(resp.data))
  }

  const showInputs = () => {
    setLowerPartOfForm(
      <SignUpInputFields
        changeEmail={e => setEmail(e.target.value)}
        changePassword={e => setPassword(e.target.value)}
      />
    )
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
        {lowerPartOfForm}
        <div className='divider'></div>
        <div>
          Already have an account?
          <div>
            Don't have an account?
            <span
              className='pointer'
              onClick={() => {
                dispatch(openModal('open', <Login />))
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

export default SignUp

const SignUpInputFields = props => {
  return (
    <div className='sign-up-wrapper'>
      <div className=' col m12'>
        <div className='input-field' id='email'>
          <div className='form-label'>Email</div>
          <input type='text' placeholder='Email' onChange={props.setEmail} />
        </div>
      </div>
      <div className=' col m12'>
        <div className='input-field' id='password'>
          <div className='form-label'>Password</div>
          <input
            type='password'
            placeholder='Password'
            onChange={props.setPassword}
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
