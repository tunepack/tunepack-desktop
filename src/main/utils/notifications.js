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

const getCountLabel = trackCount => `${trackCount} ${trackCount > 1 ? 'tunes' : 'tune'}`

export const showCopiedNotification = ({
  trackCount,
  driveName,
  drivePath
}) => {
  const countLabel = getCountLabel(trackCount)

  const notification = new Notification({
    title: 'Finished copying to USB',
    body: `Copied ${countLabel} to ${driveName}`,
    silent: true
  })

  notification.on('click', () => {
    shell.openItem(drivePath)
  })

  debug('Showing download complete notification')

  notification.show()
}
