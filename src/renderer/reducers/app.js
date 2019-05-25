import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'
import { SHOW_LOADING, SHOW_ERROR } from 'actions/app'

const initialState = fromJS({
  isLoading: true,
  error: null
})

export default createReducer(initialState, {
  [SHOW_LOADING]: (state, { payload: isVisible }) => {
    return state.set('isLoading', isVisible)
  },
  [SHOW_ERROR]: (state, { payload: error }) => {
    return state.set('error', error)
  }
})
