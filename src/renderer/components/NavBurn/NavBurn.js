import React from 'react'
import cx from 'classnames'
import styles from './NavBurn.scss'
import {
  getIsBurning,
  getSelectedForBurning
} from 'selectors/settings'
import { toggleIsBurning } from 'actions/settings'
import { connect } from 'react-redux'
import Icon from 'components/Icon/Icon'
import USBIcon from 'icons/USB.svg'

const NavBurn = ({
  isBurning,
  selectedForBurning
}) => {
  const selectedForBurningCount = selectedForBurning.count()
  const hasSelectedOneForBurning = selectedForBurningCount > 0
  const isVisible = isBurning && hasSelectedOneForBurning

  return (
    <div
      className={cx(styles.component, {
        [styles.isVisible]: isVisible
      })}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <button
            className={styles.btnBurn}
          >
            <div className={styles.btnBurnContent}>
              <div className={styles.btnBurnIconBefore}>
                <Icon glyph={USBIcon} />
              </div>
              <div className={styles.btnBurnLabel}>
                <span>Click here to burn</span>
                {' '}
                <strong>{selectedForBurningCount} {selectedForBurningCount === 1 ? 'tune' : 'tunes'}</strong>
                {' '}
                <span>to CD or USB</span>
              </div>
            </div>
          </button>
        </div>
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
)(NavBurn)
