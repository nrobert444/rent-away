import React, { Component } from 'react'
import { connect } from 'react-redux'
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

  componentDidMount() {}
  render() {
    return (
      <div>
        <Bookings />
        <AccountSideBar />
        <ChangePassword />
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
