import { fork, all } from 'redux-saga/effects'

import watchSettings from './settings'

export default function * rootSaga () {
  yield all([
    fork(watchSettings)
  ])
}
