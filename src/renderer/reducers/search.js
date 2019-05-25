import { createReducer } from 'utils/redux'
import { fromJS } from 'immutable'
import { SEARCH_REQUEST, ON_SEARCH_FOUND } from 'actions/downloads'
import { SET_SEARCH_QUERY } from 'actions/search'

let initialSearchResults = []

if (process.env.NODE_ENV === 'development') {
  initialSearchResults = require('../fixtures/search-justice-genesis').default
}

const initialState = fromJS({
  searchResults: initialSearchResults,
  searchQuery: '',
  isSearching: false,
  error: null,
  searchResultCount: 0,
  searchResultLastFile: ''
})

export default createReducer(initialState, {
  [SEARCH_REQUEST.START]: (state) => {
    return state.withMutations((state) => {
      return state
        .set('isSearching', true)
        .set('error', null)
        .set('searchResultCount', 0)
        .set('searchResultLastFile', '')
    })
  },
  [SEARCH_REQUEST.SUCCESS]: (state, { payload: searchResults }) => {
    return state.withMutations((state) => {
      return state
        .set('searchResults', fromJS(searchResults))
        .set('isSearching', false)
    })
  },
  [SEARCH_REQUEST.ERROR]: (state) => {
    return state.withMutations((state) => {
      return state
        .set('isSearching', false)
        .set('error', true)
    })
  },
  [SET_SEARCH_QUERY]: (state, { payload: searchQuery }) => {
    return state
      .set('searchQuery', searchQuery)
  },
  [ON_SEARCH_FOUND]: (state, { payload: { track, resultCount } }) => {
    return state.withMutations((state) => {
      return state
        .set('searchResultCount', resultCount)
        .set('searchResultLastFile', track.file)
    })
  }
})
