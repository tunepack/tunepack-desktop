import React from 'react'
import { Formik, Form } from 'formik'
import { Input, Field, FormGroup, FieldLabel, Select, Toggle } from 'components/FormFields'
import Button from 'components/Button/Button'
import { connect } from 'react-redux'
import { getData as getSettings } from 'selectors/settings'
import { selectDownloadDir, setSettings } from 'actions/settings'
import FileLocationLabel from 'components/FileLocationLabel/FileLocationLabel'
import * as AudioFileExtensions from 'constants/AudioFileExtension'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  searchFileExtensions: Yup
    .array()
    .min(1, 'You need at least 1 file extension for searching')
    .required(),
  searchDuration: Yup
    .number()
    .min(3, 'You cannot search for less than 3 seconds, there would be no results otherwise')
    .max(60, 'You cannot search for longer than 60 seconds, it would take too long')
    .required('Search duration is required')
})

const fileExtensionOptions = Object
  .values(AudioFileExtensions)
  .map(i => {
    return {
      label: i,
      value: i
    }
  })

const getInitialSearchFileExtensions = settings => {
  const searchFileExtensions = settings.get('searchFileExtensions')

  return searchFileExtensions.map(i => {
    return {
      label: i,
      value: i
    }
  }).toArray()
}

const SettingsForm = ({
  settings,
  selectDownloadDir,
  setSettings
}) => {
  const handleClickFileLocation = (e) => {
    e.preventDefault()
    selectDownloadDir()
  }

  const handleSubmit = (newSettings) => {
    newSettings.searchFileExtensions = newSettings.searchFileExtensions.map(ext => { return ext.value })
    newSettings.searchDuration = newSettings.searchDuration * 1000

    setSettings(newSettings)
  }

  const searchFileExtensions = getInitialSearchFileExtensions(settings)

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
      initialValues={{
        downloadsDir: settings.get('downloadsDir'),
        searchHasOnlyHighBitrate: settings.get('searchHasOnlyHighBitrate'),
        searchFileExtensions,
        searchDuration: (settings.get('searchDuration') / 1000)
      }}
      render={({ values }) => {
        return (
          <Form>
            <FormGroup parent>
              <FormGroup>
                <FieldLabel>
                  Download location
                </FieldLabel>
                <FileLocationLabel
                  fileLocation={values.downloadsDir}
                  onClick={handleClickFileLocation}
                />
              </FormGroup>
              <Button
                type='button'
                onClick={handleClickFileLocation}
                size='sm'>
                Change
              </Button>
            </FormGroup>
            <FormGroup parent>
              <FormGroup>
                <Field
                  submitOnChange
                  helper='Enable this if you only want to show 320kbps mp3s in the search results'
                  name='searchHasOnlyHighBitrate'
                  label='Show high quality mp3 only'
                  component={Toggle} />
              </FormGroup>
              <FormGroup>
                <Field
                  submitOnChange
                  isMulti
                  isClearable={false}
                  options={fileExtensionOptions}
                  name='searchFileExtensions'
                  label='Search file types'
                  placeholder='Select your search file types'
                  component={Select} />
              </FormGroup>
              <FormGroup>
                <Field
                  submitOnBlur
                  min={1}
                  max={25}
                  type='number'
                  name='searchDuration'
                  label='Search duration (in seconds)'
                  placeholder='Select search duration'
                  component={Input} />
              </FormGroup>
            </FormGroup>
          </Form>
        )
      }} />
  )
}

const mapStateToProps = state => {
  return {
    settings: getSettings(state)
  }
}

const mapActionsToProps = {
  selectDownloadDir,
  setSettings
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SettingsForm)
