import React from 'react'
import ReactSelect from 'react-select'
import styles from './Select.scss'
import cx from 'classnames'

const getValue = ({
  isMulti,
  options,
  value
}) => {
  if (options) {
    return isMulti
      ? options.filter(option => { return value.indexOf(option.value) >= 0 })
      : options.find(option => { return option.value === value })
  }

  return isMulti ? [] : ''
}

const onChange = ({
  isMulti,
  form,
  field,
  submitOnChange
}) => {
  return option => {
    const value = isMulti
      ? option.map(item => { return item.value })
      : option.value

    form.setFieldValue(
      field.name,
      value
    )

    if (submitOnChange) {
      setTimeout(() => {
        form.submitForm()
      })
    }
  }
}

const Select = ({
  field,
  form,
  submitOnChange,
  ...props
}) => {
  const hasTouched = !!form.touched[field.name]
  const hasError = !!form.errors[field.name]

  return (
    <div
      className={cx(styles.component, {
        [styles.hasError]: hasTouched && hasError
      })}
    >
      <ReactSelect
        classNamePrefix='react-select'
        name={name}
        value={getValue({
          options: props.options,
          isMulti: props.isMulti,
          value: field.value
        })}
        onChange={onChange({
          isMulti: props.isMulti,
          form,
          field,
          submitOnChange
        })}
        {...props}
      />
    </div>
  )
}

export default Select
