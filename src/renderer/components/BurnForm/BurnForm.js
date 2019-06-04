import React, { useState } from 'react'
import styles from './BurnForm.scss'
import ButtonHugeIcon from 'components/ButtonHugeIcon/ButtonHugeIcon'
import Icon from 'components/Icon/Icon'
import IconCD from 'icons/CD.svg'
import IconUSB from 'icons/USB.svg'
import * as BurnType from 'shared/constants/BurnType'

const BurnForm = () => {
  const [burnType, setBurnType] = useState(null)

  const handleSelectBurnType = bt => () => {
    setBurnType(bt)
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
      {burnType && (
        <div className={styles.next}>
          This is the inner content
        </div>
      )}
    </div>
  )
}

export default BurnForm
