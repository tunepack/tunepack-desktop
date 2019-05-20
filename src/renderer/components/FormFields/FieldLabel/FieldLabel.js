import React from 'react'
import styles from './FieldLabel.scss'

const FieldLabel = ({
  children
}) => {
  return (
    <div className={styles.component}>
      {children}
    </div>
  )
}

export default FieldLabel
