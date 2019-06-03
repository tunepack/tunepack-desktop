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
import CloseIcon from 'icons/Close.svg'
import { setIsBurning } from 'actions/settings'
import { getIsBurning } from 'selectors/settings'

const DownloadsView = React.memo(({
  isBurning,
  setIsBurning,
  items
}) => {
  const handleBtnBurnClick = () => {
    setIsBurning(!isBurning)
  }

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
            {isBurning ? (
              <Button
                onClick={handleBtnBurnClick}
                iconBefore={(
                  <div className={styles.btnBurnIcon}>
                    <Icon glyph={CloseIcon} />
                  </div>
                )}
                variant='error'
                size='sm'
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleBtnBurnClick}
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
            )}
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
  items: getSortedDownloadsList(state),
  isBurning: getIsBurning(state)
})

const mapActionsToProps = {
  setIsBurning
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DownloadsView)
