const { createSendAndWait } = require('../utils/handlers')
const Channel = require('../constants/Channel')
const slsk = require('../utils/slsk')
const settings = require('../utils/settings')
const Timeout = require('await-timeout')
const debug = require('debug')('tunepack:initialize')
const fsUtils = require('../utils/fs')
const getLatestRelease = require('../utils/getLatestRelease')
const config = require('../../shared/config')
const semver = require('semver')

const TIMEOUT = 3000

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
        await fsUtils.unlink(downloadPath)
      } catch (e) {
        debug(`Could not remove old download at: ${downloadPath}, still removing it from downloadsHistory`)
      }

      cleanDownloadHistory.splice(k, 1)
      continue
    }

    const downloadPath = cleanDownloadHistory[k].downloadPath

    const doesDownloadFileExist = await fsUtils.getDoesFileExist(downloadPath)

    if (!doesDownloadFileExist) {
      debug(`Found ${downloadPath} in downloadHistory, but the file did not exist so it was probably removed, cleaning this up.`)
      cleanDownloadHistory.splice(k, 1)
    }
  }

  return cleanDownloadHistory
}

const checkForUpdates = async () => {
  try {
    const latestReleaseInfo = await getLatestRelease({
      owner: config.REPO_OWNER,
      repo: config.REPO_NAME
    })

    const currentVersion = config.APP_VERSION
    const latestVersion = latestReleaseInfo.name

    const hasNewRelease = semver.gt(latestVersion, currentVersion)

    if (hasNewRelease) {
      debug(`Found a new release: ${latestVersion}, current release is: ${currentVersion}`)
    } else {
      debug(`This is the latest version of ${config.APP_NAME}`)
    }

    return {
      latestReleaseInfo,
      hasNewRelease
    }
  } catch (e) {
    return null
  }
}

createSendAndWait(Channel.INITIALIZE, async () => {
  const timer = new Timeout()

  const downloadHistory = settings.getDownloadHistory()
  settings.setDownloadHistory(await getCleanDownloadHistory(downloadHistory))

  const username = settings.getSoulseekUsername()
  const password = settings.getSoulseekPassword()

  const updateInfo = await checkForUpdates()

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
    ...updateInfo,
    settings: rendererSettings
  }
})
