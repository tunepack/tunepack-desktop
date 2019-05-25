import React from 'react'
import ReactToggle from 'react-toggle'
import styles from './Toggle.scss'
import cx from 'classnames'

const Toggle = ({
  field,
  form,
  crucial,
  submitOnChange
}) => {
  const handleChange = event => {
    form.setFieldValue(field.name, event.target.checked)

    if (submitOnChange) {
      setTimeout(() => {
        form.submitForm()
      })
    }
  }

  const value = field.value

  return (
    <label
      className={cx(styles.component, {
        [styles.crucial]: crucial,
        [styles.checked]: value
      })}
    >
      <ReactToggle
        icons={false}
        className={styles.toggle}
        defaultChecked={value}
        onChange={handleChange}
      />
    </label>
  )
}

export default Toggle
