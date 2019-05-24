import React from 'react'
import SearchForm from '../SearchForm/SearchForm'
import View from 'components/View/View'
import { connect } from 'react-redux'
import { search, download } from 'actions/downloads'
import { getSearchResults, getIsSearching } from 'selectors/search'
import SearchResults from '../SearchResults/SearchResults'

const SearchView = React.memo(({
  search,
  isSearching,
  searchResults,
  download,
  downloads
}) => {
  const handleSearchSubmit = ({ query }) => {
    search(query)
  }

  const handleSearchResultClick = (track) => {
    download(track)
  }

  return (
    <View
      header={(
        <SearchForm onSubmit={handleSearchSubmit} />
      )}>
      <SearchResults
        downloads={downloads}
        onDownloadClick={handleSearchResultClick}
        isSearching={isSearching}
        searchResults={searchResults} />
    </View>
  )
})

const mapStateToProps = state => {
  return {
    isSearching: getIsSearching(state),
    searchResults: getSearchResults(state)
  }
}

const mapActionsToProps = {
  search,
  download
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchView)
