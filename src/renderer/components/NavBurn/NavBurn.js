import React from 'react'
import cx from 'classnames'
import styles from './NavBurn.scss'
import {
  getIsBurning,
  getSelectedForBurning
} from 'selectors/settings'
import { toggleIsBurning } from 'actions/settings'
import { connect } from 'react-redux'

const NavBurn = ({
  isBurning,
  selectedForBurning
}) => {
  const hasSelectedOneForBurning = selectedForBurning.count() > 0
  const isVisible = isBurning && hasSelectedOneForBurning

  return (
    <div
      className={cx(styles.component, {
        [styles.isVisible]: isVisible
      })}
    >
      <div className={styles.content}>
        Test
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
