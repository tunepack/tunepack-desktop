import React from 'react'
import styles from './ErrorScreen.scss'
import { reload } from '../../actions/app'
import { connect } from 'react-redux'
import { getError } from '../../selectors/app'
import Button from 'components/Button/Button'

const getErrorMessage = message => {
  if (message === 'timeout') {
    return 'Connecting to servers took too long'
  } else if (message === 'no-connection') {
    return 'No connection, please check your internet connection'
  }

  return 'Something has gone wrong'
}

const ErrorScreen = ({
  error,
  reload
}) => {
  const isVisible = !!error

  if (!isVisible) {
    return null
  }

  const handleReloadClick = () => {
    reload()
  }

  return (
    <div className={styles.component}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.title}>
            Oops, something was wrong
          </div>
          <div className={styles.message}>
            {getErrorMessage(error)}
          </div>
          <Button onClick={handleReloadClick}>
            Reload
          </Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  error: getError(state)
})

const mapActionsToProps = {
  reload
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ErrorScreen)
