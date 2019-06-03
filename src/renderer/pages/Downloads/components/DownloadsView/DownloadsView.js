import React from 'react'
import View from 'components/View/View'
import Title from 'components/Title/Title'
import { connect } from 'react-redux'
import ResultsList from 'components/ResultsList/ResultsList'
import { getSortedDownloadsList } from 'selectors/downloadsList'
import styles from './DownloadsView.scss'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import USBIcon from 'icons/USB.svg'

const DownloadsView = React.memo(({
  items
}) => {
  return (
    <View
      header={(
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Title>
              Downloads
            </Title>
          </div>
          <div className={styles.headerControls}>
            <Button
              iconBefore={(
                <div className={styles.btnBurnIcon}>
                  <Icon glyph={USBIcon} />
                </div>
              )}
              variant='primary'
              size='sm'
            >
              Burn to CD or USB
            </Button>
          </div>
        </div>
      )}
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
