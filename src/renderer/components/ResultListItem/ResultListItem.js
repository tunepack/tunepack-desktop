import React from 'react'
import styles from './ResultListItem.scss'
import Badge from 'components/Badge/Badge'
import SearchResultControls from '../ResultListItemControls/ResultListItemControls'
import { connect } from 'react-redux'
import { getDownloadByTrackId } from 'selectors/downloads'
import cx from 'classnames'
import FileExtensionBadge from './FileExtensionBadge/FileExtensionBadge'
import {
  getIsBurning,
  getSelectedForBurning
} from '../../selectors/settings'
import { Checkbox } from 'components/FormFields'
import { toggleDownloadSelectBurning } from 'actions/settings'

const ResultListItem = React.memo(({
  track,
  index,
  download,
  onDownloadClick,
  style,
  isDownloadsPage,
  isBurning,
  toggleDownloadSelectBurning,
  selectedForBurning
}) => {
  const isSelectedForBurning = selectedForBurning.includes(track.get('id'))

  const handleDownloadClick = () => {
    onDownloadClick(track)
  }

  const handleSelectForBurningChange = (value) => {
    toggleDownloadSelectBurning(track.get('id'), value)
  }

  const handleSelectClick = () => {
    const isDownloaded = download?.get('isDownloaded')
    const shouldShowBurnSelect = isDownloadsPage && isDownloaded && isBurning

    if (shouldShowBurnSelect) {
      toggleDownloadSelectBurning(track.get('id'), !isSelectedForBurning)
    }
  }

  const isDownloaded = download?.get('isDownloaded')
  const shouldShowBurnSelect = isDownloadsPage && isDownloaded && isBurning

  return (
    <div
      style={style}
      className={cx(styles.component, {
        [styles.isOdd]: index % 2,
        [styles.isSelectable]: shouldShowBurnSelect
      })}
    >
      <div
        onClick={handleSelectClick}
        className={styles.content}
      >
        {shouldShowBurnSelect && (
          <div
            onClick={handleSelectClick}
            className={styles.select}
          >
            <Checkbox
              form={{
                setFieldValue: handleSelectForBurningChange
              }}
              field={{
                name: 'isSelected',
                value: isSelectedForBurning
              }}
            />
          </div>
        )}
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
    isBurning: getIsBurning(state),
    download: getDownloadByTrackId(trackId)(state),
    selectedForBurning: getSelectedForBurning(state)
  }
}

const mapActionsToProps = {
  toggleDownloadSelectBurning
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ResultListItem)
