import React from 'react'
import cx from 'classnames'
import styles from './NavBurn.scss'
import {
  getIsBurning,
  getSelectedForBurning,
  getIsBurningContinued
} from 'selectors/settings'
import {
  setBurnContinue,
  toggleIsBurning
} from 'actions/settings'
import { connect } from 'react-redux'
import Icon from 'components/Icon/Icon'
import Button from 'components/Button/Button'
import BurnForm from 'components/BurnForm/BurnForm'
import IconUSB from 'icons/USB.svg'
import IconClose from 'components/IconClose/IconClose'

const NavBurn = ({
  isBurning,
  selectedForBurning,
  isBurningContinued,
  setBurnContinue
}) => {
  const selectedForBurningCount = selectedForBurning.count()
  const hasSelectedOneForBurning = selectedForBurningCount > 0
  const isVisible = isBurning && hasSelectedOneForBurning

  const handleContinueClick = () => {
    setBurnContinue(true)
  }

  const handleCloseClick = () => {
    setBurnContinue(false)
  }

  return (
    <div
      className={cx(styles.component, {
        [styles.isVisible]: isVisible,
        [styles.isContinued]: isBurningContinued
      })}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          {isBurningContinued ? (
            <Button
              onClick={handleCloseClick}
              className={styles.btnClose}
              iconBefore={(
                <div className={styles.btnCloseIconBefore}>
                  <IconClose />
                </div>
              )}
            >
              Close
            </Button>
          ) : (
            <Button
              className={styles.btnBurn}
              variant='primary'
              onClick={handleContinueClick}
              iconBefore={(
                <div className={styles.btnBurnIconBefore}>
                  <Icon glyph={IconUSB} />
                </div>
              )}
            >
              <span>Click here to burn</span>
              {' '}
              <strong>{selectedForBurningCount} {selectedForBurningCount === 1 ? 'tune' : 'tunes'}</strong>
              {' '}
              <span>to CD or USB</span>
            </Button>
          )}
        </div>
      </div>
      {isBurningContinued && (
        <div className={styles.form}>
          <BurnForm />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isBurning: getIsBurning(state),
    selectedForBurning: getSelectedForBurning(state),
    isBurningContinued: getIsBurningContinued(state)
  }
}

const mapActionsToProps = {
  toggleIsBurning,
  setBurnContinue
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(NavBurn)
