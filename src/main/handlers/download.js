import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import createDebug from 'debug'
import shortid from 'shortid'
import tmp from 'tmp'

import { createSendAndWait } from '../utils/handlers'
import * as Channel from 'shared/constants/Channel'
import * as slsk from '../utils/slsk'
import * as settings from '../utils/settings'
import * as notifications from '../utils/notifications'
import * as fsUtils from '../utils/fs'
import * as state from '../utils/state'

const debug = createDebug('tunepack:download')

const PROGRESS_INTERVAL = 300

const getErrorMessage = () => {
  return 'Something has gone wrong.'
}

const createTmpFile = () => new Promise((resolve, reject) => {
  tmp.file((error, path, fd, cleanupCallback) => {
    if (error) {
      return reject(error)
    }

    resolve({
      path,
      fd,
      cleanupCallback
    })
  })
})

const downloadTrack = async ({
  downloadPath,
  tmpPath,
  track,
  onProgress
}) => {
  return new Promise(async (resolve, reject) => {
    const writeStream = fs.createWriteStream(tmpPath)

    debug(`Downloading to: ${tmpPath}`)

    const totalSize = track.size
    const streamId = shortid.generate()

    let uploadedSize = 0
    const startTime = Date.now()

    const throttledOnProgress = _.throttle(() => {
      const now = Date.now()
      const progress = Math.round(uploadedSize / totalSize * 100)
      const avgSpeed = Math.round(uploadedSize / (now - startTime) * 1000)

      onProgress(progress, avgSpeed)
    }, PROGRESS_INTERVAL)

    const handleChunk = chunk => {
      uploadedSize += chunk.length
      throttledOnProgress()
    }

    const handleEnd = async () => {
      await fsUtils.copyFile(tmpPath, downloadPath)
      await fsUtils.unlink(tmpPath)

      debug(`Copied and removed ${tmpPath} to: ${downloadPath}`)

      state.removeActiveStream(streamId)

      resolve({
        tmpPath,
        downloadPath
      })
    }

    const handleError = (error) => {
      state.removeActiveStream(streamId)
      reject(error)
    }

    const downloadStream = await slsk
      .downloadStream({
        file: track
      })

    state.addActiveStream(streamId, downloadStream)

    downloadStream
      .on('data', handleChunk)
      .on('error', handleError)
      .on('end', handleEnd)
      .pipe(writeStream)
  })
}

const getUniqueDownloadPath = async (track) => {
  const downloadsDir = settings.getDownloadsDir()
  const downloadPath = path.resolve(downloadsDir, `${track.fileName}.${track.fileExtension}`)

  const isDownloadPathTaken = await fsUtils.getDoesFileExist(downloadPath)

  if (!isDownloadPathTaken) {
    return downloadPath
  }

  const newDownloadPath = path.resolve(downloadsDir, `${track.fileName}_${track.id}.${track.fileExtension}`)

  debug(`Download path was taken, new download path is: ${newDownloadPath}`)

  return newDownloadPath
}

createSendAndWait(Channel.DOWNLOAD, async (event, track) => {
  try {
    const handleProgress = (progress, avgSpeed) => {
      // This is an important crash fix
      if (state.getState().isQuitting) {
        debug(`Ignoring the send of ${Channel.DOWNLOAD_PROGRESS} because the app is quitting`)
        return
      }

      event.reply(Channel.DOWNLOAD_PROGRESS, {
        track,
        progress,
        avgSpeed
      })
    }

    const {
      path: tmpPath,
      cleanupCallback
    } = await createTmpFile()

    const downloadPath = await getUniqueDownloadPath(track)

    settings.addToDownloadHistory({
      track,
      downloadPath,
      tmpPath,
      isDownloading: true,
      isDownloaded: false,
      error: ''
    })

    await downloadTrack({
      downloadPath,
      tmpPath,
      track,
      onProgress: handleProgress
    })

    cleanupCallback()

    settings.updateDownloadHistoryEntry(track.id, {
      isDownloading: false,
      isDownloaded: true
    })

    event.reply(Channel.DOWNLOAD_COMPLETE, {
      track,
      downloadPath
    })

    notifications.showDownloadedNotification({
      track,
      downloadPath
    })

    return {
      downloadPath
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)

    settings.updateDownloadHistoryEntry(track.id, {
      isDownloading: false,
      isDownloaded: false,
      error: errorMessage
    })

    event.reply(Channel.DOWNLOAD_ERROR, {
      track,
      errorMessage
    })

    throw error
  }
})
