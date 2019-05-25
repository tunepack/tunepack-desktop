import React from 'react'
import SettingsForm from '../components/SettingsForm/SettingsForm'
import { connect } from 'react-redux'
import { getData as getSettings } from 'selectors/settings'
import { setSettings } from 'actions/settings'

const SettingsFormContainer = React.memo(({
  settings,
  setSettings
}) => {
  const handleSubmit = (newSettings) => {
    setSettings(newSettings)
  }

  return (
    <SettingsForm
      settings={settings}
      onSubmit={handleSubmit}
    />
  )
})

const mapStateToProps = state => {
  return {
    settings: getSettings(state)
  }
}

const mapActionsToProps = {
  setSettings
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SettingsFormContainer)
