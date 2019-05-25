import { all, takeLatest, put, call } from 'redux-saga/effects'
import actions, { constants } from 'actions/downloads'
import handlers from 'handlers'

export function * onSearch ({ payload: query }) {
  yield put(actions.searchRequest.start())

  try {
    const { results } = yield call(handlers.search, query)

    yield put(actions.searchRequest.success(results))
  } catch (res) {
    yield put(actions.searchRequest.error(res.error))
  }
}

export function * onSearchStop ({ payload: query }) {
  yield put(actions.searchStopRequest.start())

  try {
    yield call(handlers.searchStop, query)
    yield put(actions.searchStopRequest.success())
  } catch (res) {
    yield put(actions.searchStopRequest.error(res.error))
  }
}

export function * onDownload ({ payload: track }) {
  yield put(actions.downloadRequest.start())

  try {
    const { settings } = yield call(handlers.download, track.toObject())
    yield put(actions.downloadRequest.success(settings))
  } catch (res) {
    yield put(actions.downloadRequest.error(res.error))
  }
}

export default function * watchSettings () {
  yield all([
    takeLatest(constants.SEARCH, onSearch),
    takeLatest(constants.SEARCH_STOP, onSearchStop),
    takeLatest(constants.DOWNLOAD, onDownload)
  ])
}
