import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'
import { SEARCH_REQUEST } from 'actions/downloads'

let initialSearchResults = []

if (process.env.NODE_ENV === 'development') {
  initialSearchResults = require('../fixtures/search-justice-genesis').default
}

const initialState = fromJS({
  searchResults: initialSearchResults,
  isSearching: false,
  error: null
})

export default createReducer(initialState, {
  [SEARCH_REQUEST.START]: (state) => {
    return state
      .set('isSearching', true)
      .set('error', null)
  },
  [SEARCH_REQUEST.SUCCESS]: (state, { payload: searchResults }) => {
    return state
      .set('searchResults', fromJS(searchResults))
      .set('isSearching', false)
  },
  [SEARCH_REQUEST.ERROR]: (state) => {
    return state
      .set('isSearching', false)
      .set('error', true)
  }
})
