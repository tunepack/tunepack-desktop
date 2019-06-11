import React from 'react'
import Header from 'components/Header/Header'
import Nav from 'components/Nav/Nav'
import { connect } from 'react-redux'
import LoadingScreen from 'components/LoadingScreen/LoadingScreen'
import NavBurn from 'components/NavBurn/NavBurn'
import ErrorScreen from 'components/ErrorScreen/ErrorScreen'
import {
  getIsInitialized
} from 'selectors/settings'
import styles from './Layout.scss'
import { getIsLoading } from 'selectors/app'

class Layout extends React.PureComponent {
  get content () {
    const {
      isInitialized,
      children
    } = this.props

    if (!isInitialized) {
      return null
    }

    return (
      <>
        {children}
      </>
    )
  }

  render () {
    const {
      isLoading
    } = this.props

    return (
      <>
        <LoadingScreen
          isVisible={isLoading}
        />
        <ErrorScreen />
        <Header />
        <NavBurn />
        <Nav />
        <div className={styles.content}>
          {this.content}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isInitialized: getIsInitialized(state),
    isLoading: getIsLoading(state)
  }
}

export default connect(
  mapStateToProps
)(Layout)
