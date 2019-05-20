import { fork, all } from 'redux-saga/effects'

import watchSettings from './settings'

import watchPageIntro from 'pages/Intro/sagas'

export default function * rootSaga () {
  yield all([
    fork(watchSettings),
    fork(watchPageIntro)
  ])
}
