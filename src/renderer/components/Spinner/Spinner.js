import React from 'react'
import styles from './Spinner.scss'
import cx from 'classnames'
import PropTypes from 'prop-types'

const Spinner = ({
  primary,
  className
}) => {
  return (
    <svg
      className={cx(styles.component, {
        [styles.primary]: primary,
        [className]: className
      })}
      width='38'
      height='38'
      viewBox='0 0 38 38'
    >
      <defs>
        <linearGradient
          x1='8.042%'
          y1='0%'
          x2='65.682%'
          y2='23.865%'
          id='a'
        >
          <stop
            stopColor='currentColor'
            stopOpacity='0'
            offset='0%'
          />
          <stop
            stopColor='currentColor'
            stopOpacity='.631'
            offset='63.146%'
          />
          <stop
            stopColor='currentColor'
            offset='100%'
          />
        </linearGradient>
      </defs>
      <g
        fill='none'
        fillRule='evenodd'
      >
        <g transform='translate(1 1)'>
          <path
            d='M36 18c0-9.94-8.06-18-18-18'
            id='Oval-2'
            stroke='url(#a)'
            strokeWidth='2'
          />
          <circle
            fill='currentColor'
            cx='36'
            cy='18'
            r='1'
          />
        </g>
      </g>
    </svg>
  )
}

Spinner.propTypes = {
  primary: PropTypes.bool
}

export default Spinner
