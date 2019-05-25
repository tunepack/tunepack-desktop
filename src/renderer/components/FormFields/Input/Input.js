import React from 'react'
import cx from 'classnames'
import styles from './Input.scss'
import _ from 'lodash'
import Icon from 'components/Icon/Icon'
import Close from 'icons/Close.svg'

const Input = ({
  field,
  form,
  className,
  submitOnBlur,
  isClearable,
  onClearClick,
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
        [styles.isClearable]: isClearable,
        [styles.hasError]: hasTouched && hasError
      })}
    >
      <div className={styles.container}>
        <input
          {...field}
          {...props}
          onBlur={event => {
            form?.setFieldValue && form.setFieldValue(field.name, event.target.value)

            if (submitOnBlur) {
              setTimeout(() => {
                form.submitForm()
              })
            }
          }}
          className={cx(className, styles.input)}
        />
        {isClearable && (
          <button
            onClick={onClearClick}
            type='button'
            className={styles.clearIconContainer}
          >
            <Icon
              className={styles.clearIcon}
              glyph={Close}
            />
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
