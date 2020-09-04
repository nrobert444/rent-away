import React, { Component } from 'react'
import './Home.css'
import SearchBox from './SearchBox'
import Spinner from '../../utilities/Spinner/Spinner'
import axios from 'axios'

class Home extends Component {
  state = {
    cities: []
  }

  async componentDidMount() {
    const recommendedCities = await axios.get(
      `${window.apiHost}/cities/recommended`
    )
    this.setState({ cities: recommendedCities.data })
  }
  render() {
    if (this.state.cities.lenght === 0) {
      return <Spinner />
    }

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='home col s12'>
            <div className='upper-fold'>
              <SearchBox />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
