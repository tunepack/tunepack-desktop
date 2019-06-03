import React, { useEffect, useCallback } from 'react'
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
import { toggleIsBurning } from 'actions/settings'
import {
  getIsBurning,
  getSelectedForBurning
} from 'selectors/settings'

const KEY_B = 66

const DownloadsView = React.memo(({
  isBurning,
  toggleIsBurning,
  items,
  selectedForBurning
}) => {
  const handleKeyUp = useCallback(event => {
    if (event.keyCode === KEY_B) {
      toggleIsBurning(!isBurning)
    }
  }, [isBurning])

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp])

  const handleBtnBurnClick = () => {
    toggleIsBurning()
  }

  const handleBtnCancelClick = () => {
    toggleIsBurning(false)
  }

  const hasSelectedOneForBurning = selectedForBurning.count() > 0

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
              <>
                <Button
                  onClick={handleBtnCancelClick}
                  iconBefore={(
                    <div className={styles.btnBurnIcon}>
                      <Icon glyph={CloseIcon} />
                    </div>
                  )}
                  variant='error'
                  size='xsm'
                >
                  Cancel
                </Button>
                {hasSelectedOneForBurning && (
                  <Button
                    onClick={handleBtnBurnClick}
                    iconBefore={(
                      <div className={styles.btnBurnIcon}>
                        <Icon glyph={USBIcon} />
                      </div>
                    )}
                    variant='primary'
                    size='xsm'
                  >
                    Burn to CD or USB
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={handleBtnBurnClick}
                iconBefore={(
                  <div className={styles.btnBurnIcon}>
                    <Icon glyph={USBIcon} />
                  </div>
                )}
                size='xsm'
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
  isBurning: getIsBurning(state),
  selectedForBurning: getSelectedForBurning(state)
})

const mapActionsToProps = {
  toggleIsBurning
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DownloadsView)
