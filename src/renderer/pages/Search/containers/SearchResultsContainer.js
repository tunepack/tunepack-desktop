import React from 'react'
import { connect } from 'react-redux'
import { getSearchResults, getIsSearching } from 'selectors/search'
import ResultsList from 'components/ResultsList/ResultsList'
import { download } from 'actions/downloads'
import SearchLoader from '../components/SearchLoader/SearchLoader'

const SearchResultsContainer = React.memo(({
  isSearching,
  searchResults,
  download
}) => {
  const handleSearchResultClick = (track) => {
    download(track)
  }

  if (isSearching) {
    return (
      <SearchLoader />
    )
  }

  return (
    <ResultsList
      onDownloadClick={handleSearchResultClick}
      isSearching={isSearching}
      searchResults={searchResults}
    />
  )
})

const mapStateToProps = state => {
  return {
    isSearching: getIsSearching(state),
    searchResults: getSearchResults(state)
  }
}

const mapActionsToProps = {
  download
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchResultsContainer)
