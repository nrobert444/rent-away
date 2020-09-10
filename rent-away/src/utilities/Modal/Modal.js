import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Modal.css'
import openModal from '../../actions/openModal'

const Modal = props => {
  const dispatch = useDispatch()
  const siteModal = useSelector(state => state.siteModal)

  const closeModal = () => {
    dispatch(openModal('closed', ''))
  }

  let modalInlineStyle
  if (siteModal.openClose === 'open') {
    modalInlineStyle = { display: 'block' }
  } else {
    modalInlineStyle = { display: 'none' }
  }
  return (
    <div className='site-modal' style={modalInlineStyle}>
      <div className='modal-content'>
        <div className='col right'>
          <span onClick={closeModal} className='close'>
            &times;
          </span>
        </div>
        <div>{siteModal.content}</div>
      </div>
    </div>
  )
}

export default Modal
