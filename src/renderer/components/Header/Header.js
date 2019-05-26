import React from 'react'
import styles from './Header.scss'
import LogoSmall from './images/LogoSmall.svg'
import Icon from 'components/Icon/Icon'
import Folder from 'icons/Folder.svg'
import { shell } from 'electron'
import { connect } from 'react-redux'
import { getDownloadsDir } from 'selectors/settings'

const Header = ({
  downloadsDir
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
  downloadsDir: getDownloadsDir(state)
})

const mapActionsToProps = null

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header)
