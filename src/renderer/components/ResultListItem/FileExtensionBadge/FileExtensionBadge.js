import React from 'react'
import Badge from 'components/Badge/Badge'
import styles from './FileExtensionBadge.scss'
import cx from 'classnames'
import * as AudioFileExtension from 'constants/AudioFileExtension'

const getFileExtensionLabel = (track) => {
  const fileExtension = track.get('fileExtension')

  switch (fileExtension) {
    case AudioFileExtension.MP3:
      return `mp3 - ${track.get('bitrate')}kbps`
    case AudioFileExtension.WAV:
    case AudioFileExtension.FLAC: {
      const bitDepth = track.getIn(['attributes', '5'])
      const sampleRate = track.getIn(['attributes', '4'])

      if (bitDepth && sampleRate) {
        return `${fileExtension} - ${String(sampleRate).substring(0, 2)} khz - ${bitDepth} bit`
      }

      return fileExtension
    }
  }
}

const FileExtensionBadge = ({
  track,
  className
}) => {
  const fileExtension = track.get('fileExtension')

  return (
    <Badge
      className={cx(styles.component, {
        [className]: className,
        [styles[fileExtension]]: fileExtension
      })}
    >
      {getFileExtensionLabel(track)}
    </Badge>
  )
}

export default FileExtensionBadge
