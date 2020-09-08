import React from 'react'
import Venue from './Venue'
import './Venue.css'

const Venues = props => {
  const venues = props.venues.map((venue, index) => {
    return (
      <div key={index} className='col m6 l3'>
        <Venue venue={venue} key={index} />
      </div>
    )
  })
  return (
    <div className='venues'>
      <h1 className='main-header-text'>{props.header}</h1>
      {venues}
    </div>
  )
}

export default Venues
