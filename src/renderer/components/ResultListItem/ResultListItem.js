import React from 'react'
import styles from './ResultListItem.scss'
import Badge from 'components/Badge/Badge'
import SearchResultControls from '../ResultListItemControls/ResultListItemControls'
import { connect } from 'react-redux'
import { getDownloadByTrackId } from 'selectors/downloads'
import cx from 'classnames'
import FileExtensionBadge from './FileExtensionBadge/FileExtensionBadge'

const ResultListItem = React.memo(({
  track,
  index,
  download,
  onDownloadClick,
  style,
  isDownloadsPage
}) => {
  const handleDownloadClick = () => {
    onDownloadClick(track)
  }

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
              <FileExtensionBadge
                track={track}
                className={styles.badgeFileExtension}
              />
              <Badge>
                {track.get('fileSize')}
              </Badge>
            </div>
          </div>
          <div className={styles.controls}>
            <SearchResultControls
              isDownloadsPage={isDownloadsPage}
              onDownloadClick={handleDownloadClick}
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
