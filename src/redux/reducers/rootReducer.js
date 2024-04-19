// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import table from './table'
import routes from './routes'
import config from './config'
import certificate from './certificate'

const rootReducer = combineReducers({
  config,
  auth,
  navbar,
  layout,
  table,
  routes,
  certificate
})

export default rootReducer
