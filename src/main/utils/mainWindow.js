const path = require('path')
const { BrowserWindow } = require('electron')
const windowStateManager = require('electron-window-state')
const config = require('../../shared/config')
const requireDir = require('require-dir')

let _mainWindow = null

const isProd = process.env.NODE_ENV === 'production'

const getMainWindow = () => {
  return _mainWindow
}

const initMainWindow = () => {
  const mainWindowState = windowStateManager()

  _mainWindow = new BrowserWindow({
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
      nodeIntegration: true,
      devTools: process.env.NODE_ENV !== 'production'
    }
  })

  isProd && _mainWindow.setMenu(null)

  mainWindowState.manage(_mainWindow)

  const port = process.env.PORT || 1212
  const url = isProd ? `file://${__dirname}/index.html` : `http://localhost:${port}/index.html`

  _mainWindow.loadURL(url)

  // Setup handlers
  requireDir('../handlers')

  _mainWindow.once('ready-to-show', () => {
    if (!_mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    if (process.env.START_MINIMIZED === 'true') {
      _mainWindow.minimize()
    } else {
      _mainWindow.show()
      _mainWindow.focus()
    }
  })

  _mainWindow.on('closed', () => {
    _mainWindow = null
  })
}

module.exports = {
  getMainWindow,
  initMainWindow
}
