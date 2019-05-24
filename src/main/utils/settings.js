const Store = require('electron-store')
const slskUtils = require('./slsk')
const { defaultDownloadsFolder } = require('./downloadsFolder')
const AudioFileExtension = require('../constants/AudioFileExtension')
const moment = require('moment-timezone')

moment.tz.setDefault('UTC')

const schema = {
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
      type: 'object',
      properties: {
        createdAt: {
          type: 'string'
        },
        downloadPath: {
          type: 'string'
        },
        progress: {
          type: 'string'
        },
        isDownloading: {
          type: 'boolean'
        },
        isDownloaded: {
          type: 'boolean'
        },
        hasError: {
          type: 'boolean'
        },
        errorMessage: {
          type: 'string'
        },
        track: {
          type: 'object',
          properties: {
            file: {
              type: 'string'
            },
            size: {
              type: 'number'
            },
            speed: {
              type: 'number'
            },
            user: {
              type: 'string'
            }
          }
        }
      }
    }
  }
}

const config = new Store({
  schema
})

const getRendererSettings = () => {
  const downloadsDir = config.get('downloadsDir')
  const searchFileExtensions = config.get('searchFileExtensions')
  const searchHasOnlyHighBitrate = config.get('searchHasOnlyHighBitrate')
  const searchDuration = config.get('searchDuration')
  const downloadHistory = config.get('downloadHistory')

  return {
    downloadsDir,
    searchFileExtensions,
    searchHasOnlyHighBitrate,
    searchDuration,
    downloadHistory
  }
}

const setRendererSettings = ({
  downloadsDir,
  searchFileExtensions,
  searchHasOnlyHighBitrate,
  searchDuration
}) => {
  config.set({
    downloadsDir,
    searchFileExtensions,
    searchHasOnlyHighBitrate,
    searchDuration
  })

  return getRendererSettings()
}

const getSearchDuration = () => {
  return config.get('searchDuration')
}

const setDownloadsDir = (downloadsDir) => {
  return config.set('downloadsDir', downloadsDir)
}

const getDownloadsDir = () => {
  return config.get('downloadsDir')
}

const getSoulseekUsername = (soulseekUsername) => {
  return config.get('soulseekUsername', soulseekUsername)
}

const getSoulseekPassword = (soulseekPassword) => {
  return config.get('soulseekPassword', soulseekPassword)
}

const getDownloadHistory = () => {
  return config.get('downloadHistory')
}

const clear = () => {
  return config.clear()
}

const addToDownloadHistory = ({
  track,
  downloadPath,
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
      isDownloading,
      isDownloaded,
      hasError
    }
  ]

  config.set('downloadHistory', newDownloadHistory)
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

  config.set('downloadHistory', newDownloadHistory)
  return newDownloadHistory
}

module.exports = {
  getRendererSettings,
  setRendererSettings,
  getDownloadsDir,
  setDownloadsDir,
  getSoulseekUsername,
  getSoulseekPassword,
  addToDownloadHistory,
  updateDownloadHistoryEntry,
  clear,
  getSearchDuration
}
