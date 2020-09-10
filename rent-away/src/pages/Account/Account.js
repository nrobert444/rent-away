import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Account.css'
import axios from 'axios'
import moment from 'moment'
import { Route } from 'react-router-dom'
import Bookings from './Bookings'
import ChangePassword from './ChangePassword'
import AccountSideBar from './AccountSideBar'

const Account = props => {
  const token = useSelector(state => state.auth.token)
  const [pastBookings, setPastBookings] = useState([])
  const [upcomingBookings, setUpcomingBookings] = useState([])

  useEffect(() => {
    const data = { token }
    const accountUrl = `${window.apiHost}/users/getBookings`
    const fetchAccountData = async () => {
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
      setPastBookings(pastBookings)
      setUpcomingBookings(upcomingBookings)
    }
    fetchAccountData()
  }, [token])

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
              token={token}
            />
          </Route>
          <Route path='/account/reservations/past'>
            <Bookings type='past' bookings={pastBookings} token={token} />
          </Route>
          <Route path='/account/change-pass' component={ChangePassword} />
        </div>
      </div>
    </div>
  )
}

export default Account
