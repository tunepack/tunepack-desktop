import React from 'react'
import SettingsForm from '../components/SettingsForm/SettingsForm'
import { connect } from 'react-redux'
import {
  getData as getSettings,
  getIsResetting
} from 'selectors/settings'
import { setSettings } from 'actions/settings'
import { reset } from 'actions/app'

const SettingsFormContainer = React.memo(({
  settings,
  setSettings,
  reset,
  isResetting
}) => {
  const handleSubmit = (newSettings) => {
    setSettings(newSettings)
  }

  const handleResetClick = () => {
    reset()
  }

  return (
    <SettingsForm
      isResetting={isResetting}
      settings={settings}
      onResetClick={handleResetClick}
      onSubmit={handleSubmit}
    />
  )
})

const mapStateToProps = state => {
  return {
    settings: getSettings(state),
    isResetting: getIsResetting(state)
  }
}

const mapActionsToProps = {
  setSettings,
  reset
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SettingsFormContainer)
