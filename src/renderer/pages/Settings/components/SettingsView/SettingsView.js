import React from 'react'
import View from 'components/View/View'
import Title from 'components/Title/Title'
import SettingsForm from '../SettingsForm/SettingsForm'
import styles from './SettingsView.scss'

const SettingsView = () => {
  return (
    <View
      header={(
        <div className={styles.header}>
          <Title>
            Settings
          </Title>
        </div>
      )}>
      <SettingsForm />
    </View>
  )
}

export default SettingsView
