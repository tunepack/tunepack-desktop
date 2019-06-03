import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'
import {
  INITIALIZE_REQUEST,
  ON_UPDATE_SETTINGS,
  SET_SETTINGS_REQUEST,
  SET_IS_BURNING
} from 'actions/settings'
import { RESET_REQUEST } from '../actions/app'

const initialState = fromJS({
  isInitialized: false,
  isResetting: false,
  data: {},
  hasNewRelease: false,
  latestReleaseInfo: {},
  isBurning: false
})

export default createReducer(initialState, {
  [INITIALIZE_REQUEST.SUCCESS]: (state, { payload }) => {
    return state.withMutations((state) => {
      const { settings: data } = payload

      return state
        .set('isInitialized', true)
        .set('data', fromJS(data))
        .set('hasNewRelease', payload?.hasNewRelease || null)
        .set('latestReleaseInfo', fromJS(payload?.latestReleaseInfo || {}))
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
  },
  [SET_IS_BURNING]: (state, { payload: isBurning }) => {
    return state.set('isBurning', isBurning)
  }
})
