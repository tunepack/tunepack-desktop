export const getSearchResults = state => {
  return state.search.get('searchResults')
}

export const getIsSearching = state => {
  return state.search.get('isSearching')
}

export const getSearchQuery = state => {
  return state.search.get('searchQuery')
}

export const getSearchResultCount = state => {
  return state.search.get('searchResultCount')
}

export const getSearchResultLastFile = state => {
  return state.search.get('searchResultLastFile')
}

export const getHasSearched = state => {
  return state.search.get('hasSearched')
}
