import React from 'react'
import styles from './AnimatedView.scss'

const AnimatedView = ({
  component: Component,
  style,
  ...props
}) => {
  return (
    <div
      style={style}
      className={styles.component}>
      <Component {...props} />
    </div>
  )
}

export default AnimatedView
