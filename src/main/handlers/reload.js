import * as Channel from 'shared/constants/Channel'
import { createSendAndWait } from '../utils/handlers'
import { getMainWindow } from '../utils/mainWindow'

createSendAndWait(Channel.RELOAD, async () => {
  const mainWindow = getMainWindow()
  mainWindow.webContents.reloadIgnoringCache()

  return true
})
