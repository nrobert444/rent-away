import React, { Component } from 'react'
import './SingleFullVenue.css'
import axios from 'axios'

class SingleFullVenue extends Component {
  state = {
    singleVenue: {}
  }

  async componentDidMount() {
    const vId = this.props.match.params.vid
    const url = `${window.apiHost}/venue/${vId}`
    const axiosResponse = await axios.get(url)
    const singleVenue = axiosResponse.data
    this.setState({ singleVenue })
  }

  render() {
    const sv = this.state.singleVenue
    return (
      <div className='row single-venue'>
        <div className='col s12 center'>
          <img src={sv.imageUrl} alt='venue' />
        </div>
        <div className='col s8 location-details offset-s2'>
          <div className='location'>{sv.location}</div>
          <div className='title'>{sv.title}</div>
          <div className='guests'>{sv.guests}</div>

          <div className="divider"></div>
        </div>
      </div>
    )
  }
}
export default SingleFullVenue
