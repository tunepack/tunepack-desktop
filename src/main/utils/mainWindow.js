const path = require('path')
const { BrowserWindow } = require('electron')
const windowStateManager = require('electron-window-state')
const config = require('../config')

let mainWindow = null

const isProd = process.env.NODE_ENV === 'production'

const initMainWindow = () => {
  const mainWindowState = windowStateManager()

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: parseInt(config.stylingVariables.WINDOW_WIDTH),
    height: parseInt(config.stylingVariables.WINDOW_HEIGHT),
    resizable: false,
    title: 'Tunepack',
    maximizable: false,
    titleBarStyle: 'hiddenInset',
    icon: path.resolve(__dirname, '../../../resources/icon.icns'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  isProd && mainWindow.setMenu(null)

  mainWindowState.manage(mainWindow)

  const port = process.env.PORT || 1212
  const url = isProd ? `file://${__dirname}/index.html` : `http://localhost:${port}/index.html`

  mainWindow.loadURL(url)

  // Setup handlers
  require('../handlers')

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    if (process.env.START_MINIMIZED === 'true') {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

module.exports = {
  mainWindow,
  initMainWindow
}
