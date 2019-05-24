import React from 'react'
import { Formik, Form } from 'formik'
import { FormGroup } from 'components/FormFields'
import Button from 'components/Button/Button'
import { connect } from 'react-redux'
import { getDownloadsDir } from 'selectors/settings'
import { selectDownloadDir } from 'actions/settings'
import FileLabelLocation from 'components/FileLocationLabel/FileLocationLabel'
import FieldLabel from 'components/FormFields/FieldLabel/FieldLabel'

const SettingsForm = ({
  downloadsDir,
  selectDownloadDir
}) => {
  const handleClickFileLocation = (e) => {
    e.preventDefault()
    selectDownloadDir()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        downloadsDir
      }}
      render={({ values }) => {
        return (
          <Form>
            <FormGroup parent>
              <FormGroup>
                <FieldLabel>
                  Download location
                </FieldLabel>
                <FileLabelLocation
                  fileLocation={values.downloadsDir}
                  onClick={handleClickFileLocation}
                />
              </FormGroup>
              <Button
                onClick={handleClickFileLocation}
                size='sm'>
                Change
              </Button>
            </FormGroup>
          </Form>
        )
      }} />
  )
}

const mapStateToProps = state => {
  return {
    downloadsDir: getDownloadsDir(state)
  }
}

const mapActionsToProps = {
  selectDownloadDir
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SettingsForm)
