import React from 'react'
import cx from 'classnames'
import styles from './Input.scss'
import _ from 'lodash'

const Input = ({
  field,
  form,
  className,
  ...props
}) => {
  const hasTouched = _.has(form?.touched, field.name)
  const hasError = _.has(form?.errors, field.name)

  if (props.innerRef) {
    props.ref = props.innerRef
    delete props.innerRef
  }

  return (
    <div
      className={cx({
        [styles.hasError]: hasTouched && hasError
      })}>
      <div className={styles.container}>
        <input
          {...field}
          {...props}
          className={cx(className, styles.input)} />
      </div>
    </div>
  )
}

export default Input
