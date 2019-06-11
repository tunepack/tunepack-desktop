import React from 'react'
import styles from './ButtonHugeIcon.scss'
import cx from 'classnames'

const ButtonHugeIcon = ({
  icon,
  label,
  isActive,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cx(styles.component, {
        [styles.isActive]: isActive
      })}
    >
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.label}>
        {label}
      </div>
    </button>
  )
}

export default ButtonHugeIcon
