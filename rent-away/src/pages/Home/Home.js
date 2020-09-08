import React, { Component } from 'react'
import './Home.css'
import SearchBox from './SearchBox'
import Activities from '../../utilities/Activity/Activities'
import Spinner from '../../utilities/Spinner/Spinner'
import Cities from '../../utilities/City/Cities'
import Venues from '../../utilities/Venues/Venues'
import axios from 'axios'

class Home extends Component {
  state = {
    cities: [],
    europeCities: {},
    beachCities: {},
    asiaCities: {},
    usCities: {},
    exoticCities: {},
    activities: [],
    recVenues: {}
  }

  async componentDidMount() {
    const citiesURL = `${window.apiHost}/cities/recommended`
    const europeCitiesURL = `${window.apiHost}/cities/europe`
    const beachCitiesURL = `${window.apiHost}/cities/beach`
    const asiaCitiesURL = `${window.apiHost}/cities/asia`
    const usCitiesURL = `${window.apiHost}/cities/us`
    const exoticCitiesURL = `${window.apiHost}/cities/exotic`

    const citiesPromises = []
    citiesPromises.push(axios.get(citiesURL))
    citiesPromises.push(axios.get(europeCitiesURL))
    citiesPromises.push(axios.get(beachCitiesURL))
    citiesPromises.push(axios.get(asiaCitiesURL))
    citiesPromises.push(axios.get(usCitiesURL))
    citiesPromises.push(axios.get(exoticCitiesURL))

    Promise.all(citiesPromises).then(data => {
      const recommendedCities = data[0].data
      const europeCities = data[1].data
      const beachCities = data[2].data
      const asiaCities = data[3].data
      const usCities = data[4].data
      const exoticCities = data[5].data
      this.setState({
        cities: recommendedCities,
        europeCities,
        beachCities,
        asiaCities,
        usCities,
        exoticCities
      })
    })

    const activitiesURL = `${window.apiHost}/activities/today`
    const activities = await axios.get(activitiesURL)
    this.setState({
      activities: activities.data
    })
    const recVenuesURL = `${window.apiHost}/venues/recommended`
    const venues = await axios.get(recVenuesURL)
    this.setState({
      recVenues: venues.data
    })
  }

  render() {
    if (this.state.cities.length === 0 || !this.state.recVenues.venues) {
      return <Spinner />
    }

    return (
      <>
        <div className='container-fluid'>
          <div className='row'>
            <div className='home col s12'>
              <div className='upper-fold'>
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid lower-fold'>
          <div className='row'>
            <div className='col s12'>
              <Cities
                cities={this.state.cities}
                header='Recommended Cities for You'
              />
            </div>
            <div className='col s12'>
              <Activities
                activities={this.state.activities}
                header='Today in Your Area'
              />
              <div className='col s12'>
                <Venues
                  venues={this.state.recVenues.venues}
                  header={this.state.recVenues.header}
                />
              </div>
              <div className='col s12'>
                <Cities
                  cities={this.state.europeCities.cities}
                  header={this.state.europeCities.header}
                />
              </div>
              {/* <div className='col s12'>
                <Cities
                  cities={this.state.beachCities.cities}
                  header={this.state.beachCities.header}
                />
              </div> */}
              <div className='col s12'>
                <Cities
                  cities={this.state.asiaCities.cities}
                  header={this.state.asiaCities.header}
                />
              </div>
              <div className='col s12'>
                <Cities
                  cities={this.state.usCities.cities}
                  header={this.state.usCities.header}
                />
              </div>
              <div className='col s12'>
                <Cities
                  cities={this.state.exoticCities.cities}
                  header={this.state.exoticCities.header}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
