import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import * as Routes from 'constants/Routes'
import styles from './Nav.scss'
import Icon from 'components/Icon/Icon'
import IconSearch from 'icons/Search.svg'
import IconDownloadCloud from 'icons/DownloadCloudAlt.svg'
import IconCog from 'icons/CogAlt.svg'
import cx from 'classnames'

const links = [{
  label: 'Search',
  to: Routes.SEARCH,
  className: styles.linkSearch,
  icon: (
    <Icon className={styles.linkIcon}
      glyph={IconSearch}
    />
  )
}, {
  label: 'Downloads',
  to: Routes.DOWNLOADS,
  className: styles.linkDownloads,
  icon: (
    <Icon className={styles.linkIcon}
      glyph={IconDownloadCloud}
    />
  )
}, {
  label: 'Settings',
  to: Routes.SETTINGS,
  className: styles.linkSettings,
  icon: (
    <Icon className={styles.linkIcon}
      glyph={IconCog}
    />
  )
}]

const getPathnameClass = pathname => {
  if (pathname === Routes.SETTINGS) {
    return styles.atSettings
  } else if (pathname === Routes.DOWNLOADS) {
    return styles.atDownloads
  } else if (pathname === Routes.SEARCH) {
    return styles.atSearch
  }

  return null
}

const Nav = ({ location }) => {
  const { pathname } = location
  const pathnameClass = getPathnameClass(pathname)

  return (
    <div className={styles.component}>
      <div className={cx(styles.linksContainer, {
        [pathnameClass]: true
      })}
      >
        <div className={styles.links}>
          {links.map(link => {
            return (
              <NavLink
                exact
                key={link.to}
                to={link.to}
                className={cx(styles.link, link.className)}
                activeClassName={styles.linkActive}
              >
                <div className={styles.linkIcon}>
                  {link.icon}
                </div>
                <div className={styles.linkLabel}>
                  {link.label}
                </div>
              </NavLink>
            )
          })}
        </div>
        <div className={styles.linkBackground} />
      </div>
    </div>
  )
}

export default withRouter(Nav)
