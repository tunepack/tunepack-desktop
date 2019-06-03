import React from 'react'
import styles from '../Icon/Icon.scss'

const IconBase = ({
  children
}) => {
  return (
    <div className={styles.component}>
      {children}
    </div>
  )
}

export default IconBase
