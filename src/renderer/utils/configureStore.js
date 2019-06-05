import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import { createHashHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import * as Channel from '../../shared/constants/Channel'

import {
  routerMiddleware
} from 'connected-react-router'

import createIpc from 'redux-electron-ipc'
import createRootReducer from 'reducers'
import rootSaga from 'sagas'
import downloadsActions from 'actions/downloads'
import settingsActions from 'actions/settings'

export const history = createHashHistory()

const rootReducer = createRootReducer(history)

export const configureStore = (initialState = {}) => {
  const enhancers = []

  if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const sagaMiddleware = createSagaMiddleware()

  const ipcMiddleware = createIpc({
    [Channel.DOWNLOAD_PROGRESS]: (event, args) => {
      return downloadsActions.onDownloadProgress(args)
    },
    [Channel.DOWNLOAD_COMPLETE]: (event, args) => {
      return downloadsActions.onDownloadComplete(args)
    },
    [Channel.DOWNLOAD_ERROR]: (event, args) => {
      return downloadsActions.onDownloadError(args)
    },
    [Channel.SEARCH_FOUND]: (event, args) => {
      return downloadsActions.onSearchFound(args)
    },
    [Channel.UPDATE_SETTINGS]: (event, args) => {
      return settingsActions.onUpdateSettings(args)
    },
    [Channel.BURN_PROGRESS]: (event, args) => {
      return settingsActions.onBurnProgress(args)
    }
  })

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        ipcMiddleware
      ),
      ...enhancers
    )
  )

  sagaMiddleware.run(rootSaga)

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('reducers', () => {
        store.replaceReducer(require('reducers').default)
      })

      module.hot.accept('sagas', () => {
        sagaMiddleware.run(require('sagas').default)
      })
    }
  }

  return store
}
