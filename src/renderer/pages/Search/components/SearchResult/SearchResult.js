import React from 'react'
import styles from './SearchResult.scss'
import MetaPill from 'components/MetaPill/MetaPill'
import SearchResultControls from '../SearchResultControls/SearchResultControls'
import { connect } from 'react-redux'
import { getDownloadByTrackId } from 'selectors/downloads'

const SearchResult = ({
  track,
  download,
  onDownloadClick
}) => {
  const fileExtension = track.get('fileExtension')
  const fileExtensionLabel = fileExtension === 'mp3'
    ? `${fileExtension} - ${track.get('bitrate')}kbps` : fileExtension

  return (
    <div className={styles.component}>
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
              <MetaPill>
                {fileExtensionLabel}
              </MetaPill>
              <MetaPill>
                {track.get('fileSize')}
              </MetaPill>
            </div>
          </div>
          <div className={styles.controls}>
            <SearchResultControls
              onDownloadClick={() => { return onDownloadClick(track) }}
              download={download} />
          </div>
        </div>
      </div>
    </div>
  )
}

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
)(SearchResult)
