import React from 'react'
import View from 'components/View/View'
import SearchResultsContainer from '../../containers/SearchResultsContainer'
import SearchFormContainer from '../../containers/SearchFormContainer'

export const SearchView = React.memo(() => {
  return (
    <View
      header={(
        <SearchFormContainer />
      )}>
      <SearchResultsContainer />
    </View>
  )
})

export default SearchView
