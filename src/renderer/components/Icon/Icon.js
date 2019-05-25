import React from 'react'
import styles from './Icon.scss'
import cx from 'classnames'

const Icon = ({ glyph, className }) => {
  return (
    <svg
      className={cx(styles.component, {
        [className]: className
      })}
    >
      <use xlinkHref={glyph} />
    </svg>
  )
}

export default Icon
