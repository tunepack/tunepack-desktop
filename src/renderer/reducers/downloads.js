import { createReducer } from 'utils/redux'
import { Map, fromJS } from 'immutable'

import {
  INITIALIZE_REQUEST,
  ON_UPDATE_SETTINGS
} from '../actions/settings'

import {
  DOWNLOAD,
  ON_DOWNLOAD_PROGRESS,
  ON_DOWNLOAD_ERROR,
  ON_DOWNLOAD_COMPLETE
} from 'actions/downloads'

const initialState = Map({
  // This will be a hash map
})

const getInitialStateFromSettings = settings => {
  const initialState = {}

  const { downloadHistory } = settings

  for (const download of downloadHistory) {
    initialState[download.track.id] = download
  }

  return fromJS(initialState)
}

export default createReducer(initialState, {
  [INITIALIZE_REQUEST.SUCCESS]: (state, { payload: settings }) => {
    return getInitialStateFromSettings(settings)
  },
  [ON_UPDATE_SETTINGS]: (state, { payload: settings }) => {
    return getInitialStateFromSettings(settings)
  },
  [DOWNLOAD]: (state, { payload: track }) => {
    return state.set(String(track.get('id')), Map({
      track,
      isDownloading: true,
      isDownloaded: false,
      progress: '0',
      avgSpeed: null,
      error: null,
      downloadPath: null
    }))
  },
  [ON_DOWNLOAD_PROGRESS]: (state, { payload: { track, progress, avgSpeed } }) => {
    return state.withMutations((state) => {
      const currentTrackState = state
        .get(String(track.id))
        .set('progress', progress)
        .set('avgSpeed', avgSpeed)

      return state.set(String(track.id), currentTrackState)
    })
  },
  [ON_DOWNLOAD_COMPLETE]: (state, { payload: { track, downloadPath } }) => {
    return state.withMutations((state) => {
      const currentTrackState = state
        .get(String(track.id))
        .set('downloadPath', downloadPath)
        .set('isDownloading', false)
        .set('isDownloaded', true)

      return state.set(String(track.id), currentTrackState)
    })
  },
  [ON_DOWNLOAD_ERROR]: (state, { payload: { track, error } }) => {
    return state.withMutations((state) => {
      const currentTrackState = state
        .get(String(track.id))
        .set('error', error)
        .set('isDownloading', false)

      return state.set(String(track.id), currentTrackState)
    })
  }
})
