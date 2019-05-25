import React from 'react'
import styles from './View.scss'

const View = ({
  header,
  children
}) => {
  return (
    <>
      {header && (
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {header}
          </div>
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </>
  )
}

export default View
