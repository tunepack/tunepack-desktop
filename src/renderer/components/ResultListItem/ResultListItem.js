import React from 'react'
import styles from './ResultListItem.scss'
import Badge from 'components/Badge/Badge'
import SearchResultControls from '../ResultListItemControls/ResultListItemControls'
import { connect } from 'react-redux'
import { getDownloadByTrackId } from 'selectors/downloads'
import cx from 'classnames'

const ResultListItem = React.memo(({
  track,
  index,
  download,
  onDownloadClick,
  style,
  isDownloadsPage
}) => {
  const fileExtension = track.get('fileExtension')
  const fileExtensionLabel = fileExtension === 'mp3'
    ? `${fileExtension} - ${track.get('bitrate')}kbps` : fileExtension

  return (
    <div
      style={style}
      className={cx(styles.component, {
        [styles.isOdd]: index % 2
      })}
    >
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoPrimary}>
            <div className={styles.fileName}>
              {track.get('fileName')}
            </div>
            <div className={styles.folderName}>
              {track.get('folderName')}
            </div>
            <div className={styles.metaData}>
              <Badge className={styles.badgeFileExtension}>
                <div
                  className={cx(styles.fileExtension, {
                    [styles[fileExtension]]: fileExtension
                  })}
                >
                  {fileExtensionLabel}
                </div>
              </Badge>
              <Badge>
                {track.get('fileSize')}
              </Badge>
            </div>
          </div>
          <div className={styles.controls}>
            <SearchResultControls
              isDownloadsPage={isDownloadsPage}
              onDownloadClick={() => { return onDownloadClick(track) }}
              download={download}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

const mapStateToProps = (state, ownProps) => {
  const trackId = ownProps.track.get('id')

  return {
    download: getDownloadByTrackId(trackId)(state)
  }
}

const mapActionsToProps = null

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ResultListItem)
