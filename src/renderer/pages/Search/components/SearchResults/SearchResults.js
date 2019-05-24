import React from 'react'
import Spinner from 'components/Spinner/Spinner'
import SearchResult from '../SearchResult/SearchResult'
import styles from './SearchResults.scss'
import { FixedSizeList as List } from 'react-window'

export default class SearchResults extends React.Component {
  render () {
    const {
      isSearching,
      searchResults
    } = this.props

    if (isSearching) {
      return (
        <div className={styles.loader}>
          <Spinner primary />
        </div>
      )
    }

    const searchResultsCount = searchResults.count()

    if (searchResultsCount === 0) {
      return (
        <div className={styles.empty}>
          No results.
        </div>
      )
    }

    const Row = ({ index, style }) => {
      const { searchResults, onDownloadClick } = this.props
      const track = searchResults.get(index)

      return (
        <SearchResult
          index={index}
          style={style}
          track={track}
          onDownloadClick={onDownloadClick} />
      )
    }

    return (
      <div className={styles.results}>
        <List
          height={538}
          itemCount={searchResultsCount}
          itemSize={100}
          width={'100%'}>
          {Row}
        </List>
      </div>
    )
  }
}
