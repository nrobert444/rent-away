import authReducer from './authReducer'
import { combineReducers } from 'redux'
import siteModal from './siteModal'

const rootReducer = combineReducers({
  auth: authReducer,
  siteModal: siteModal
})

export default rootReducer
