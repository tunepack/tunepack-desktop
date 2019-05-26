import React from 'react'
import { connect } from 'react-redux'
import {
  getIsSearching,
  getSearchQuery
} from 'selectors/search'
import SearchForm from '../components/SearchForm/SearchForm'
import { search } from 'actions/downloads'
import { setSearchQuery, reset } from 'actions/search'

const SearchResultsContainer = React.memo(({
  searchQuery,
  setSearchQuery,
  isSearching,
  search,
  reset
}) => {
  const handleChange = (searchQuery) => {
    setSearchQuery(searchQuery)
  }

  const handleClearClick = () => {
    reset()
  }

  const handleSubmit = () => {
    search(searchQuery)
  }

  return (
    <SearchForm
      onClearClick={handleClearClick}
      onChange={handleChange}
      searchQuery={searchQuery}
      isSearching={isSearching}
      onSubmit={handleSubmit}
    />
  )
})

const mapStateToProps = state => {
  return {
    isSearching: getIsSearching(state),
    searchQuery: getSearchQuery(state)
  }
}

const mapActionsToProps = {
  search,
  setSearchQuery,
  reset
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchResultsContainer)
