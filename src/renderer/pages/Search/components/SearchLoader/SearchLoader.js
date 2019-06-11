import React from 'react'
import {
  getSearchQuery,
  getSearchResultCount,
  getSearchResultLastFile
} from 'selectors/search'
import { connect } from 'react-redux'
import Spinner from 'components/Spinner/Spinner'
import styles from './SearchLoader.scss'
import { searchStop } from 'actions/downloads'
import Button from 'components/Button/Button'

const SearchLoader = ({
  searchResultCount,
  searchResultLastFile,
  searchStop,
  searchQuery
}) => {
  const handleShowResultsClick = () => {
    searchStop(searchQuery)
  }

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
        <div className={styles.btnStop}>
          <Button
            onClick={handleShowResultsClick}
            size='sm'
          >
            Show results
          </Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    searchResultCount: getSearchResultCount(state),
    searchResultLastFile: getSearchResultLastFile(state),
    searchQuery: getSearchQuery(state)
  }
}

const mapActionsToProps = {
  searchStop
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchLoader)
