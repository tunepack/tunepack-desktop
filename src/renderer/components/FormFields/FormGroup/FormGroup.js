import React from 'react'
import styles from './FormGroup.scss'
import cx from 'classnames'

const FormGroup = ({
  children,
  className
}) => {
  return (
    <div
      className={cx(styles.component, {
        [className]: className
      })}>
      {children}
    </div>
  )
}

export default FormGroup
