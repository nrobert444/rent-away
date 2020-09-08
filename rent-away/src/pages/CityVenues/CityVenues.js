import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './CityVenues.css'
import axios from 'axios'
import Spinner from '../../utilities/Spinner/Spinner'
import Venues from '../../utilities/Venues/Venues'

class CityVenues extends Component {
  state = {
    venues: [],
    headers: ''
  }
  async componentDidMount() {
    const cityName = this.props.match.params.cityName
    const url = `${window.apiHost}/venues/city/${cityName}`
    const resp = await axios.get(url, { cityName })
    this.setState({ venues: resp.data.venues, header: resp.data.header })
  }
  render() {
    if (!this.state.header) {
      return <Spinner />
    }
    return (
      <div className='row'>
        <Venues venues={this.state.venues} header={this.state.header} />
      </div>
    )
  }
}
export default CityVenues
