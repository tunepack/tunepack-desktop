import chokidar from 'chokidar'
import createDebug from 'debug'
import * as Channel from 'shared/constants/Channel'
import * as settings from './settings'
import { getMainWindow } from './mainWindow'

const debug = createDebug('tunepack:downloadsFolderWatcher')

const handleFileRemove = path => {
  debug(`File in downloadsFolder got removed at: ${path}`)

  const downloadHistory = settings.getDownloadHistory()

  const cleanDownloadHistory = [
    ...downloadHistory
  ]
    .filter(d => d.downloadPath !== path)

  settings.setDownloadHistory(cleanDownloadHistory)

  const rendererSettings = settings.getRendererSettings()
  const mainWindow = getMainWindow()

  mainWindow.send(Channel.UPDATE_SETTINGS, rendererSettings)
}

export const start = () => {
  const downloadsDir = settings.getDownloadsDir()
  const glob = `${downloadsDir}/**/*.*`

  debug(`Starting to watch downloads folder at: ${glob}`)

  const watcher = chokidar.watch(glob)

  watcher
    .on('unlink', handleFileRemove)

  return true
}
