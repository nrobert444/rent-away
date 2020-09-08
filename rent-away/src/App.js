import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './utilities/Navbar/Navbar'
import './App.css'
import SingleFullVenue from './pages/SingleFullVenue/SingleFullVenue'
import Modal from './utilities/Modal/Modal'
import CityVenues from './pages/CityVenues/CityVenues'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' component={Navbar} />
        <Route exact path='/' component={Home} />
        <Route exact path='/venue/:vid' component={SingleFullVenue} />
        <Route exact path='/city/:cityName' component={CityVenues} />
        <Route path='/' component={Modal} />
      </Router>
    )
  }
}

export default App
