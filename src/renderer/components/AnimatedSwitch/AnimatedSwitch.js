import React from 'react'
import { spring, AnimatedSwitch as DepAnimatedSwitch } from 'react-router-transition'
import styles from './AnimatedSwitch.scss'

const mapStyles = styles => {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  }
}

const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    scale: 1.2,
    opacity: 0
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8)
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1)
  }
}

function bounce (val) {
  return spring(val, {
    stiffness: 330,
    damping: 22
  })
}

const AnimatedSwitch = ({ children }) => {
  return (
    <DepAnimatedSwitch
      className={styles.switch}
      atEnter={bounceTransition.atEnter}
      atLeave={bounceTransition.atLeave}
      atActive={bounceTransition.atActive}
      mapStyles={mapStyles}
    >
      {children}
    </DepAnimatedSwitch>
  )
}

export default AnimatedSwitch
