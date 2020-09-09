import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Spinner from '../../utilities/Spinner/Spinner'
import './PaymentSuccess.css'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

class PaymentSuccess extends Component {
  state = {
    reservationDetails: {},
    venueData: {},
    waiting: true
  }

  async componentDidMount() {
    const stripeToken = this.props.match.params.stripeToken
    const token = this.props.auth.token
    const data = { stripeToken, token }
    const successUrl = `${window.apiHost}/payment/success`
    const resp = await axios.post(successUrl, data)
    console.log(resp.data)
    this.setState({
      reservationDetails: resp.data.reservationDetails,
      userData: resp.data.userData,
      waiting: false
    })
  }
  render() {
    if (this.state.waiting) {
      return <Spinner />
    }
    const rd = this.state.reservationDetails
    const vd = rd.venueData
    console.log(vd)
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
              <div>Booked by: {this.props.auth.email}</div>
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
                    {moment(rd.checkIn).format('MMMM Do, YYYY')}
                  </div>
                  <div className='right'>
                    {moment(rd.checkOut).format('MMMM Do, YYYY')}
                  </div>
                </div>
                <div className='col m12 title-text'>{vd.title}</div>
                <div className='col m12 details'>{vd.details}</div>
              </div>
            </div>

            <div className='col m7'>
              <div className='bordered col'>
                <div className='col m12 upper charges'>
                  <div className='charges-text col m12'>Charges</div>
                  <div className='row col m12'>
                    <div className='left'>
                      ${rd.pricePerNight} x {rd.diffDays} days
                    </div>
                    <div className='right'>${rd.totalPrice}</div>
                  </div>
                  <div className='row col m12'>
                    <div className='left'>Discount</div>
                    <div className='right'>$0</div>
                  </div>
                  <div className='row col m12 total'>
                    <div className='left'>TOTAL</div>
                    <div className='right'>${rd.totalPrice}</div>
                  </div>
                </div>
                <div className='col m12 row'>
                  To review or make changes to your reservation in the future,
                  visit your <Link to='/account'>account page</Link>.
                </div>
                <div className='col m12 resv-image'>
                  <img src={vd.imageUrl} alt='reservation venue' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(PaymentSuccess)
