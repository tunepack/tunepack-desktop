import React from 'react'
import View from 'components/View/View'
import Title from 'components/Title/Title'
import { connect } from 'react-redux'
import { getDownloads } from '../../../../selectors/downloads'

const DownloadsView = () => {
  return (
    <View
      header={(
        <Title>
          Downloads
        </Title>
      )}
    >
      Work in progress...
    </View>
  )
}

const mapStateToProps = state => ({
  downloads: getDownloads(state)
})

export default connect(
  mapStateToProps
)(DownloadsView)
