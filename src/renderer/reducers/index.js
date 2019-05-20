import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loadingScreen from './loadingScreen'
import settings from './settings'

export default function createRootReducer (history) {
  return combineReducers({
    loadingScreen,
    settings,
    router: connectRouter(history)
  })
}
