const { createSendAndWait } = require('../utils/handlers')
const Channel = require('../constants/Channel')
const slsk = require('../utils/slsk')
const settings = require('../utils/settings')
const fs = require('fs')
const { promisify } = require('util')
const debug = require('debug')('tunepack:initialize')

const unlink = promisify(fs.unlink)

const getCleanDownloadHistory = async downloadHistory => {
  const cleanDownloadHistory = [
    ...downloadHistory
  ]

  debug(`Cleaning up old downloads`)

  for (const k in cleanDownloadHistory) {
    if (!cleanDownloadHistory.hasOwnProperty(k)) {
      continue
    }

    // When a download in cleanDownloadHistory doesn't have the isDownloading prop, it's invalid, so remove it anyway
    if (cleanDownloadHistory[k].isDownloading) {
      cleanDownloadHistory.splice(k, 1)
      continue
    }

    if (cleanDownloadHistory[k].isDownloading) {
      const { downloadPath } = cleanDownloadHistory[k]
      debug(`Removing old download at: ${downloadPath}`)

      try {
        await unlink(downloadPath)
      } catch (e) {
        debug(`Could not remove old download at: ${downloadPath}, still removing it from downloadsHistory`)
      }

      cleanDownloadHistory.splice(k, 1)
    }
  }

  return cleanDownloadHistory
}

createSendAndWait(Channel.INITIALIZE, async () => {
  const downloadHistory = settings.getDownloadHistory()
  settings.setDownloadHistory(await getCleanDownloadHistory(downloadHistory))

  const username = settings.getSoulseekUsername()
  const password = settings.getSoulseekPassword()

  try {
    await slsk.connect({
      username,
      password,
      timeout: 10000
    })
  } catch (e) {
    const isNoConnectionError = e.message.includes('ENOTFOUND')

    if (isNoConnectionError) {
      throw new Error('no-connection')
    }

    const isTimeoutError = e.message.includes('timeout')

    if (isTimeoutError) {
      throw new Error('timeout')
    }

    throw e
  }

  const rendererSettings = settings.getRendererSettings()

  return {
    settings: rendererSettings
  }
})
