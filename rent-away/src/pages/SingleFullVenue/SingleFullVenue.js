import React, { Component } from 'react'
import './SingleFullVenue.css'
import Point from './Point'
import axios from 'axios'

class SingleFullVenue extends Component {
  state = {
    singleVenue: {},
    points: [],
    checkIn: '',
    checkOut: '',
    numberOfGuests: []
  }

  async componentDidMount() {
    const vId = this.props.match.params.vid
    const url = `${window.apiHost}/venue/${vId}`
    const axiosResponse = await axios.get(url)
    const singleVenue = axiosResponse.data

    const pointsUrl = `${window.apiHost}/points/get`
    const axiosPointsResponse = await axios.get(pointsUrl)

    const points = singleVenue.points.split(',').map((point, index) => {
      return (
        <Point key={index} pointDesc={axiosPointsResponse.data} point={point} />
      )
    })
    this.setState({ singleVenue, points })
  }

  changeNumberOfGuests = e => {
    this.setState({ numberOfGuests: e.target.value })
  }
  changeCheckIn = e => {
    this.setState({ checkIn: e.target.value })
  }
  changeCheckOut = e => {
    this.setState({ checkOut: e.target.value })
  }

  reserveNow = e => {
    console.log('User wants to reserve')
  }
  render() {
    const sv = this.state.singleVenue
    return (
      <div className='row single-venue'>
        <div className='col s12 center'>
          <img src={sv.imageUrl} alt='venue' />
        </div>
        <div className='col s8 location-details offset-s2'>
          <div className='col s8 left-details'>
            <div className='location'>{sv.location}</div>
            <div className='title'>{sv.title}</div>
            <div className='guests'>{sv.guests}</div>

            <div className='divider'></div>

            {this.state.points}

            <div className='details'>{sv.details}</div>
            <div className='amenities'>{sv.amenities}</div>
          </div>

          <div className='col s4 right-details'>
            <div className='price-per-night'>
              ${sv.pricePerNight} <span>per day</span>
            </div>
            <div className='rating'>{sv.rating}</div>
            <div className='col s6'>
              Check-In
              <input type='date' />
            </div>
            <div className='col s6'>
              Check-Out
              <input type='date' />
            </div>
            <div className='col s12'>
              <select name='Number of Guests' className='browser-default'>
                <option value='1 Guest'>1 Guest </option>
                <option value='2 Guest'>2 Guests</option>
                <option value='3 Guest'>3 Guests</option>
                <option value='4 Guest'>4 Guests</option>
                <option value='5 Guest'>5 Guests</option>
                <option value='6 Guest'>6 Guests</option>
                <option value='7 Guest'>7 Guests</option>
                <option value='8 Guest'>8 Guests</option>
              </select>
            </div>
            <div className='col s12 center'>
              <button onClick={this.reserveNow} className='btn red accent-2'>
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SingleFullVenue
