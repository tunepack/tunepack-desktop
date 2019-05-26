import React from 'react'
import styles from './Button.scss'
import cx from 'classnames'
import Spinner from 'components/Spinner/Spinner'

const Button = ({
  children,
  type,
  variant,
  iconBefore,
  iconAfter,
  iconTop,
  size,
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cx(styles.component, {
        [styles.hasIconTop]: iconTop,
        [styles[`variant-${variant}`]]: variant,
        [styles[`size-${size}`]]: size,
        [styles.isLoading]: isLoading,
        [className]: className
      })}
      {...props}
    >
      <div className={styles.content}>
        {iconBefore && !isLoading && (
          <div className={styles.iconBefore}>
            {iconBefore}
          </div>
        )}
        {iconTop && !isLoading && (
          <div className={styles.iconTop}>
            {iconTop}
          </div>
        )}
        {isLoading ? (
          <div className={styles.loaderWrap}>
            <Spinner
              className={cx(styles.loader)}
            />
          </div>
        ) : (
          <div className={styles.children}>
            {children}
          </div>
        )}
        {iconAfter && !isLoading && (
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
