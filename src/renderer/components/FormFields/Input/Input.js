import React from 'react'
import cx from 'classnames'
import styles from './Input.scss'
import _ from 'lodash'

const Input = ({
  field,
  form,
  className,
  submitOnBlur,
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
          onBlur={event => {
            form.setFieldValue(field.name, event.target.value)

            if (submitOnBlur) {
              setTimeout(() => {
                form.submitForm()
              })
            }
          }}
          className={cx(className, styles.input)} />
      </div>
    </div>
  )
}

export default Input
