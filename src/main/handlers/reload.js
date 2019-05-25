const { BrowserWindow } = require('electron')
const Channel = require('../constants/Channel')
const { createSendAndWait } = require('../utils/handlers')

createSendAndWait(Channel.RELOAD, async () => {
  BrowserWindow
    .getFocusedWindow()
    .reload()

  return true
})
