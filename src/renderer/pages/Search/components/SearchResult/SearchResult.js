import React from 'react'
import styles from './SearchResult.scss'
import searchResultsUtils from 'utils/searchResults'
import MetaPill from 'components/MetaPill/MetaPill'
import Button from 'components/Button/Button'
import { shell } from 'electron'

import Icon from 'components/Icon/Icon'
import DownloadCloud from 'icons/DownloadCloud.svg'

export default class SearchResult extends React.PureComponent {
  get controls () {
    const {
      download,
      onDownloadClick
    } = this.props

    let {
      isDownloading,
      isDownloaded,
      progress
    } = download

    if (isDownloaded) {
      return (
        <Button
          onClick={() => {
            shell.openItem(download.downloadPath)
          }}
          variant='minimal'>
          Open
        </Button>
      )
    }

    if (isDownloading) {
      return (
        <div className={styles.progress}>
          <div
            style={{
              width: `${progress}%`
            }}
            className={styles.progressIndicator} />
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
            glyph={DownloadCloud} />
        )}>
        download
      </Button>
    )
  }

  render () {
    const { track } = this.props

    const fileName = searchResultsUtils.getFileName(track)
    const fileExtension = searchResultsUtils.getFileExtension(track)
    const bitrate = searchResultsUtils.getBitrate(track)
    const folderName = searchResultsUtils.getFolderName(track)
    const fileSize = searchResultsUtils.getFileSize(track)
    const fileExtensionLabel = fileExtension === 'mp3'
      ? `${fileExtension} - ${bitrate}kbps` : fileExtension

    return (
      <div className={styles.component}>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoPrimary}>
              <div className={styles.fileName}>
                {fileName}
              </div>
              <div className={styles.folderName}>
                {folderName}
              </div>
              <div className={styles.metaData}>
                <MetaPill>
                  {fileExtensionLabel}
                </MetaPill>
                <MetaPill>
                  {fileSize}
                </MetaPill>
              </div>
            </div>
            <div className={styles.controls}>
              {this.controls}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
