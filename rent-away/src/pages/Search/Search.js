import React, { useState, useEffect } from 'react'
import './Search.css'
import '../Home/Home.css'
import Cities from '../../utilities/City/Cities'
import Venues from '../../utilities/Venues/Venues'
import Activities from '../../utilities/Activity/Activities'
import axios from 'axios'
import Spinner from '../../utilities/Spinner/Spinner'

const Search = props => {
  const [activities, setActivities] = useState([])
  const [cities, setCities] = useState([])
  const [venues, setVenues] = useState([])
  const [apiResponse, setApiResponse] = useState(false)

  useEffect(() => {
    const fetchSearchData = async () => {
      const searchTerm = props.match.params.searchTerm
      const url = `${window.apiHost}/search/${searchTerm}`
      const resp = await axios.get(url)
      setActivities(resp.data.activities)
      setCities(resp.data.cities)
      setVenues(resp.data.venues)
      setApiResponse(true)
    }
    fetchSearchData()
  }, [])

  if (!apiResponse) {
    return <Spinner />
  }
  return (
    <div className='container-fluid lower-fold'>
      <div className='row'>
        <div className='col s12'>
          <Cities cities={cities} header='Cities Matching Your Search' />
        </div>
        <div className='col s12'>
          <Activities
            activities={activities}
            header='Activies Matching Your Search'
          />
        </div>
        <div className='col s12'>
          <Venues venues={venues} header='Venues matching your search' />
        </div>
      </div>
    </div>
  )
}
export default Search
