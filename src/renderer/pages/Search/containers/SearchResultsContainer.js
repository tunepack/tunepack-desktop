import React from 'react'
import { connect } from 'react-redux'
import {
  getSearchResults,
  getIsSearching,
  getHasSearched
} from 'selectors/search'
import ResultsList from 'components/ResultsList/ResultsList'
import SearchLoader from '../components/SearchLoader/SearchLoader'

const SearchResultsContainer = React.memo(({
  isSearching,
  searchResults,
  hasSearched
}) => {
  if (isSearching) {
    return (
      <SearchLoader />
    )
  }

  const emptyLabel = hasSearched ? (
    <span>
      Nothing found, if you expected results: try tweaking your search settings
    </span>
  ) : (
    <span>
      Waiting on you to search...
    </span>
  )

  return (
    <ResultsList
      emptyLabel={emptyLabel}
      items={searchResults}
    />
  )
})

const mapStateToProps = state => {
  return {
    isSearching: getIsSearching(state),
    searchResults: getSearchResults(state),
    hasSearched: getHasSearched(state)
  }
}

const mapActionsToProps = null

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchResultsContainer)
