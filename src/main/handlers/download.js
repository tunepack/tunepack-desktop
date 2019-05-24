const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const { createSendAndWait } = require('../utils/handlers')
const Channel = require('../constants/Channel')
const slsk = require('../utils/slsk')
const settings = require('../utils/settings')

const PROGRESS_INTERVAL = 500

const getErrorMessage = () => {
  return 'Something has gone wrong.'
}

const downloadTrack = async ({
  downloadPath,
  track,
  onProgress
}) => {
  return new Promise(async (resolve, reject) => {
    const writeStream = fs.createWriteStream(downloadPath)

    const totalSize = track.size
    let uploadedSize = 0

    const downloadStream = await slsk.downloadStream({
      file: track
    })

    const throttledOnProgress = _.throttle(() => {
      const progress = (uploadedSize / totalSize * 100).toFixed(2)
      onProgress(progress)
    }, PROGRESS_INTERVAL)

    downloadStream.on('data', (chunk) => {
      const { length: chunkLength } = chunk
      uploadedSize += chunkLength
      throttledOnProgress()
      writeStream.write(chunk)
    })

    downloadStream.on('error', (error) => {
      reject(error)
    })

    downloadStream.on('end', () => {
      writeStream.end()

      resolve({
        downloadPath
      })
    })
  })
}

createSendAndWait(Channel.DOWNLOAD, async (event, track) => {
  const downloadsDir = settings.getDownloadsDir()
  const downloadPath = path.resolve(downloadsDir, `${track.fileName}.${track.fileExtension}`)

  const handleProgress = progress => {
    settings.updateDownloadHistoryEntry(track.id, {
      progress: String(progress)
    })

    event.reply(Channel.DOWNLOAD_PROGRESS, {
      track,
      progress
    })
  }

  try {
    settings.addToDownloadHistory({
      track,
      downloadPath,
      isDownloading: true,
      isDownloaded: false,
      hasError: false
    })

    const downloadRes = await downloadTrack({
      downloadPath,
      track,
      onProgress: handleProgress
    })

    settings.updateDownloadHistoryEntry(track.file, {
      isDownloaded: true
    })

    event.reply(Channel.DOWNLOAD_COMPLETE, {
      track,
      ...downloadRes
    })

    return downloadRes
  } catch (error) {
    const errorMessage = getErrorMessage(error)

    settings.updateDownloadHistoryEntry(track.file, {
      isDownloading: false,
      isDownloaded: false,
      hasError: true,
      errorMessage
    })

    event.reply(Channel.DOWNLOAD_ERROR, {
      track,
      errorMessage
    })

    throw error
  }
})
