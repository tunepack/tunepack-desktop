import { createReducer } from 'utils/redux'
import { fromJS, List } from 'immutable'
import {
  INITIALIZE_REQUEST,
  ON_UPDATE_SETTINGS,
  SET_SETTINGS_REQUEST,
  TOGGLE_IS_BURNING,
  TOGGLE_DOWNLOAD_SELECT_BURNING
} from 'actions/settings'
import { RESET_REQUEST } from '../actions/app'

const initialState = fromJS({
  isInitialized: false,
  isResetting: false,
  data: {},
  hasNewRelease: false,
  latestReleaseInfo: {},
  isBurning: false,
  selectedForBurning: []
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
        .set('isBurning', false)
        .set('selectedForBurning', List())
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
  [TOGGLE_IS_BURNING]: (state) => {
    return state.withMutations((state) => {
      const currentIsBurning = state.get('isBurning')

      if (currentIsBurning) {
        return state
          .set('isBurning', false)
          .set('selectedForBurning', List())
      }

      return state
        .set('isBurning', true)
    })
  },
  [TOGGLE_DOWNLOAD_SELECT_BURNING]: (state, { payload: trackId }) => {
    const selectedForBurning = state.get('selectedForBurning')

    if (selectedForBurning.includes(trackId)) {
      return state.set('selectedForBurning', selectedForBurning.filter(i => i !== trackId))
    }

    return state.set('selectedForBurning', selectedForBurning.push(trackId))
  }
})
