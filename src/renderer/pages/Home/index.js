import React from 'react'
import { Redirect } from 'react-router-dom'
import * as Routes from 'constants/Routes'
import { connect } from 'react-redux'
import { getIsNew } from '../../selectors/settings'

const Home = ({ isNew }) => {
  if (isNew) {
    return <Redirect to={Routes.INTRO} />
  }

  return <Redirect to={Routes.SEARCH} />
}

const mapStateToProps = (state) => {
  return {
    isNew: getIsNew(state)
  }
}

const mapActionsToProps = null

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home)
