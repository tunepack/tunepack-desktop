import { fork, all } from 'redux-saga/effects'

import watchApp from './app'
import watchSettings from './settings'
import watchDownloads from './downloads'

export default function * rootSaga () {
  yield all([
    fork(watchApp),
    fork(watchSettings),
    fork(watchDownloads)
  ])
}
