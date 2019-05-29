import { createReducer } from 'utils/redux'
import {
  fromJS,
  List
} from 'immutable'

import {
  INITIALIZE_REQUEST,
  ON_UPDATE_SETTINGS
} from 'actions/settings'

import {
  DOWNLOAD
} from 'actions/downloads'

import moment from 'moment'

const initialState = List()

const getInitialStateFromSettings = settings => {
  const initialState = []

  const { downloadHistory } = settings

  for (const download of downloadHistory) {
    const createdAt = moment.utc(download.createdAt).unix()

    initialState.push({
      createdAt,
      ...download.track
    })
  }

  return fromJS(initialState)
}

export default createReducer(initialState, {
  [INITIALIZE_REQUEST.SUCCESS]: (state, { payload: { settings } }) => {
    return getInitialStateFromSettings(settings)
  },
  [DOWNLOAD]: (state, { payload: track }) => {
    const createdAt = moment.utc().unix()
    return state.push(track.set('createdAt', createdAt))
  },
  [ON_UPDATE_SETTINGS]: (state, { payload: settings }) => {
    return getInitialStateFromSettings(settings)
  }
})
