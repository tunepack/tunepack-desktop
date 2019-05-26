import { createAction } from 'utils/redux'

export const SET_SEARCH_QUERY = '@search/SET_SEARCH_QUERY'
export const RESET = '@search/RESET'

export const constants = {
  SET_SEARCH_QUERY,
  RESET
}

export const setSearchQuery = createAction(SET_SEARCH_QUERY)
export const reset = createAction(RESET)

export default {
  setSearchQuery,
  reset
}
