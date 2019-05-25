import { createReducer } from 'utils/redux'
import { List } from 'immutable'

import {
  DOWNLOAD
} from 'actions/downloads'

const initialState = List()

export default createReducer(initialState, {
  [DOWNLOAD]: (state, { payload: track }) => {
    return state.push(track)
  }
})
