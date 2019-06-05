import * as Channel from 'shared/constants/Channel'
import { createSendAndWait } from '../utils/handlers'
import { dir as createTmpDir } from 'tmp-promise'
import * as BurnType from 'shared/constants/BurnType'
import { burnFolder } from '../utils/cd'
import path from 'path'
import fs from 'fs-extra'
import { copyFilesToDrive } from '../utils/drive'
import _ from 'lodash'
import * as notifications from '../utils/notifications'

const PROGRESS_INTERVAL = 300

const burnToDisk = async (event, args) => {
  const {
    downloads
  } = args

  const {
    path: tmpPath,
    cleanup: tmpCleanup
  } = await createTmpDir({
    unsafeCleanup: true
  })

  for (const download of downloads) {
    const { downloadPath } = download

    const tmpFilePath = path.resolve(
      tmpPath,
      path.basename(downloadPath)
    )

    await fs.copy(downloadPath, tmpFilePath)
  }

  await burnFolder({
    folderName: tmpPath
  })

  await tmpCleanup()
}

const burnToDrive = async (event, args) => {
  const {
    downloads,
    drive,
    driveName
  } = args

  const throttledOnProgress = _.throttle(progress => {
    event.reply(Channel.BURN_PROGRESS, {
      progress
    })
  }, PROGRESS_INTERVAL)

  const handleProgress = progress => {
    throttledOnProgress(progress)
  }

  const files = []

  for (const download of downloads) {
    files.push(download.downloadPath)
  }

  await copyFilesToDrive({
    files,
    drive,
    onProgress: handleProgress
  })

  notifications.showCopiedNotification({
    trackCount: files.length,
    driveName,
    drivePath: drive
  })

  return true
}

createSendAndWait(Channel.BURN, async (event, args) => {
  if (args.type === BurnType.DISK) {
    return burnToDisk(event, args)
  } else if (args.type === BurnType.USB) {
    return burnToDrive(event, args)
  }

  return null
})
