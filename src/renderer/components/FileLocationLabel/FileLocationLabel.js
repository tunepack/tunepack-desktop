import React from 'react'
import styles from './FileLocationLabel.scss'

const FileLocationLabel = ({
  fileLocation,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={styles.component}>
      {fileLocation}
    </div>
  )
}

export default FileLocationLabel
