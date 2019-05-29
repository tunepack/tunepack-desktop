import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'
import {
  INITIALIZE_REQUEST,
  ON_UPDATE_SETTINGS,
  SET_SETTINGS_REQUEST
} from 'actions/settings'
import { RESET_REQUEST } from '../actions/app'

const initialState = fromJS({
  isInitialized: false,
  isResetting: false,
  data: {},
  hasNewRelease: false,
  latestReleaseInfo: {}
})

export default createReducer(initialState, {
  [INITIALIZE_REQUEST.SUCCESS]: (state, { payload: {
    settings: data,
    hasNewRelease,
    latestReleaseInfo
  } }) => {
    return state.withMutations((state) => {
      return state
        .set('isInitialized', true)
        .set('data', fromJS(data))
        .set('hasNewRelease', hasNewRelease)
        .set('latestReleaseInfo', fromJS(latestReleaseInfo))
    })
  },
  [SET_SETTINGS_REQUEST.SUCCESS]: (state, { payload: data }) => {
    return state
      .set('data', fromJS(data))
  },
  [ON_UPDATE_SETTINGS]: (state, { payload: data }) => {
    return state
      .set('data', fromJS(data))
  },
  [RESET_REQUEST.START]: (state) => {
    return state.set('isResetting', true)
  }
})
