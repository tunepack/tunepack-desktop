import React from 'react'
import styles from './ProgressBar.scss'

const ProgressBar = ({
  progress
}) => {
  return (
    <div className={styles.component}>
      <div
        style={{
          width: `${progress}%`
        }}
        className={styles.indicator}
      />
    </div>
  )
}

export default ProgressBar
