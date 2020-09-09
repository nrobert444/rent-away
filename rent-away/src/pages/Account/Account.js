import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Account.css'
import axios from 'axios'
import moment from 'moment'
import { Route } from 'react-router-dom'
import Bookings from './Bookings'
import ChangePassword from './ChangePassword'
import AccountSideBar from './AccountSideBar'

class Account extends Component {
  state = {
    pastBookings: [],
    upcomingBookings: []
  }

  async componentDidMount() {
    const accountUrl = `${window.apiHost}/users/getBookings`
    const data = { token: this.props.auth.token }
    const resp = await axios.post(accountUrl, data)
    console.log(resp.data)
    let pastBookings = [],
      upcomingBookings = []
    resp.data.forEach(booking => {
      const today = moment()
      const checkOutDate = moment(booking.checkOut)
      const diffDays = checkOutDate.diff(today, 'days')
      if (diffDays < 0) {
        pastBookings.push(booking)
      } else {
        upcomingBookings.push(booking)
      }
    })
    this.setState({ pastBookings, upcomingBookings })
  }
  render() {
    const { pastBookings, upcomingBookings } = this.state
    return (
      <div className='account container-fluid'>
        <AccountSideBar />
        <div className='row'>
          <div className='col s8 offset-s3'>
            <Route
              exact
              path='/account'
              render={() => <h1>Choose an option on the Left!</h1>}
            />
            <Route path='/account/reservations/confirmed'>
              <Bookings
                type='upcoming'
                bookings={upcomingBookings}
                token={this.props.auth.token}
              />
            </Route>
            <Route path='/account/reservations/past'>
              <Bookings type='past' bookings={pastBookings} />
            </Route>
            <Route path='/account/change-pass' component={ChangePassword} />
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
export default connect(mapStateToProps)(Account)
