import React, { useState, useEffect } from 'react'
import styles from './BurnForm.scss'
import ButtonHugeIcon from 'components/ButtonHugeIcon/ButtonHugeIcon'
import BurnFormContent from 'components/BurnFormContent/BurnFormContent'
import Icon from 'components/Icon/Icon'
import Spinner from 'components/Spinner/Spinner'
import IconCD from 'icons/CD.svg'
import IconUSB from 'icons/USB.svg'
import * as BurnType from 'shared/constants/BurnType'
import { connect } from 'react-redux'
import { getDrives, burn } from 'actions/settings'
import { Collapse } from 'react-collapse'
import {
  getIsExecutingBurning,
  getIsExecutingGetDrives,
  getDrives as getDrivesSelector,
  getBurningError
} from 'selectors/settings'

const BurnForm = ({
  drives,
  isExecutingGetDrives,
  isExecutingBurning,
  getDrives,
  burn,
  burningError
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
      <Collapse isOpened={burnType !== null}>
        <div className={styles.content}>
          <BurnFormContent
            burnType={burnType}
            isExecutingBurning={isExecutingBurning}
            drives={drives}
            burningError={burningError}
          />
        </div>
      </Collapse>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    drives: getDrivesSelector(state),
    isExecutingGetDrives: getIsExecutingGetDrives(state),
    isExecutingBurning: getIsExecutingBurning(state),
    burningError: getBurningError(state)
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
