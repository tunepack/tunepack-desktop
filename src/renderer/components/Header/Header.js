import React from 'react'
import styles from './Header.scss'
import LogoSmall from './images/LogoSmall.svg'

const Header = () => {
  return (
    <div className={styles.component}>
      <img
        className={styles.logo}
        src={LogoSmall}
      />
    </div>
  )
}

export default Header
