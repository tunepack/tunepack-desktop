import React from 'react'
import { connect } from 'react-redux'
import { getSearchResults, getIsSearching } from 'selectors/search'
import ResultsList from 'components/ResultsList/ResultsList'
import SearchLoader from '../components/SearchLoader/SearchLoader'

const SearchResultsContainer = React.memo(({
  isSearching,
  searchResults
}) => {
  if (isSearching) {
    return (
      <SearchLoader />
    )
  }

  return (
    <ResultsList items={searchResults} />
  )
})

const mapStateToProps = state => {
  return {
    isSearching: getIsSearching(state),
    searchResults: getSearchResults(state)
  }
}

const mapActionsToProps = null

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchResultsContainer)
