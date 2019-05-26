const { createSendAndWait } = require('../utils/handlers')
const Channel = require('../constants/Channel')
const slsk = require('../utils/slsk')
const settings = require('../utils/settings')
const fs = require('fs')
const { promisify } = require('util')
const Timeout = require('await-timeout')
const debug = require('debug')('tunepack:initialize')

const TIMEOUT = 3000

const unlink = promisify(fs.unlink)
const stat = promisify(fs.stat)

const getDoesFileExist = async path => {
  try {
    await stat(path)
    return true
  } catch (e) {
    return false
  }
}

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
      continue
    }

    const downloadPath = cleanDownloadHistory[k].downloadPath

    const doesDownloadFileExist = await getDoesFileExist(downloadPath)

    if (!doesDownloadFileExist) {
      debug(`Found ${downloadPath} in downloadHistory, but the file did not exist so it was probably removed, cleaning this up.`)
      cleanDownloadHistory.splice(k, 1)
    }
  }

  return cleanDownloadHistory
}

createSendAndWait(Channel.INITIALIZE, async () => {
  const timer = new Timeout()

  const downloadHistory = settings.getDownloadHistory()
  settings.setDownloadHistory(await getCleanDownloadHistory(downloadHistory))

  const username = settings.getSoulseekUsername()
  const password = settings.getSoulseekPassword()

  try {
    await Promise.race([
      slsk.connect({
        username,
        password,
        timeout: TIMEOUT
      }),
      timer.set(TIMEOUT)
        .then(() => Promise.reject(new Error('timeout')))
    ])
  } catch (e) {
    if (e.message === 'timeout') {
      throw e
    }

    const isNoConnectionError = e.message.includes('ENOTFOUND')

    if (isNoConnectionError) {
      throw new Error('no-connection')
    }

    const isTimeoutError = e.message.includes('timeout')

    if (isTimeoutError) {
      throw new Error('timeout')
    }

    throw e
  } finally {
    timer.clear()
  }

  const rendererSettings = settings.getRendererSettings()

  return {
    settings: rendererSettings
  }
})
