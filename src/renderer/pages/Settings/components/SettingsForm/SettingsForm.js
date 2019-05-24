import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Input, Field, FormGroup, FieldLabel, Select, Toggle } from 'components/FormFields'
import Button from 'components/Button/Button'
import { connect } from 'react-redux'
import { getData as getSettings } from 'selectors/settings'
import { selectDownloadDir, setSettings } from 'actions/settings'
import FileLocationLabel from 'components/FileLocationLabel/FileLocationLabel'
import LivingAlert from 'components/LivingAlert/LivingAlert'
import * as AudioFileExtensions from 'constants/AudioFileExtension'
import * as Yup from 'yup'
import styles from './SettingsForm.scss'

const validationSchema = Yup.object().shape({
  searchFileExtensions: Yup
    .array()
    .min(1)
    .required(),
  searchDuration: Yup
    .number()
    .min(5)
    .max(25)
    .required()
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
  const [isSaved, setIsSaved] = useState(false)

  const handleClickFileLocation = (e) => {
    e.preventDefault()
    selectDownloadDir()
  }

  const handleSubmit = (newSettings) => {
    newSettings.searchFileExtensions = newSettings.searchFileExtensions.map(ext => { return ext.value })
    newSettings.searchDuration = newSettings.searchDuration * 1000

    setSettings(newSettings)
    setIsSaved(true)
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
        searchDuration: settings.get('searchDuration') / 1000
      }}
      render={({ values, handleSubmit }) => {
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
                  helper='When searching for mp3 files, do you only want to only display 320kbps?'
                  name='searchHasOnlyHighBitrate'
                  label='Search for high quality mp3 only'
                  component={Toggle} />
              </FormGroup>
              <FormGroup>
                <Field
                  isMulti
                  isClearable={false}
                  options={fileExtensionOptions}
                  helper='What kind of file types do you want to search for?'
                  name='searchFileExtensions'
                  label='Search file types'
                  placeholder='Select your search file types'
                  component={Select} />
              </FormGroup>
              <FormGroup>
                <Field
                  min={1}
                  max={25}
                  type='number'
                  name='searchDuration'
                  label='Search speed (in seconds)'
                  placeholder='Select search duration'
                  component={Input} />
              </FormGroup>
              <Button
                type='submit'
                onClick={handleSubmit}
                size='sm'>
                Save
              </Button>
              {isSaved && (
                <LivingAlert
                  onDestroy={() => {
                    setIsSaved(false)
                  }}
                  className={styles.saveSuccess}>
                  Settings saved
                </LivingAlert>
              )}
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
