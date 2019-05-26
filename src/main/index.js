const { app } = require('electron')
const { initMainWindow } = require('./utils/mainWindow')
const { ensureDefaultDownloadsFolder } = require('./utils/downloadsFolder')
const slsk = require('./utils/slsk')
const downloadsFolderWatcher = require('./utils/downloadsFolderWatcher')
const debug = require('debug')('tunepack:main')

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ]

  return Promise.all(
    extensions.map(name => {
      return installer.default(installer[name], forceDownload)
    })
  ).catch(console.log) // eslint-disable-line no-console
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', e => {
  if (app.isQuitting) return

  app.isQuitting = true
  e.preventDefault()

  slsk.disconnect()

  setTimeout(() => {
    debug('Saving state took too long. Quitting.')
    app.quit()
  }, 4000) // quit after 4 secs, at most
})

app.on('ready', async () => {
  await ensureDefaultDownloadsFolder()
  downloadsFolderWatcher.start()

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }

  initMainWindow()
})
