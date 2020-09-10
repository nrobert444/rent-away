import React, { useState, useEffect } from 'react'
import './SingleFullVenue.css'
import axios from 'axios'
import Point from './Point'
import { useDispatch, useSelector } from 'react-redux'
import openModal from '../../actions/openModal'
import Login from '../LogIn/Login'
import moment from 'moment'
import swal from 'sweetalert'
import loadScript from '../../utilityFunctions/loadScript'

const SingleFullVenue = props => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.useDispatch)
  const [singleVenue, setSingleVenue] = useState({})
  const [points, setPoints] = useState([])
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)

  useEffect(() => {
    const vId = props.match.params.vid
    const fetchSingleVenue = async () => {
      const url = `${window.apiHost}/venue/${vId}`
      const axiosResponse = await axios.get(url)
      const singleVenue = axiosResponse.data
      const pointsUrl = `${window.apiHost}/points/get`
      const pointsAxiosResponse = await axios.get(pointsUrl)
      const points = singleVenue.points.split(',').map((point, i) => {
        return (
          <Point key={i} pointDesc={pointsAxiosResponse.data} point={point} />
        )
      })
      setSingleVenue(singleVenue)
      setPoints(points)
    }
    fetchSingleVenue()
  }, [props.match.params.vid])

  const changeNumberOfGuests = e => {
    setNumberOfGuests(e.target.value)
  }
  const changeCheckIn = e => {
    setCheckIn(e.target.value)
  }
  const changeCheckOut = e => {
    setCheckOut(e.target.value)
  }

  const reserveNow = async e => {
    const startDayMoment = moment(checkIn)
    const endDayMoment = moment(checkOut)
    const diffDays = endDayMoment.diff(startDayMoment, 'days')
    if (diffDays < 1) {
      //check in date must be before checkout date
      swal({
        title: 'Check out date must be after check in date',
        icon: 'error'
      })
    } else if (isNaN(diffDays)) {
      //bad date
      swal({
        title: 'Please make sure your dates are valid',
        icon: 'error'
      })
    } else {
      // diff days is a valid number!
      const pricePerNight = singleVenue.pricePerNight
      const totalPrice = pricePerNight * diffDays
      const scriptUrl = 'https://js.stripe.com/v3'
      const stripePublicKey =
        'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT'
      await loadScript(scriptUrl)
      const stripe = window.Stripe(stripePublicKey)
      const stripeSessionUrl = `${window.apiHost}/payment/create-session`
      const data = {
        venueData: singleVenue,
        totalPrice,
        diffDays,
        pricePerNight,
        checkIn,
        checkOut,
        token: auth.token,
        numberOfGuests,
        currency: 'USD'
      }

      const sessionVar = await axios.post(stripeSessionUrl, data)
      // console.log(sessionVar.data);
      stripe
        .redirectToCheckout({
          sessionId: sessionVar.data.id
        })
        .then(result => {
          console.log(result)
          //if the network fails, this will run
        })
    }
  }

  return (
    <div className='row single-venue'>
      <div className='col s12 center'>
        <img src={singleVenue.imageUrl} alt='single venue' />
      </div>
      <div className='col s8 location-details offset-s2'>
        <div className='col s8 left-details'>
          <div className='location'>{singleVenue.location}</div>
          <div className='title'>{singleVenue.title}</div>
          <div className='guests'>{singleVenue.guests}</div>

          <div className='divider'></div>

          {points}

          <div className='details'>{singleVenue.details}</div>
          <div className='amenities'>{singleVenue.amenities}</div>
        </div>

        <div className='col s4 right-details'>
          <div className='price-per-day'>
            ${singleVenue.pricePerNight} <span>per day</span>
          </div>
          <div className='rating'>{singleVenue.rating}</div>
          <div className='col s6'>
            Check-In
            <input type='date' onChange={changeCheckIn} value={checkIn} />
          </div>
          <div className='col s6'>
            Check-Out
            <input type='date' onChange={changeCheckOut} value={checkOut} />
          </div>

          <div className='col s12'>
            <select
              className='browser-default'
              onChange={changeNumberOfGuests}
              value={numberOfGuests}
            >
              <option value='1'>1 Guest</option>
              <option value='2'>2 Guest</option>
              <option value='3'>3 Guest</option>
              <option value='4'>4 Guest</option>
              <option value='5'>5 Guest</option>
              <option value='6'>6 Guest</option>
              <option value='7'>7 Guest</option>
              <option value='8'>8 Guest</option>
            </select>
          </div>
          <div className='col s12 center'>
            {auth.token ? (
              <button onClick={reserveNow} className='btn red accent-2'>
                Reserve
              </button>
            ) : (
              <div>
                You must{' '}
                <span
                  className='text-link'
                  onClick={() => {
                    dispatch(openModal('open', <Login />))
                  }}
                >
                  Log in
                </span>{' '}
                to reserve
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleFullVenue
