import React from 'react'
import styles from './Header.scss'
import LogoSmall from './images/LogoSmall.svg'
import Icon from 'components/Icon/Icon'
import Folder from 'icons/Folder.svg'
import { shell } from 'electron'
import { connect } from 'react-redux'

import {
  getDownloadsDir,
  getHasNewRelease,
  getLatestReleaseInfo
} from 'selectors/settings'

import Update from './components/Update/Update'

const Header = ({
  downloadsDir,
  hasNewRelease,
  latestReleaseInfo
}) => {
  const handleDownloadsFolderClick = () => {
    shell.openItem(downloadsDir)
  }

  return (
    <div className={styles.component}>
      <img
        className={styles.logo}
        src={LogoSmall}
      />
      <Update
        hasNewRelease={hasNewRelease}
        latestReleaseInfo={latestReleaseInfo}
      />
      <button
        onClick={handleDownloadsFolderClick}
        className={styles.btnDownloadsFolder}
      >
        <Icon
          className={styles.downloadsFolderIcon}
          glyph={Folder}
        />
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  downloadsDir: getDownloadsDir(state),
  hasNewRelease: getHasNewRelease(state),
  latestReleaseInfo: getLatestReleaseInfo(state)
})

const mapActionsToProps = null

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header)
