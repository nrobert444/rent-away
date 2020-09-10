import React from 'react'
import './SearchBox.css'
import useControlledInput from '../../customHooks/useControlledInput'

const SearchBox = props => {
  const where = useControlledInput('')
  const checkIn = useControlledInput('')
  const checkOut = useControlledInput('')
  const guests = useControlledInput(1)

  const submitSearch = e => {
    e.preventDefault()
    props.history.push(`/search/${where.value}`)
  }

  return (
    <div className='home-search-box col m4'>
      <h1>Book Unique places to stay and things to do.</h1>

      <div className='form'>
        <form onSubmit={submitSearch} className='search-box-form'>
          <div className='col m12'>
            <div className='form-label'>Where</div>
            <div className='input-field' id='where'>
              <input type='text' {...where} placeholder='Anywhere'></input>
            </div>
          </div>
          <div className='col m6'>
            <div className='form-label'>Check-In</div>
            <div className='input-field' id='check-in'>
              <input type='date' {...checkIn} placeholder='mm/dd/yyyy'></input>
            </div>
          </div>
          <div className='col m6'>
            <div className='form-label'>Check-Out</div>
            <div className='input-field' id='check-out'>
              <input type='date' {...checkOut} placeholder='mm/dd/yyyy'></input>
            </div>
          </div>
          <div className='col m12'>
            <div className='form-label'>Guests</div>
            <div className='input-field' id='guests'>
              <input
                type='number'
                {...guests}
                placeholder='How many guests'
              ></input>
            </div>
          </div>
          <div className='col m12 submit-btn'>
            <div className='input-field' id='submit-btn'>
              <input
                type='submit'
                className='btn-large waves-effect waves-light red accent-2 '
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBox
