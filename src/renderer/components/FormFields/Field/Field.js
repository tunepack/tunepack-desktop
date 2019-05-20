import React from 'react'

import {
  Field as FormikField,
  ErrorMessage as FormikErrorMessage
} from 'formik'

import FieldLabel from '../FieldLabel/FieldLabel'
import styles from './Field.scss'

const Field = ({
  name,
  label,
  helper,
  hideFieldLabel,
  ...props
}) => {
  return (
    <div
      className={styles.component}>
      {(!hideFieldLabel && label) && (
        <FieldLabel>
          {label}
        </FieldLabel>
      )}
      {helper && (
        <div className={styles.helper}>
          {helper}
        </div>
      )}
      <div className={styles.field}>
        <FormikField
          name={name}
          label={label}
          {...props} />
      </div>
      <FormikErrorMessage
        name={name}
        render={(error) => {
          return (
            <div className={styles.error}>
              <small>{error}</small>
            </div>
          )
        }} />
    </div>
  )
}

export default Field
