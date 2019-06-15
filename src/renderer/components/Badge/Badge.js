import React from 'react'
import styles from './Badge.scss'
import cx from 'classnames'

const Badge = ({
  children,
  variant,
  iconBefore,
  className
}) => {
  return (
    <div
      className={cx(styles.component, {
        [styles[variant]]: variant,
        [className]: className
      })}
    >
      {iconBefore && (
        <div className={styles.iconBefore}>
          {iconBefore}
        </div>
      )}
      {children}
    </div>
  )
}

export default Badge
