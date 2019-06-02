import * as Channel from 'shared/constants/Channel'
import { createSendAndWait } from '../utils/handlers'
import { getMainWindow } from '../utils/mainWindow'
import * as slsk from '../utils/slsk'
import * as settings from '../utils/settings'

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
