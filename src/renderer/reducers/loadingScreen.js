import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'
import { TOGGLE } from 'actions/loadingScreen'

const initialState = fromJS({
  isVisible: true
})

export default createReducer(initialState, {
  [TOGGLE]: (state, { payload: isVisible }) => {
    return state.set('isVisible', isVisible)
  }
})
