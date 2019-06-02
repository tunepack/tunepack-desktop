import { app, Menu } from 'electron'
import { initMainWindow } from './utils/mainWindow'
import { ensureDefaultDownloadsFolder } from './utils/downloadsFolder'
import * as slskUtils from './utils/slsk'
import { start as startDownloadsFolderWatcher } from './utils/downloadsFolderWatcher'
import { getMenuTemplate } from './utils/menu'
import * as state from './utils/state'
import * as config from 'shared/config'

const menu = Menu.buildFromTemplate(getMenuTemplate())
Menu.setApplicationMenu(menu)

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || config.DEBUG_PROD) {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!config.UPGRADE_EXTENSIONS
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
    'REACT_PERF'
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
  if (state.getState().isQuitting) {
    return
  }

  state.setState({
    isQuitting: true
  })

  e.preventDefault()

  state.destroyActiveStreams()
  slskUtils.disconnect()

  setTimeout(() => {
    app.quit()
  }, 500)
})

app.on('ready', async () => {
  await ensureDefaultDownloadsFolder()
  startDownloadsFolderWatcher()

  if (process.env.NODE_ENV === 'development' || config.DEBUG_PROD) {
    await installExtensions()
  }

  initMainWindow()
})
