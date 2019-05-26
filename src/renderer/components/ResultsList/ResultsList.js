import React from 'react'
import ResultListItem from '../ResultListItem/ResultListItem'
import styles from './ResultsList.scss'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { connect } from 'react-redux'
import { download } from 'actions/downloads'

const ResultsList = React.memo(({
  items,
  download,
  isDownloadsPage = false,
  emptyLabel
}) => {
  const handleDownloadClick = (track) => {
    download(track)
  }

  const renderRow = ({ index, style }) => {
    return (
      <ResultListItem
        isDownloadsPage={isDownloadsPage}
        index={index}
        style={style}
        track={items.get(index)}
        onDownloadClick={handleDownloadClick}
      />
    )
  }

  const itemsCount = items.count()

  if (itemsCount === 0) {
    return (
      <div className={styles.empty}>
        {emptyLabel}
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
              itemCount={itemsCount}
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

const mapStateToProps = null

const mapActionsToProps = {
  download
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ResultsList)
