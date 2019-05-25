import React from 'react'
import {
  FieldLabel,
  FormGroup
} from 'components/FormFields'
import FileLocationLabel from 'components/FileLocationLabel/FileLocationLabel'
import Button from 'components/Button/Button'
import { getData as getSettings } from 'selectors/settings'
import {
  selectDownloadDir,
  setSettings
} from 'actions/settings'
import { connect } from 'react-redux'

const DownloadLocation = React.memo(({
  settings,
  selectDownloadDir
}) => {
  const handleClickFileLocation = (e) => {
    e.preventDefault()
    selectDownloadDir()
  }

  return (
    <FormGroup parent>
      <FormGroup>
        <FieldLabel>
          Download location
        </FieldLabel>
        <FileLocationLabel
          fileLocation={settings.get('downloadsDir')}
          onClick={handleClickFileLocation}
        />
      </FormGroup>
      <Button
        type='button'
        onClick={handleClickFileLocation}
        size='sm'
      >
        Change
      </Button>
    </FormGroup>
  )
})

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
)(DownloadLocation)
