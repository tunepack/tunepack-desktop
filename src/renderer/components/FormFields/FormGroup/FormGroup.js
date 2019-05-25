import React from 'react'
import styles from './FormGroup.scss'
import cx from 'classnames'

const FormGroup = ({
  children,
  className,
  parent
}) => {
  return (
    <div
      className={cx(styles.component, {
        [styles.parent]: parent,
        [className]: className
      })}
    >
      {children}
    </div>
  )
}

export default FormGroup
