// ** Redux, Thunk & Root Reducer Imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import rootReducer from '../reducers/rootReducer'
import mySaga from '../sagas'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Import the transformer creator
// const expireReducer = require('redux-persist-expire')
import expireReducer from 'redux-persist-expire'

// Logger with default options
import logger from 'redux-logger'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// ** init middleware
const middleware = [sagaMiddleware, thunk, logger, createDebounce()]


// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
    key: 'unibwJuly2023',
    storage,
    whitelist: ['auth', 'config'] // only navigation will be persisted
}

// Create persisted reducers using redux-persist
const persistedReducers = persistReducer({
    key: 'aftsJune2022',
    storage,
    whitelist: ['auth', 'config'],
    transforms: [
       // Create a transformer by passing the reducer key and configuration. Values
       // shown below are the available configurations with default values
       expireReducer('auth', {
         // (Optional) Key to be used for the time relative to which store is to be expired
         persistedAtKey: 'loadedAt',
         // (Required) Seconds after which store will be expired
         expireSeconds: 36000,
         // (Optional) State to be used for resetting e.g. provide initial reducer state
         expiredState: {},
         // (Optional) Use it if you don't want to manually set the time in the reducer i.e. at `persistedAtKey` 
         // and want the store to  be automatically expired if the record is not updated in the `expireSeconds` time
         autoExpire: false
       })
       // You can add more `expireReducer` calls here for different reducers
       // that you may want to expire
    ]
  },
  rootReducer
)


// ** Create store
const store = createStore(persistedReducers, {}, composeEnhancers(applyMiddleware(...middleware)))

const  persistor = persistStore(store)

// then run the saga
sagaMiddleware.run(mySaga)

export { store, persistor }
