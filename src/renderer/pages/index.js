import React from 'react'
import { Route } from 'react-router'
import * as Routes from 'src/shared/constants/Routes'
import Layout from 'components/Layout/Layout'
import AnimatedSwitch from 'components/AnimatedSwitch/AnimatedSwitch'

import Search from './Search'
import Settings from './Settings'
import Downloads from './Downloads'

export default () => {
  return (
    <Layout>
      <AnimatedSwitch>
        <Route
          exact
          path={Routes.SEARCH}
          component={Search}
        />
        <Route
          exact
          path={Routes.SEARCH}
          component={Search}
        />
        <Route
          exact
          path={Routes.DOWNLOADS}
          component={Downloads}
        />
        <Route
          exact
          path={Routes.SETTINGS}
          component={Settings}
        />
      </AnimatedSwitch>
    </Layout>
  )
}
