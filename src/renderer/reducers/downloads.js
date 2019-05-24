import { createReducer } from 'utils/redux'
import { Map } from 'immutable'
import { DOWNLOAD, ON_DOWNLOAD_PROGRESS, ON_DOWNLOAD_ERROR, ON_DOWNLOAD_COMPLETE } from 'actions/downloads'

const initialState = Map({})

export default createReducer(initialState, {
  [DOWNLOAD]: (state, { payload: track }) => {
    return state.set(track.get('id'), Map({
      track,
      isDownloading: true,
      isDownloaded: false,
      progress: '0',
      error: null,
      downloadPath: null
    }))
  },
  [ON_DOWNLOAD_PROGRESS]: (state, { payload: { track, progress } }) => {
    const currentTrackState = state
      .get(track.id)
      .set('progress', progress)

    return state.set(track.id, currentTrackState)
  },
  [ON_DOWNLOAD_COMPLETE]: (state, { payload: { track, downloadPath } }) => {
    const currentTrackState = state
      .get(track.id)
      .set('downloadPath', downloadPath)
      .set('isDownloading', false)
      .set('isDownloaded', true)

    return state.set(track.id, currentTrackState)
  },
  [ON_DOWNLOAD_ERROR]: (state, { payload: { track, error } }) => {
    const currentTrackState = state
      .get(track.id)
      .set('error', error)
      .set('isDownloading', false)

    return state.set(track.id, currentTrackState)
  }
})
