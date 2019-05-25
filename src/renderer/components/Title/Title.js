import React from 'react'
import styles from './Title.scss'
import cx from 'classnames'

const Title = ({
  className,
  children
}) => {
  return (
    <h1
      className={cx(styles.component, {
        [className]: className
      })}
    >
      {children}
    </h1>
  )
}

export default Title
