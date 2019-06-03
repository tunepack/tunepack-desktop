import { all, takeLatest, put, call, select } from 'redux-saga/effects'
import actions, {
  constants,
  setSettings
} from 'actions/settings'

import { showLoading, showError } from 'actions/app'

import handlers from 'handlers'
import {
  getData as getSettings,
  getDownloadsDir,
  getIsAllSelectedForBurning
} from 'selectors/settings'

import {
  setUid,
  sendEvent
} from 'utils/analytics'

import {
  getDownloadsList
} from 'selectors/downloadsList'

export function * onInitialize () {
  yield put(actions.initializeRequest.start())

  try {
    const res = yield call(handlers.initialize)
    const { settings } = res

    yield put(showLoading(false))

    setUid(settings.uid)

    sendEvent({
      category: 'Settings',
      action: 'Initialize'
    })

    yield put(actions.initializeRequest.success({
      settings,
      hasNewRelease: res?.hasNewRelease,
      latestReleaseInfo: res?.latestReleaseInfo
    }))
  } catch (res) {
    yield put(showLoading(false))
    yield put(showError(res.error))
    yield put(actions.initializeRequest.error(res.error))
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

    sendEvent({
      category: 'Settings',
      action: 'SetSettings'
    })

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

  sendEvent({
    category: 'Settings',
    action: 'SelectDownloadsDir',
    label: downloadsDir,
    value: newDownloadsDir
  })

  yield put(setSettings({
    downloadsDir: newDownloadsDir
  }))
}

export function * onToggleSelectAll () {
  const downloadsList = yield select(getDownloadsList)
  const isAllSelectedForBurning = yield select(getIsAllSelectedForBurning)

  const selectedForBurning = isAllSelectedForBurning
    ? []
    : downloadsList.map(d => d.get('id')).toArray()

  yield put(actions.setSelectedForBurning(selectedForBurning))
}

export default function * watchSettings () {
  yield all([
    takeLatest(constants.INITIALIZE, onInitialize),
    takeLatest(constants.SET_SETTINGS, onSetSettings),
    takeLatest(constants.SELECT_DOWNLOAD_DIR, onSelectDownloadsDir),
    takeLatest(constants.TOGGLE_DOWNLOAD_SELECT_ALL, onToggleSelectAll)
  ])
}
