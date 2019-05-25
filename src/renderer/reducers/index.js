import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import app from './app'
import settings from './settings'
import downloads from './downloads'
import downloadsList from './downloadsList'
import search from './search'

export default function createRootReducer (history) {
  return combineReducers({
    app,
    settings,
    downloads,
    search,
    downloadsList,
    router: connectRouter(history)
  })
}
