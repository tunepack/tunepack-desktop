import React, { useRef, useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './LoadingScreen.scss'
import { Fade } from 'components/Transitions'
import Wave from 'utils/wave'

let currentWave = null

const LoadingScreen = ({
  isVisible
}) => {
  const [isWaveVisible, setIsWaveVisible] = useState(false)
  const waveRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      if (isVisible === true) {
        setIsWaveVisible(true)

        if (currentWave) {
          return currentWave.start()
        }

        currentWave = new Wave({
          container: waveRef.current,
          autostart: true,
          speed: 0.05,
          amplitude: 0.7,
          color: '#000',
          height: 300
        })
      } else {
        if (!currentWave) {
          return null
        }

        setIsWaveVisible(false)

        setTimeout(() => {
          currentWave.stop()
        }, 600)
      }
    }, 100)
  }, [isVisible])

  return (
    <div className={styles.component}>
      <Fade in={isVisible}>
        <div className={styles.content}>
          <div
            ref={waveRef}
            className={cx(styles.wave, {
              [styles.waveIsVisible]: isWaveVisible
            })} />
        </div>
      </Fade>
    </div>
  )
}

export default LoadingScreen
