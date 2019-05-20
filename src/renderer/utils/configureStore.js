import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import { createHashHistory } from 'history'
import createSagaMiddleware from 'redux-saga'

import {
  routerMiddleware
} from 'connected-react-router'

import createRootReducer from 'reducers'
import rootSaga from 'sagas'

export const history = createHashHistory()

const rootReducer = createRootReducer(history)

export const configureStore = (initialState = {}) => {
  const enhancers = []

  if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
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
