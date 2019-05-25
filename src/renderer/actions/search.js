import { createAction } from 'utils/redux'

export const SET_SEARCH_QUERY = '@search/SET_SEARCH_QUERY'

export const constants = {
  SET_SEARCH_QUERY
}

export const setSearchQuery = createAction(SET_SEARCH_QUERY)

export default {
  setSearchQuery
}
