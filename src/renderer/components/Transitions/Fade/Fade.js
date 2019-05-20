import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import styles from './Fade.scss'
import cx from 'classnames'

const Fade = ({ in: inProp, duration = 600, children }) => {
  return (
    <Transition
      in={inProp}
      timeout={duration}>
      {state => {
        return (
          <div
            className={cx(styles.component, {
              [styles[`component--${state}`]]: state
            })}>
            {children}
          </div>
        )
      }}
    </Transition>
  )
}

Fade.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  children: PropTypes.node
}

export default Fade
