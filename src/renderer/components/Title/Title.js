import React from 'react'
import styles from './Title.scss'
import cx from 'classnames'

const Title = ({
  as = 'h1',
  className,
  children
}) => {
  return (
    <as
      className={cx(styles.component, {
        [className]: className
      })}>
      {children}
    </as>
  )
}

export default Title
