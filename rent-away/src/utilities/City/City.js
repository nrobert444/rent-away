import React, { Component } from 'react'
import './City.css'

class City extends Component {
  render() {
    console.log(this.props.city)
    const { cityName, price, image } = this.props.city
    return (
      <div className='city col s12'>
        <div className='image'>
          <img src={image} alt='city' />
        </div>
        <div className='city-name'>{cityName}</div>
        <div className='price'>${price}/night average</div>
      </div>
    )
  }
}
export default City
