import React from 'react'
import styles from './Badge.scss'
import cx from 'classnames'

const Badge = ({
  children,
  variant,
  className
}) => {
  return (
    <div
      className={cx(styles.component, {
        [styles[variant]]: variant,
        [className]: className
      })}>
      {children}
    </div>
  )
}

export default Badge
