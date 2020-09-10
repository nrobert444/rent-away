import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Spinner from '../../utilities/Spinner/Spinner'
import './PaymentSuccess.css'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

const PaymentSuccess = props => {
  const token = useSelector(state => state.auth.token)
  const email = useSelector(state => state.auth.email)
  const [reservationDetails, setReservationDetails] = useState({})
  const [venueData, setVenueData] = useState({})
  const [waiting, setWaiting] = useState(true)

  useEffect(() => {
    const stripeToken = props.match.params.stripeToken
    const fetchPaymentSuccessData = async () => {
      const data = { stripeToken, token }
      const successUrl = `${window.apiHost}/payment/success`
      const resp = await axios.post(successUrl, data)
      console.log(resp.data)
      setReservationDetails(resp.data.reservationDetails)
      setVenueData(resp.data.venueData)
      setWaiting(false)
    }
    fetchPaymentSuccessData()
  }, [props.match.params.stripeToken, token])

  if (waiting) {
    return <Spinner />
  }
  return (
    <div className='reservation-success row'>
      <h1 className='col m12 center'>Start Packing!</h1>
      <div className='resv-details col s8 offset-s2'>
        <div className='confirmed col m12 row'>
          <FontAwesomeIcon
            icon={faLongArrowAltRight}
            size='1x'
            color='#ED0000'
          />{' '}
          Confirmed:
          <div className='header-text'>
            <div>Booked by: {email}</div>
            <div>{moment().format('MMMM Do, YYYY')}</div>
          </div>
        </div>
        <div className='confirmed-detail row'>
          <div className='col m5'>
            <div className='bordered col'>
              <div className='col m12 upper'>
                <div className='left'>Check in</div>
                <div className='right'>Check out</div>
              </div>
              <div className='col m12 lower'>
                <div className='left'>
                  {moment(reservationDetails.checkIn).format('MMMM Do, YYYY')}
                </div>
                <div className='right'>
                  {moment(reservationDetails.checkOut).format('MMMM Do, YYYY')}
                </div>
              </div>
              <div className='col m12 title-text'>{venueData.title}</div>
              <div className='col m12 details'>{venueData.details}</div>
            </div>
          </div>

          <div className='col m7'>
            <div className='bordered col'>
              <div className='col m12 upper charges'>
                <div className='charges-text col m12'>Charges</div>
                <div className='row col m12'>
                  <div className='left'>
                    ${reservationDetails.pricePerNight} x{' '}
                    {reservationDetails.diffDays} days
                  </div>
                  <div className='right'>${reservationDetails.totalPrice}</div>
                </div>
                <div className='row col m12'>
                  <div className='left'>Discount</div>
                  <div className='right'>$0</div>
                </div>
                <div className='row col m12 total'>
                  <div className='left'>TOTAL</div>
                  <div className='right'>${reservationDetails.totalPrice}</div>
                </div>
              </div>
              <div className='col m12 row'>
                To review or make changes to your reservation in the future,
                visit your <Link to='/account'>account page</Link>.
              </div>
              <div className='col m12 resv-image'>
                <img src={venueData.imageUrl} alt='reservation venue' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
