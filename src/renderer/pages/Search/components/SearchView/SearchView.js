import React from 'react'
import styles from './SearchView.scss'
import SearchForm from '../SearchForm/SearchForm'
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
    <>
      <div className={styles.header}>
        <SearchForm onSubmit={handleSearchSubmit} />
      </div>
      <SearchResults
        downloads={downloads}
        onDownloadClick={handleSearchResultClick}
        isSearching={isSearching}
        searchResults={searchResults} />
    </>
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
