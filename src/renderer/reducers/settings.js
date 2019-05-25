import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'
import { INITIALIZE_REQUEST, SET_SETTINGS_REQUEST } from 'actions/settings'

const initialState = fromJS({
  isInitialized: false,
  data: {}
})

export default createReducer(initialState, {
  [INITIALIZE_REQUEST.SUCCESS]: (state, { payload: data }) => {
    return state.withMutations((state) => {
      return state
        .set('isInitialized', true)
        .set('data', fromJS(data))
    })
  },
  [SET_SETTINGS_REQUEST.SUCCESS]: (state, { payload: data }) => {
    return state
      .set('data', fromJS(data))
  }
})
