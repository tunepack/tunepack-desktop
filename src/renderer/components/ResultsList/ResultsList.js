import React from 'react'
import SearchResult from '../ResultListItem/ResultListItem'
import styles from './ResultsList.scss'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

const ResultsList = React.memo(({
  searchResults,
  onDownloadClick
}) => {
  const renderRow = ({ index, style }) => {
    return (
      <SearchResult
        index={index}
        style={style}
        track={searchResults.get(index)}
        onDownloadClick={onDownloadClick}
      />
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
              className={styles.list}
              height={height}
              width={width}
              itemCount={searchResultsCount}
              itemSize={100}
            >
              {renderRow}
            </List>
          )
        }}
      </AutoSizer>
    </div>
  )
})

export default ResultsList
