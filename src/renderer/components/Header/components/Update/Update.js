import path from 'path'
import React, { useState, useEffect } from 'react'
import styles from './Update.scss'
import cx from 'classnames'
import { os } from 'utils/browser'
import Markdown from 'react-markdown'
import Button from 'components/Button/Button'
import { shell } from 'electron'

const WAIT_DURATION = 4000

const getDownloadUrl = latestReleaseInfo => {
  return latestReleaseInfo
    ?.get('assets')
    ?.filter(a => {
      const file = a.get('name')
      const fileExtension = path.extname(file)

      if (os === 'mac' && fileExtension === '.dmg') {
        return true
      } else if (os === 'win' && fileExtension === '.exe') {
        return true
      } else if (os === 'linux' && fileExtension === '.deb') {
        return true
      }

      return false
    })
    ?.first()
    ?.get('browser_download_url')
}

const Update = ({
  hasNewRelease,
  latestReleaseInfo
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, WAIT_DURATION)
  }, [])

  if (!hasNewRelease) {
    return null
  }

  const handleBtnDownloadClick = () => {
    shell.openExternal(downloadUrl)
  }

  const handleBtnSkipDownloadClick = () => {
    setIsVisible(false)
  }

  const tagName = latestReleaseInfo.get('tag_name')
  const downloadUrl = getDownloadUrl(latestReleaseInfo)

  if (!downloadUrl) {
    return null
  }

  const body = latestReleaseInfo.get('body')

  return (
    <div
      className={cx(styles.component, {
        [styles.isVisible]: isVisible
      })}
    >
      <div className={styles.arrow} />
      <div className={styles.label}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            Update available
          </div>
          <div className={styles.headerVersion}>
            {tagName}
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyHeader}>
            <Button
              onClick={handleBtnDownloadClick}
              size='lg'
              className={styles.btnDownload}
              variant='primary'
            >
              Download new version {tagName}
            </Button>
            <Button
              onClick={handleBtnSkipDownloadClick}
              size='lg'
              className={styles.btnSkip}
              variant='minimal'
            >
              Skip this version
            </Button>
          </div>
          <div className={styles.changes}>
            <div className={styles.changesTitle}>
              Changes:
            </div>
            <div className={styles.changesContent}>
              <Markdown source={body} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update
