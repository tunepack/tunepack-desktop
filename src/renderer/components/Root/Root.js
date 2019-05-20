import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Pages from 'pages'

export default class Root extends React.Component {
  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Pages />
        </ConnectedRouter>
      </Provider>
    )
  }
}
