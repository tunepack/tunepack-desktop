import React from 'react'
import styles from './MetaPill.scss'
import cx from 'classnames'

const MetaPill = ({
  children,
  variant
}) => {
  return (
    <div
      className={cx(styles.component, 'meta-pill', {
        [styles[variant]]: variant
      })}>
      {children}
    </div>
  )
}

export default MetaPill
