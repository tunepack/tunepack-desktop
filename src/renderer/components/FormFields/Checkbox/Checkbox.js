import React, { useRef } from 'react'
import styles from './Checkbox.scss'
import _ from 'lodash'
import cx from 'classnames'
import Check from 'icons/Check.svg'
import Icon from 'components/Icon/Icon'

const Checkbox = ({
  field,
  form,
  label,
  ...props
}) => {
  const inputRef = useRef(null)
  const hasTouched = _.has(form?.touched, field.name)
  const hasError = _.has(form?.errors, field.name)

  const handleLabelClick = () => {
    inputRef.current.click()
  }

  return (
    <div
      className={cx(styles.component, {
        [styles.hasError]: hasTouched && hasError
      })}
    >
      <input
        ref={inputRef}
        checked={field.value}
        onChange={event => {
          form.setFieldValue(field.name, event.target.checked)
        }}
        className={styles.input}
        type='checkbox'
        {...props}
      />
      <label className={styles.label}>
        <div className={styles.checkbox}>
          <div className={styles.checkboxCheck}>
            <Icon
              glyph={Check}
              className={styles.checkboxCheckIcon}
            />
          </div>
        </div>
        <div
          onClick={handleLabelClick}
          className={styles.labelContent}
        >
          {label}
        </div>
      </label>
    </div>
  )
}

export default Checkbox
