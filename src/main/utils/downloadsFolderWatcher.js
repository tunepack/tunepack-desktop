const chokidar = require('chokidar')
const debug = require('debug')('tunepack:downloadsFolderWatcher')
const { getDownloadsDir, getDownloadHistory, setDownloadHistory, getRendererSettings } = require('./settings')
const Channel = require('../constants/Channel')
const { getMainWindow } = require('../utils/mainWindow')

const handleFileRemove = path => {
  debug(`File in downloadsFolder got removed at: ${path}`)

  const downloadHistory = getDownloadHistory()

  const cleanDownloadHistory = [
    ...downloadHistory
  ]
    .filter(d => d.downloadPath !== path)

  setDownloadHistory(cleanDownloadHistory)

  const rendererSettings = getRendererSettings()
  const mainWindow = getMainWindow()

  mainWindow.send(Channel.UPDATE_SETTINGS, rendererSettings)
}

const start = () => {
  const downloadsDir = getDownloadsDir()
  const glob = `${downloadsDir}/**/*.*`

  debug(`Starting to watch downloads folder at: ${glob}`)

  const watcher = chokidar.watch(glob)

  watcher
    .on('unlink', handleFileRemove)

  return true
}

module.exports = {
  start
}
