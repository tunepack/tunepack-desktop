import React from 'react'
import { Switch, Route } from 'react-router'
import * as Routes from 'constants/Routes'
import Layout from 'components/Layout/Layout'

import Search from './Search'
import Settings from './Settings'

export default () => {
  return (
    <Layout>
      <Switch>
        <Route
          exact
          path={Routes.SEARCH}
          component={Search} />
        <Route
          exact
          path={Routes.SEARCH}
          component={Search} />
        <Route
          exact
          path={Routes.SETTINGS}
          component={Settings} />
      </Switch>
    </Layout>
  )
}
