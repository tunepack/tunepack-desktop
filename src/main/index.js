const { app, Menu } = require('electron')
const { initMainWindow } = require('./utils/mainWindow')
const { ensureDefaultDownloadsFolder } = require('./utils/downloadsFolder')
const slsk = require('./utils/slsk')
const downloadsFolderWatcher = require('./utils/downloadsFolderWatcher')
// const debug = require('debug')('tunepack:main')
const menuUtils = require('./utils/menu')

const menu = Menu.buildFromTemplate(menuUtils.getMenuTemplate())
Menu.setApplicationMenu(menu)

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
  app.quit()
})

app.on('before-quit', e => {
  if (app.isQuitting) return

  app.isQuitting = true
  e.preventDefault()

  slsk.disconnect()

  setTimeout(() => {
    app.quit()
  }, 500) // quit after 4 secs, at most
})

app.on('ready', async () => {
  await ensureDefaultDownloadsFolder()
  downloadsFolderWatcher.start()

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }

  initMainWindow()
})
