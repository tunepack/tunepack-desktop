import React from 'react'
import { connect } from 'react-redux'
import { getSearchResults, getIsSearching } from 'selectors/search'
import SearchResults from '../components/SearchResults/SearchResults'
import { download } from 'actions/downloads'

const SearchResultsContainer = React.memo(({
  isSearching,
  searchResults,
  download
}) => {
  const handleSearchResultClick = (track) => {
    download(track)
  }

  return (
    <SearchResults
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
