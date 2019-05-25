import React from 'react'
import { connect } from 'react-redux'
import {
  getIsSearching,
  getSearchQuery
} from 'selectors/search'
import SearchForm from '../components/SearchForm/SearchForm'
import { search } from 'actions/downloads'
import { setSearchQuery } from 'actions/search'

const SearchResultsContainer = React.memo(({
  searchQuery,
  setSearchQuery,
  isSearching,
  search
}) => {
  const onChange = (searchQuery) => {
    setSearchQuery(searchQuery)
  }

  const handleSubmit = () => {
    search(searchQuery)
  }

  return (
    <SearchForm
      onChange={onChange}
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
  setSearchQuery
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchResultsContainer)
