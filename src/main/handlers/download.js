const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const tmp = require('tmp')

const { createSendAndWait } = require('../utils/handlers')
const Channel = require('shared/constants/Channel')
const slsk = require('../utils/slsk')
const settings = require('../utils/settings')
const notifications = require('../utils/notifications')
const fsUtils = require('../utils/fs')
const debug = require('debug')('tunepack:download')
const shortid = require('shortid')
const activeStreams = require('../utils/activeStreams')
const state = require('../utils/state')

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

      delete activeStreams.downloadStreams[streamId]

      resolve({
        tmpPath,
        downloadPath
      })
    }

    const handleError = (error) => {
      delete activeStreams.downloadStreams[streamId]

      reject(error)
    }

    const downloadStream = await slsk
      .downloadStream({
        file: track
      })

    activeStreams.downloadStreams[streamId] = downloadStream

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
      if (state.isQuitting) {
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
