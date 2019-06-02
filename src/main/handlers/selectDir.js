import { dialog } from 'electron'
import * as Channel from 'shared/constants/Channel'
import { createSendAndWait } from '../utils/handlers'
import { getMainWindow } from '../utils/mainWindow'

createSendAndWait(Channel.SELECT_DIR, async (event, args) => {
  const mainWindow = getMainWindow()

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
