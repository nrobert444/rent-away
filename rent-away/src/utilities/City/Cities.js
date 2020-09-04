import React from 'react'
import City from './City'
import SlickSlider from '../Slider/Slider'

const Cities = props => {
  const cities = props.cities.map((city, index) => {
    return (
      <div className='col s3'>
        <City city={city} key={index} />
      </div>
    )
  })
  return <SlickSlider elements={cities} />
}
export default Cities
