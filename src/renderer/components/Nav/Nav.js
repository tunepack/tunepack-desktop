import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Routes from 'constants/Routes'
import styles from './Nav.scss'
import Icon from 'components/Icon/Icon'
import IconSearch from 'icons/Search.svg'
import IconDownloadCloud from 'icons/DownloadCloud.svg'
import IconCog from 'icons/Cog.svg'

const links = [{
  label: 'Search',
  to: Routes.SEARCH,
  icon: (
    <Icon className={styles.linkIcon}
      glyph={IconSearch} />
  )
}, {
  label: 'Downloads',
  to: Routes.DOWNLOADS,
  icon: (
    <Icon className={styles.linkIcon}
      glyph={IconDownloadCloud} />
  )
}, {
  label: 'Settings',
  to: Routes.SETTINGS,
  icon: (
    <Icon className={styles.linkIcon}
      glyph={IconCog} />
  )
}]

const Nav = () => {
  return (
    <div className={styles.component}>
      <div className={styles.links}>
        {links.map(link => {
          return (
            <NavLink
              exact
              key={link.to}
              to={link.to}
              className={styles.link}
              activeClassName={styles.linkActive}>
              {link.icon}
              <div className={styles.linkLabel}>
                {link.label}
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Nav
