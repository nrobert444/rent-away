import React, { useState, useEffect } from 'react'
import './Home.css'
import SearchBox from './SearchBox'
import Activities from '../../utilities/Activity/Activities'
import Spinner from '../../utilities/Spinner/Spinner'
import Cities from '../../utilities/City/Cities'
import Venues from '../../utilities/Venues/Venues'
import axios from 'axios'

const Home = props => {
  const [cities, setCities] = useState([])
  const [europeCities, setEuropeCities] = useState({})
  const [asiaCities, setAsisCities] = useState({})
  const [usCities, setUsCities] = useState({})
  const [exoticCities, setExoticCities] = useState({})
  const [activities, setActivities] = useState([])
  const [recVenues, setRecVenues] = useState({})

  useEffect(() => {
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
      const asiaCities = data[3].data
      const usCities = data[4].data
      const exoticCities = data[5].data
      setCities(recommendedCities)
      setEuropeCities(europeCities)
      setAsisCities(asiaCities)
      setUsCities(usCities)
      setExoticCities(exoticCities)
    })
    const fetchActivitiesData = async () => {
      const activitiesURL = `${window.apiHost}/activities/today`
      const activities = await axios.get(activitiesURL)
      setActivities(activities.data)
    }
    const fetchVenuesData = async () => {
      const recVenuesURL = `${window.apiHost}/venues/recommended`
      const venues = await axios.get(recVenuesURL)
      setRecVenues(venues.data)
    }
    fetchActivitiesData()
    fetchVenuesData()
  }, [])

  if (cities.length === 0 || !recVenues.venues) {
    return <Spinner />
  }
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='home col s12'>
            <div className='upper-fold'>
              <SearchBox history={props.history} />
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid lower-fold'>
        <div className='row'>
          <div className='col s12'>
            <Cities cities={cities} header='Recommended Cities for You' />
          </div>
          <div className='col s12'>
            <Activities activities={activities} header='Today in Your Area' />
            <div className='col s12'>
              <Venues venues={recVenues.venues} header={recVenues.header} />
            </div>
            <div className='col s12'>
              <Cities
                cities={europeCities.cities}
                header={europeCities.header}
              />
            </div>
            <div className='col s12'>
              <Cities cities={asiaCities.cities} header={asiaCities.header} />
            </div>
            <div className='col s12'>
              <Cities cities={usCities.cities} header={usCities.header} />
            </div>
            <div className='col s12'>
              <Cities
                cities={exoticCities.cities}
                header={exoticCities.header}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
