import React, { useEffect, useRef } from 'react'
import { Form, Formik } from 'formik'
import { Field, Input } from 'components/FormFields'

const SearchForm = ({
  onSubmit
}) => {
  const queryInputRef = useRef(null)

  useEffect(() => {
    queryInputRef.current.focus()
  }, [])

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        query: ''
      }}
      render={() => {
        return (
          <Form>
            <Field
              placeholder='Search track name, album, artist'
              innerRef={queryInputRef}
              name='query'
              component={Input} />
          </Form>
        )
      }} />
  )
}

export default SearchForm
