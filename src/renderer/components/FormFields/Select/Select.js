import React from 'react'
import ReactSelect from 'react-select'
import styles from './Select.scss'
import cx from 'classnames'

const getValueFromOptions = (options, value, isMulti) => {
  if (isMulti && Array.isArray(value)) {
    const isSelectedValue = !!value[0]?.value

    if (isSelectedValue) {
      return value
    }

    return value.map(v => { return options.find(o => { return o.value === v }) })
  }

  if (Array.isArray(value)) {
    return value
  }

  for (const option of options) {
    if (option.options) {
      for (const nestedOption of option.options) {
        if (nestedOption.value === value) {
          return nestedOption
        }
      }
    }

    if (option.value === value) {
      return option
    }
  }

  return null
}

const Select = ({
  field,
  form,
  submitOnChange,
  ...props
}) => {
  const hasTouched = !!form.touched[field.name]
  const hasError = !!form.errors[field.name]

  field.value = getValueFromOptions(props.options, field.value, props.isMulti)

  return (
    <div
      className={cx(styles.component, {
        [styles.hasError]: hasTouched && hasError
      })}>
      <ReactSelect
        classNamePrefix='react-select'
        name={name}
        value={field.value}
        onChange={option => {
          if (Array.isArray(option)) {
            form.setFieldValue(field.name, option)
          } else {
            form.setFieldValue(field.name, option.value)
          }

          if (submitOnChange) {
            setTimeout(() => {
              form.submitForm()
            })
          }
        }}
        {...props} />
    </div>
  )
}

export default Select
