import React, { Component } from 'react'
import './Search.css'
import '../Home/Home.css'
import Cities from '../../utilities/City/Cities'
import Venues from '../../utilities/Venues/Venues'
import Activities from '../../utilities/Activity/Activities'
import axios from 'axios'
import Spinner from '../../utilities/Spinner/Spinner'

class Search extends Component {
  state = {
    activities: [],
    cities: [],
    venues: [],
    apiResponse: false
  }
  async componentDidMount() {
    const searchTerm = this.props.match.params.searchTerm
    const url = `${window.apiHost}/search/${searchTerm}`
    const resp = await axios.get(url)
    console.log(resp.data)
    this.setState({
      activities: resp.data.activities,
      cities: resp.data.cities,
      venues: resp.data.venues,
      apiResponse: true
    })
  }

  render() {
    if (!this.state.apiResponse) {
      return <Spinner />
    }
    return (
      <div className='container-fluid lower-fold'>
        <div className='row'>
          <div className='col s12'>
            <Cities
              cities={this.state.cities}
              header='Cities Matching Your Search'
            />
          </div>
          <div className='col s12'>
            <Activities
              activities={this.state.activities}
              header='Activies Matching Your Search'
            />
          </div>
          <div className='col s12'>
            <Venues
              venues={this.state.venues}
              header='Venues matching your search'
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Search
