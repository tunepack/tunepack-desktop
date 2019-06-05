import React, { useState } from 'react'
import styles from './BurnFormContent.scss'
import * as BurnType from 'shared/constants/BurnType'
import Button from 'components/Button/Button'
import ProgressBar from 'components/ProgressBar/ProgressBar'
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
  } else if (burningError === 'not-mac') {
    return 'Sorry, burning to disk is only for Mac, we are working on it.'
  }

  return 'Something has gone wrong....'
}

const BurnFormContent = ({
  burnType,
  isExecutingBurning,
  drives,
  burningError,
  burn,
  isBurned,
  burnReset,
  burnProgress
}) => {
  const driveOptions = getDriveOptions(drives)
  const [selectedDriveOption, setSelectedDriveOption] = useState(driveOptions[0])

  const handleRemoveDownloadsClick = () => {
    burnReset()
  }

  const handleKeepDownloadsClick = () => {
    burnReset()
  }

  if (isExecutingBurning) {
    const progress = Math.round(Number(burnProgress))

    return (
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <ProgressBar progress={progress} />
        </div>
        {burnType === BurnType.USB ? (
          <div className={styles.progressLabel}>
            Copying to {selectedDriveOption.label}...
          </div>
        ) : (
          <div className={styles.progressLabel}>
            Burning to disk
          </div>
        )}
      </div>
    )
  }

  if (isBurned) {
    return (
      <div className={styles.finished}>
        <div className={styles.finishedLabel}>
          All finished. Do you want to keep the original downloads?
        </div>
        <div className={styles.finishedCleanup}>
          <Button
            onClick={handleKeepDownloadsClick}
            size='sm'
          >
            Yes, keep them
          </Button>
          <Button
            onClick={handleRemoveDownloadsClick}
            variant='error'
            size='sm'
          >
            No, remove them
          </Button>
        </div>
      </div>
    )
  }

  const handleCopyClick = () => {
    burn({
      type: BurnType.USB,
      drive: selectedDriveOption.value,
      driveName: selectedDriveOption.label
    })
  }

  if (burnType === BurnType.DISK) {
    if (burningError) {
      return (
        <div className={styles.error}>
          {getBurningErrorLabel(burningError)}
        </div>
      )
    }
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
          isLoading={isExecutingBurning}
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
