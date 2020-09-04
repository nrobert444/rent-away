import React, { Component } from 'react'
import './Spinner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

class Spinner extends Component {
  render() {
    return (
      <div className='spinner-wrapper'>
        <FontAwesomeIcon icon={faSpinner} size='6x' spin />
      </div>
    )
  }
}
export default Spinner
