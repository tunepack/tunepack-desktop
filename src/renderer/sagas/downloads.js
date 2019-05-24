import { all, takeLatest, put, call } from 'redux-saga/effects'
import actions, { constants } from 'actions/downloads'
import handlers from 'handlers'

export function * onSearch ({ payload: query }) {
  yield put(actions.searchRequest.start())

  try {
    const { results } = yield call(handlers.search, query)

    yield put(actions.searchRequest.success(results))
  } catch (error) {
    yield put(actions.searchRequest.error(error))
  }
}

export function * onDownload ({ payload: track }) {
  yield put(actions.downloadRequest.start())

  try {
    const { settings } = yield call(handlers.download, track.toJS())
    yield put(actions.downloadRequest.success(settings))
  } catch (error) {
    yield put(actions.downloadRequest.error(error))
  }
}

export default function * watchSettings () {
  yield all([
    takeLatest(constants.SEARCH, onSearch),
    takeLatest(constants.DOWNLOAD, onDownload)
  ])
}
