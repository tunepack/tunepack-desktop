import { createReducer } from 'utils/redux'
import {
  fromJS,
  List
} from 'immutable'

import { INITIALIZE_REQUEST } from 'actions/settings'

import {
  DOWNLOAD
} from 'actions/downloads'

const initialState = List()

const getInitialStateFromSettings = settings => {
  const initialState = []

  const { downloadHistory } = settings

  for (const download of downloadHistory) {
    initialState.push(download.track)
  }

  return fromJS(initialState)
}

export default createReducer(initialState, {
  [INITIALIZE_REQUEST.SUCCESS]: (state, { payload: settings }) => {
    return getInitialStateFromSettings(settings)
  },
  [DOWNLOAD]: (state, { payload: track }) => {
    return state.push(track)
  }
})
