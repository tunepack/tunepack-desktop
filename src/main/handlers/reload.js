const Channel = require('shared/constants/Channel')
const { createSendAndWait } = require('../utils/handlers')
const { getMainWindow } = require('../utils/mainWindow')

createSendAndWait(Channel.RELOAD, async () => {
  const mainWindow = getMainWindow()
  mainWindow.webContents.reloadIgnoringCache()

  return true
})
