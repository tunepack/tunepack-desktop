import React from 'react'
import Button from 'components/Button/Button'
import { shell } from 'electron'
import styles from '../ResultListItem/ResultListItem.scss'
import Icon from 'components/Icon/Icon'
import DownloadCloud from 'icons/DownloadCloudAlt.svg'
import prettyBytes from 'pretty-bytes/index'

export default React.memo(({
  onDownloadClick,
  download
}) => {
  const handleOpenClick = event => {
    event.preventDefault()
    event.stopPropagation()

    shell.openItem(download.get('downloadPath'))
  }

  if (download?.get('isDownloaded')) {
    return (
      <Button
        onClick={handleOpenClick}
        variant='minimal'
      >
        Open
      </Button>
    )
  }

  if (download?.get('isDownloading')) {
    const avgSpeed = download.get('avgSpeed')

    return (
      <div className={styles.downloading}>
        <div className={styles.progress}>
          <div
            style={{
              width: `${download.get('progress')}%`
            }}
            className={styles.progressIndicator}
          />
        </div>
        {avgSpeed ? (
          <div className={styles.speed}>
            {prettyBytes(avgSpeed)}/s
          </div>
        ) : (
          <div className={styles.speed}>
            starting...
          </div>
        )}
      </div>
    )
  }

  return (
    <Button
      variant='minimal'
      onClick={onDownloadClick}
      iconTop={(
        <Icon
          className={styles.btnDownloadIconTop}
          glyph={DownloadCloud}
        />
      )}
    >
      download
    </Button>
  )
})
