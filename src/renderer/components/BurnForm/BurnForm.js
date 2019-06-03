import React from 'react'
import styles from './BurnForm.scss'
import Icon from 'components/Icon/Icon'
import IconCD from 'icons/CD.svg'
import IconUSB from 'icons/USB.svg'

const BurnForm = () => {
  return (
    <div className={styles.component}>
      <div className={styles.typeSelect}>
        <button className={styles.btnType}>
          <div className={styles.btnTypeIcon}>
            <Icon glyph={IconCD} />
          </div>
          <div className={styles.btnTypeLabel}>
            Burn to disk
          </div>
        </button>
        <button className={styles.btnType}>
          <div className={styles.btnTypeIcon}>
            <Icon glyph={IconUSB} />
          </div>
          <div className={styles.btnTypeLabel}>
            Copy to USB
          </div>
        </button>
      </div>
    </div>
  )
}

export default BurnForm
