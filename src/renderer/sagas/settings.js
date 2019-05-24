import { all, takeLatest, put, call, select } from 'redux-saga/effects'
import actions, {
  constants,
  setSettings
} from 'actions/settings'
import { toggle as toggleLoadingScreen } from 'actions/loadingScreen'
import handlers from 'handlers'
import {
  getData as getSettings,
  getDownloadsDir
} from 'selectors/settings'

export function * onInitialize () {
  yield put(actions.initializeRequest.start())

  try {
    const { settings } = yield call(handlers.initialize)
    yield put(actions.initializeRequest.success(settings))
    yield put(toggleLoadingScreen(false))
  } catch (error) {
    yield put(actions.initializeRequest.error(error))
  }
}

export function * onSetSettings ({ payload: newSettings }) {
  yield put(actions.setSettingsRequest.start())

  try {
    const currentSettings = yield select(getSettings)

    const updatedSettings = {
      ...currentSettings.toJS(),
      ...newSettings
    }

    const { settings } = yield call(handlers.setSettings, updatedSettings)
    yield put(actions.setSettingsRequest.success(settings))
  } catch (error) {
    yield put(actions.setSettingsRequest.error(error))
  }
}

export function * onSelectDownloadsDir () {
  const downloadsDir = yield select(getDownloadsDir)

  const { result: newDownloadsDir } = yield call(handlers.selectDir, {
    defaultPath: downloadsDir
  })

  yield put(setSettings({
    downloadsDir: newDownloadsDir
  }))
}

export default function * watchSettings () {
  yield all([
    takeLatest(constants.INITIALIZE, onInitialize),
    takeLatest(constants.SET_SETTINGS, onSetSettings),
    takeLatest(constants.SELECT_DOWNLOAD_DIR, onSelectDownloadsDir)
  ])
}
