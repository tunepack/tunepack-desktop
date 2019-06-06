import React, { useEffect, useCallback } from 'react'
import styles from './DownloadsHeader.scss'
import Title from 'components/Title/Title'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import CloseIcon from 'icons/Close.svg'
import USBIcon from 'icons/USB.svg'
import {
  getIsBurning,
  getIsAllSelectedForBurning
} from 'selectors/settings'
import { toggleIsBurning, toggleDownloadSelectAll } from 'actions/settings'
import { connect } from 'react-redux'

const KEY_B = 66

const DownloadsHeader = ({
  isBurning,
  toggleIsBurning,
  toggleDownloadSelectAll,
  isAllSelectedForBurning,
  hasItems
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

  useEffect(() => {
    return () => {
      toggleIsBurning(false)
    }
  }, [])

  const handleBtnBurnClick = () => {
    toggleIsBurning()
  }

  const handleBtnCancelClick = () => {
    toggleIsBurning(false)
  }

  const handleSelectAllClick = () => {
    toggleDownloadSelectAll()
  }

  return (
    <div className={styles.component}>
      <Title>
        Downloads
      </Title>
      <div className={styles.controls}>
        {isBurning ? (
          <>
            <Button
              onClick={handleSelectAllClick}
              variant='minimal'
              size='xsm'
            >
              {isAllSelectedForBurning ? 'Deselect all' : 'Select all'}
            </Button>
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
          </>
        ) : hasItems && (
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
  )
}

const mapStateToProps = state => {
  return {
    isBurning: getIsBurning(state),
    isAllSelectedForBurning: getIsAllSelectedForBurning(state)
  }
}

const mapActionsToProps = {
  toggleIsBurning,
  toggleDownloadSelectAll
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DownloadsHeader)
