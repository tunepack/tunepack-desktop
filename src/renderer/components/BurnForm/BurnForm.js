import React, { useState, useEffect } from 'react'
import styles from './BurnForm.scss'
import ButtonHugeIcon from 'components/ButtonHugeIcon/ButtonHugeIcon'
import Icon from 'components/Icon/Icon'
import Spinner from 'components/Spinner/Spinner'
import IconCD from 'icons/CD.svg'
import IconUSB from 'icons/USB.svg'
import * as BurnType from 'shared/constants/BurnType'
import { connect } from 'react-redux'
import { getDrives, burn } from 'actions/settings'
import {
  getIsExecutingBurning,
  getIsExecutingGetDrives,
  getDrives as getDrivesSelector
} from '../../selectors/settings'

const BurnForm = ({
  drives,
  isExecutingGetDrives,
  isExecutingBurning,
  getDrives,
  burn
}) => {
  const [burnType, setBurnType] = useState(null)

  useEffect(() => {
    getDrives()
  }, [])

  const handleSelectBurnType = bt => () => {
    setBurnType(bt)

    burn({
      type: bt
    })
  }

  if (isExecutingGetDrives) {
    return (
      <div className={styles.loader}>
        <Spinner primary />
      </div>
    )
  }

  // eslint-disable-next-line no-console
  console.log(drives)

  return (
    <div className={styles.component}>
      <div className={styles.typeSelect}>
        <ButtonHugeIcon
          onClick={handleSelectBurnType(BurnType.DISK)}
          isActive={burnType === BurnType.DISK}
          label='Burn to disk'
          icon={(
            <Icon glyph={IconCD} />
          )}
        />
        <ButtonHugeIcon
          onClick={handleSelectBurnType(BurnType.USB)}
          isActive={burnType === BurnType.USB}
          label='Copy to USB'
          icon={(
            <Icon glyph={IconUSB} />
          )}
        />
      </div>
      {burnType && (
        <>
          {burnType === BurnType.DISK ? (
            <div>
              {isExecutingBurning ? 'Is burning...' : 'All done.'}
            </div>
          ) : (
            <div>
              {JSON.stringify(drives.toJS())}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    drives: getDrivesSelector(state),
    isExecutingGetDrives: getIsExecutingGetDrives(state),
    isExecutingBurning: getIsExecutingBurning(state)
  }
}

const mapActionsToProps = {
  getDrives,
  burn
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(BurnForm)
