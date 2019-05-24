import { fork, all } from 'redux-saga/effects'

import watchSettings from './settings'
import watchDownloads from './downloads'

export default function * rootSaga () {
  yield all([
    fork(watchSettings),
    fork(watchDownloads)
  ])
}
