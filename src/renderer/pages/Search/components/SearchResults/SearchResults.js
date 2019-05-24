import React from 'react'
import Spinner from 'components/Spinner/Spinner'
import SearchResult from '../SearchResult/SearchResult'
import styles from './SearchResults.scss'

const SearchResults = React.memo(({
  isSearching,
  searchResults,
  onDownloadClick
}) => {
  if (isSearching) {
    return (
      <div className={styles.loader}>
        <Spinner primary />
      </div>
    )
  }

  if (searchResults.count() === 0) {
    return (
      <div className={styles.empty}>
        No results.
      </div>
    )
  }

  return (
    <div className={styles.results}>
      {searchResults.map((track) => {
        return (
          <SearchResult
            key={track.get('id')}
            track={track}
            onDownloadClick={onDownloadClick} />
        )
      })}
    </div>
  )
})

export default SearchResults
