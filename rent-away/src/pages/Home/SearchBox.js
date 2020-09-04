import React, { Component } from 'react'
import './SearchBox.css'

class SearchBox extends Component {
  state = {
    where: '',
    checkIn: '',
    checkOut: '',
    guests: 0
  }

  changeWhere = e => {
    this.setState({ where: e.target.value })
  }
  changeCheckIn = e => {
    this.setState({ checkOut: e.target.value })
  }
  changeCheckOut = e => {
    this.setState({ checkOut: e.target.value })
  }
  changeGuests = e => {
    this.setState({ guests: e.target.value })
  }

  render() {
    return (
      <div className='home-search-box col m4'>
        <h1>Book Unique places to stay and things to do.</h1>
        <div className='form'>
          <form className='search-box-form'>
            <div className='col m12'>
              <div className='form-label'>Where</div>
              <div className='input-field' id='where'>
                <input
                  onChange={this.changeWhere}
                  type='text'
                  value={this.state.where}
                  placeholder='Anywhere'
                ></input>
              </div>
            </div>
            <div className='col m6'>
              <div className='form-label'>Check-In</div>
              <div className='input-field' id='check-in'>
                <input
                  onChange={this.changeCheckIn}
                  type='date'
                  value={this.state.checkIn}
                  placeholder='mm/dd/yyyy'
                ></input>
              </div>
            </div>
            <div className='col m6'>
              <div className='form-label'>Check-Out</div>
              <div className='input-field' id='check-out'>
                <input
                  onChange={this.changeCheckOut}
                  type='date'
                  value={this.state.checkOut}
                  placeholder='mm/dd/yyyy'
                ></input>
              </div>
            </div>
            <div className='col m12'>
              <div className='form-label'>Guests</div>
              <div className='input-field' id='guests'>
                <input
                  onChange={this.changeGuests}
                  type='number'
                  value={this.state.guests}
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
}
export default SearchBox
