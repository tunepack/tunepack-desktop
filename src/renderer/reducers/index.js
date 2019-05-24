import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loadingScreen from './loadingScreen'
import settings from './settings'
import downloads from './downloads'
import search from './search'

export default function createRootReducer (history) {
  return combineReducers({
    loadingScreen,
    settings,
    downloads,
    search,
    router: connectRouter(history)
  })
}
