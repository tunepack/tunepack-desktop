import React from 'react'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import { getIsVisible as getIsLoadingScreenVisible } from 'selectors/loadingScreen'
import { toggle as toggleLoadingScreen } from 'actions/loadingScreen'
import { connect } from 'react-redux'
import LoadingScreen from 'components/LoadingScreen/LoadingScreen'
import {
  getIsInitialized
} from 'selectors/settings'
import styles from './Layout.scss'

class Layout extends React.Component {
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
    const { isLoadingScreenVisible } = this.props

    return (
      <>
        <LoadingScreen isVisible={isLoadingScreenVisible} />
        <Header />
        <div className={styles.content}>
          {this.content}
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isInitialized: getIsInitialized(state),
    isLoadingScreenVisible: getIsLoadingScreenVisible(state)
  }
}

const mapActionsToProps = {
  toggleLoadingScreen
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Layout)
