const { dialog } = require('electron')
const Channel = require('../constants/Channel')
const { mainWindow } = require('../utils/mainWindow')
const { createSendAndWait } = require('../utils/handlers')

createSendAndWait(Channel.SELECT_DIR, async (event, args) => {
  const selectedDir = dialog.showOpenDialog(mainWindow, {
    defaultPath: args.defaultPath || undefined,
    properties: args.properties || ['openDirectory']
  })

  if (!selectedDir) {
    return {
      result: null
    }
  }

  return {
    result: selectedDir[0]
  }
})
