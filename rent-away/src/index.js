import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import Spinner from './utilities/Spinner/Spinner'

// redux setup
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import rootReducer from './reducers/rootReducer'

// redux persist setup
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = applyMiddleware(reduxPromise)(createStore)(persistedReducer)
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={Spinner}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
