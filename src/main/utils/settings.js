const Store = require('electron-store')
const slskUtils = require('./slsk')
const { defaultDownloadsFolder } = require('./downloadsFolder')
const AudioFileExtension = require('../constants/AudioFileExtension')
const moment = require('moment-timezone')
const config = require('../../config')
const debug = require('debug')('tunepack:settings')
const uuid = require('uuid/v1')

moment.tz.setDefault('UTC')

// permaSettings are encrypted and never get cleared
const permaSettings = new Store({
  cwd: 'perma',
  encryptionKey: 'snuffelposk323',
  schema: {
    uid: {
      type: 'string',
      default: uuid()
    }
  }
})

const getUid = () => {
  return permaSettings.get('uid')
}

const settings = new Store({
  schema: {
    lastVersion: {
      type: 'string'
    },
    soulseekUsername: {
      type: 'string',
      default: slskUtils.generateUsername()
    },
    soulseekPassword: {
      type: 'string',
      default: slskUtils.generatePassword()
    },
    downloadsDir: {
      type: 'string',
      default: defaultDownloadsFolder
    },
    searchDuration: {
      type: 'number',
      default: 10000
    },
    searchFileExtensions: {
      type: 'array',
      items: {
        type: 'string',
        enum: Object.values(AudioFileExtension)
      },
      default: [
        AudioFileExtension.MP3,
        AudioFileExtension.WAV,
        AudioFileExtension.FLAC
      ]
    },
    searchHasOnlyHighBitrate: {
      type: 'boolean',
      default: true
    },
    downloadHistory: {
      default: [],
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
})

const clear = (initialSettings) => {
  debug(`Clearing settings`)
  settings.clear()

  if (initialSettings) {
    settings.set(initialSettings)
  }
}

if (process.env.FRESH === 'true') {
  clear()
}

const lastVersion = settings.get('lastVersion')

if (lastVersion === undefined) {
  debug(`No last version in settings found`)
  clear()
  settings.set('lastVersion', config.APP_VERSION)
} else if (lastVersion !== config.APP_VERSION) {
  const soulseekUsername = settings.get('soulseekUsername')
  const soulseekPassword = settings.get('soulseekPassword')

  debug(`Old version ${lastVersion} found, current version is: ${config.APP_VERSION}`)
  clear({
    soulseekUsername,
    soulseekPassword
  })
}

debug(`Settings loaded`, settings.get())

const getRendererSettings = () => {
  const downloadsDir = settings.get('downloadsDir')
  const searchFileExtensions = settings.get('searchFileExtensions')
  const searchHasOnlyHighBitrate = settings.get('searchHasOnlyHighBitrate')
  const searchDuration = settings.get('searchDuration')
  const downloadHistory = settings.get('downloadHistory')
  const uid = getUid()

  return {
    downloadsDir,
    searchFileExtensions,
    searchHasOnlyHighBitrate,
    searchDuration,
    downloadHistory,
    uid
  }
}

const setRendererSettings = ({
  downloadsDir,
  searchFileExtensions,
  searchHasOnlyHighBitrate,
  searchDuration
}) => {
  settings.set({
    downloadsDir,
    searchFileExtensions,
    searchHasOnlyHighBitrate,
    searchDuration
  })

  return getRendererSettings()
}

const getSearchDuration = () => {
  return settings.get('searchDuration')
}

const setDownloadsDir = (downloadsDir) => {
  return settings.set('downloadsDir', downloadsDir)
}

const getDownloadsDir = () => {
  return settings.get('downloadsDir')
}

const getSoulseekUsername = (soulseekUsername) => {
  return settings.get('soulseekUsername', soulseekUsername)
}

const getSoulseekPassword = (soulseekPassword) => {
  return settings.get('soulseekPassword', soulseekPassword)
}

const getDownloadHistory = () => {
  return settings.get('downloadHistory')
}

const setDownloadHistory = (downloadHistory) => {
  return settings.set('downloadHistory', downloadHistory)
}

const addToDownloadHistory = ({
  track,
  downloadPath,
  tmpPath,
  isDownloading,
  isDownloaded,
  hasError
}) => {
  const downloadHistory = getDownloadHistory()

  // Maybe check that we can't add it twice?

  const newDownloadHistory = [
    ...downloadHistory,
    {
      createdAt: moment.utc().format(),
      track,
      downloadPath,
      tmpPath,
      isDownloading,
      isDownloaded,
      hasError
    }
  ]

  settings.set('downloadHistory', newDownloadHistory)
  return newDownloadHistory
}

const updateDownloadHistoryEntry = (id, updateFields) => {
  const downloadHistory = getDownloadHistory()

  const newDownloadHistory = downloadHistory.map(i => {
    return i.track.id === id ? {
      ...i,
      ...updateFields
    } : i
  })

  settings.set('downloadHistory', newDownloadHistory)
  return newDownloadHistory
}

module.exports = {
  getDownloadHistory,
  getRendererSettings,
  setRendererSettings,
  getDownloadsDir,
  setDownloadsDir,
  setDownloadHistory,
  getSoulseekUsername,
  getSoulseekPassword,
  addToDownloadHistory,
  updateDownloadHistoryEntry,
  clear,
  getSearchDuration
}
