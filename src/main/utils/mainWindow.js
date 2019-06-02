import path from 'path'
import { BrowserWindow } from 'electron'
import windowStateManager from 'electron-window-state'
import injectedStylingVars from 'shared/injectedStylingVars'
import * as config from 'shared/config'

let _mainWindow = null

const isProd = process.env.NODE_ENV === 'production'

export const getMainWindow = () => {
  return _mainWindow
}

export const initMainWindow = () => {
  const mainWindowState = windowStateManager()

  _mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: parseInt(injectedStylingVars.WINDOW_WIDTH),
    height: parseInt(injectedStylingVars.WINDOW_HEIGHT),
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
  require('../handlers')

  _mainWindow.once('ready-to-show', () => {
    if (!_mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    if (config.START_MINIMIZED === 'true') {
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
