import { Notification, shell } from 'electron'
import createDebug from 'debug'

const debug = createDebug('tunepack:notifications')

export const showDownloadedNotification = ({
  track,
  downloadPath
}) => {
  const notification = new Notification({
    title: 'Download complete',
    body: track.fileName,
    silent: true
  })

  notification.on('click', () => {
    shell.openItem(downloadPath)
  })

  debug('Showing download complete notification')

  notification.show()
}
