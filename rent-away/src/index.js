import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import rootReducer from './reducers/rootReducer'

const store = applyMiddleware(reduxPromise)(createStore)(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
