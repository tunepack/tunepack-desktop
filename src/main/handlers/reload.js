const Channel = require('../constants/Channel')
const { createSendAndWait } = require('../utils/handlers')
const { getMainWindow } = require('../utils/mainWindow')

createSendAndWait(Channel.RELOAD, async () => {
  const mainWindow = getMainWindow()
  mainWindow.reload()

  return true
})
