const Channel = require('../constants/Channel')
const { createSendAndWait } = require('../utils/handlers')
const { getMainWindow } = require('../utils/mainWindow')
const settings = require('../utils/settings')
const slsk = require('../utils/slsk')

const wait = duration => new Promise((resolve) => {
  setTimeout(resolve, duration)
})

createSendAndWait(Channel.RESET, async () => {
  slsk.disconnect()

  await wait(1000)

  settings.clear()
  const mainWindow = getMainWindow()
  mainWindow.webContents.reloadIgnoringCache()

  return true
})
