import React from 'react'
import styles from './IntroView.scss'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import { connect } from 'react-redux'
import { selectDownloadsDir, submit } from '../../actions'
import { getDownloadsDir } from '../../../../selectors/settings'
import ChevronRight from 'icons/ChevronRight.svg'

class IntroView extends React.Component {
  btnChangeClick = () => {
    this.props.selectDownloadsDir()
  }

  btnNextClick = () => {
    this.props.submit()
  }

  render () {
    return (
      <div className={styles.component}>
        <div className={styles.content}>
          <div className={styles.title}>
            Where do you want to store your downloaded music?
          </div>
          <div className={styles.currentDownloadsFolderLocation}>
            {this.props.downloadsDir}
          </div>
          <div className={styles.btnChange}>
            <Button
              size='sm'
              onClick={this.btnChangeClick}>
              Change location
            </Button>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            onClick={this.btnNextClick}
            iconAfter={(
              <Icon
                className={styles.btnNextIconAfter}
                glyph={ChevronRight} />
            )}
            variant='primary'>
            Next
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    downloadsDir: getDownloadsDir(state)
  }
}

const mapActionsToProps = {
  selectDownloadsDir,
  submit
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(IntroView)
