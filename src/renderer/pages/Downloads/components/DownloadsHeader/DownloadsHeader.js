import React, { useEffect, useCallback } from 'react'
import styles from './DownloadsHeader.scss'
import Title from 'components/Title/Title'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import CloseIcon from 'icons/Close.svg'
import USBIcon from 'icons/USB.svg'
import {
  getIsBurning,
  getSelectedForBurning
} from 'selectors/settings'
import { toggleIsBurning } from 'actions/settings'
import { connect } from 'react-redux'

const KEY_B = 66

const DownloadsHeader = ({
  isBurning,
  selectedForBurning,
  toggleIsBurning
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
    <div className={styles.component}>
      <Title>
        Downloads
      </Title>
      <div className={styles.controls}>
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
  )
}

const mapStateToProps = state => {
  return {
    isBurning: getIsBurning(state),
    selectedForBurning: getSelectedForBurning(state)
  }
}

const mapActionsToProps = {
  toggleIsBurning
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DownloadsHeader)
