import React from 'react'
import Spinner from 'components/Spinner/Spinner'
import SearchResult from '../SearchResult/SearchResult'
import styles from './SearchResults.scss'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

export default class SearchResults extends React.Component {
  renderRow = ({ index, style }) => {
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

    return (
      <div className={styles.results}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <List
                height={height}
                width={width}
                itemCount={searchResultsCount}
                itemSize={100}>
                {this.renderRow}
              </List>
            )
          }}
        </AutoSizer>
      </div>
    )
  }
}
