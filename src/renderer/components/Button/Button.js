import React from 'react'
import styles from './Button.scss'
import cx from 'classnames'

const Button = ({
  children,
  type,
  variant,
  iconBefore,
  iconAfter,
  iconTop,
  size,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cx(styles.component, {
        [styles.hasIconTop]: iconTop,
        [styles[`variant-${variant}`]]: variant,
        [styles[`size-${size}`]]: size,
        [className]: className
      })}
      {...props}>
      <div className={styles.content}>
        {iconBefore && (
          <div className={styles.iconBefore}>
            {iconBefore}
          </div>
        )}
        {iconTop && (
          <div className={styles.iconTop}>
            {iconTop}
          </div>
        )}
        <div className={styles.children}>
          {children}
        </div>
        {iconAfter && (
          <div className={styles.iconAfter}>
            {iconAfter}
          </div>
        )}
      </div>
    </button>
  )
}

Button.defaultProps = {
  type: 'button'
}

export default Button
