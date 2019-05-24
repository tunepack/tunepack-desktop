import React from 'react'
import { Formik, Form } from 'formik'
import { Field, Input, FormGroup } from 'components/FormFields'

const SettingsForm = () => {
  return (
    <Formik
      render={() => {
        return (
          <Form>
            <FormGroup>
              <Field
                name='lol'
                component={Input}
                placeholder='Hi'
              />
            </FormGroup>
          </Form>
        )
      }} />
  )
}

export default SettingsForm
