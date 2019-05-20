import { all, takeLatest, put, call, select } from 'redux-saga/effects'
import { constants } from '../actions'
import handlers from 'handlers'
import { getDownloadsDir } from 'selectors/settings'
import { setSettings } from '../../../actions/settings'
import { push } from 'connected-react-router'
import * as Routes from 'constants/Routes'

export function * onSelectDownloadsDir () {
  const downloadsDir = yield select(getDownloadsDir)

  const { result: newDownloadsDir } = yield call(handlers.selectDir, {
    defaultPath: downloadsDir
  })

  yield put(setSettings({
    downloadsDir: newDownloadsDir
  }))
}

export function * onSubmit () {
  yield put(setSettings({
    isNew: false
  }))

  yield put(push(Routes.SEARCH))
}

export default function * watchPageIntro () {
  yield all([
    takeLatest(constants.SELECT_DOWNLOADS_DIR, onSelectDownloadsDir),
    takeLatest(constants.SUBMIT, onSubmit)
  ])
}
