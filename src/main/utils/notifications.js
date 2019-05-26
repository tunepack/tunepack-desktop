const { Notification, shell } = require('electron')
const debug = require('debug')('tunepack:notifications')

const showDownloadedNotification = ({
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

module.exports = {
  showDownloadedNotification
}
