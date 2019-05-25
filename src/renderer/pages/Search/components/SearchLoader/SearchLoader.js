import React from 'react'
import { getSearchResultCount, getSearchResultLastFile } from 'selectors/search'
import { connect } from 'react-redux'
import Spinner from 'components/Spinner/Spinner'
import styles from './SearchLoader.scss'

const SearchLoader = ({
  searchResultCount,
  searchResultLastFile
}) => {
  return (
    <div className={styles.component}>
      <div className={styles.content}>
        <div className={styles.spinner}>
          <Spinner primary />
        </div>
        <div className={styles.resultCount}>
          Found {searchResultCount} unfiltered tunes
        </div>
        <div className={styles.latestTrackFile}>
          {searchResultLastFile}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    searchResultCount: getSearchResultCount(state),
    searchResultLastFile: getSearchResultLastFile(state)
  }
}

export default connect(
  mapStateToProps
)(SearchLoader)
