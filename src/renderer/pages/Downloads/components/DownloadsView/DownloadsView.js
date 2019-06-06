import React from 'react'
import View from 'components/View/View'
import { connect } from 'react-redux'
import ResultsList from 'components/ResultsList/ResultsList'
import { getSortedDownloadsList } from 'selectors/downloadsList'
import DownloadsHeader from '../DownloadsHeader/DownloadsHeader'

const DownloadsView = React.memo(({
  items
}) => {
  return (
    <View
      header={<DownloadsHeader hasItems={items.count() > 0} />}
    >
      <ResultsList
        isDownloadsPage
        items={items}
        emptyLabel={(
          <span>
            Nothing downloaded, yet.
          </span>
        )}
      />
    </View>
  )
})

const mapStateToProps = state => ({
  items: getSortedDownloadsList(state)
})

export default connect(
  mapStateToProps
)(DownloadsView)
