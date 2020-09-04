import React from 'react'
import City from './City'
import SlickSlider from '../Slider/Slider'

const Cities = props => {
  const cities = props.cities.map((city, index) => {
    return (
      <div key={index} className='col s3'>
        <City city={city} />
      </div>
    )
  })
  return (
    <div className='cities-wrapper'>
      <h1 className='home-search-box'>{props.header}</h1>
      <SlickSlider elements={cities} />
    </div>
  )
}
export default Cities
