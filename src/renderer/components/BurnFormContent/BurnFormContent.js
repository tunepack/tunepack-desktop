import React, { useState } from 'react'
import styles from './BurnFormContent.scss'
import * as BurnType from 'shared/constants/BurnType'
import Button from 'components/Button/Button'
import {
  Select
} from 'components/FormFields'

const getDriveOptions = drives => {
  return drives
    .reduce((output, drive) => {
      const mountpoints = drive.get('mountpoints')
      const isSystem = drive.get('isSystem')
      const isUSB = drive.get('isUSB')

      if (!isSystem && isUSB && mountpoints?.count() > 0) {
        mountpoints.forEach(mp => {
          output.push({
            label: mp.get('label'),
            value: mp.get('path')
          })
        })
      }

      return output
    }, [])
}

const getBurningErrorLabel = burningError => {
  if (burningError === 'no-device') {
    return 'No disk burning device found.'
  }

  return 'Something has gone wrong....'
}

const BurnFormContent = ({
  burnType,
  isExecutingBurning,
  drives,
  burningError
}) => {
  const handleCopyClick = () => {
    // TODO: should copy.
  }

  const driveOptions = getDriveOptions(drives)
  const [selectedDriveOption, setSelectedDriveOption] = useState(driveOptions[0])

  if (burnType === BurnType.DISK) {
    if (burningError) {
      return (
        <div className={styles.error}>
          {getBurningErrorLabel(burningError)}
        </div>
      )
    }

    return (
      <div className={styles.status}>
        {isExecutingBurning ? 'Is burning...' : 'All done.'}
      </div>
    )
  } else if (burnType === BurnType.USB) {
    if (driveOptions.length === 0) {
      return (
        <div className={styles.error}>
          No USB disks found.
        </div>
      )
    }

    return (
      <div className={styles.usb}>
        <div className={styles.selectDrive}>
          <Select
            menuPlacement='top'
            form={{
              touched: {},
              errors: {},
              setFieldValue: (name, option) => {
                setSelectedDriveOption(option)
              }
            }}
            field={{
              name: 'drive',
              value: selectedDriveOption?.value
            }}
            name='drive'
            label='Select a drive'
            placeholder='Select a USB drive'
            options={driveOptions}
          />
        </div>
        <Button
          onClick={handleCopyClick}
          variant='primary'
        >
          Copy
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.makeSelection}>
      Please select an option
    </div>
  )
}

export default BurnFormContent
