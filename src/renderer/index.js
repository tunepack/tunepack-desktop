import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './index.scss'
import Root from 'components/Root/Root'
import { configureStore, history } from 'utils/configureStore'
import { initialize } from 'actions/settings'
import { initialize as initializeAnalytics } from 'utils/analytics'
import setupNavKeybinds from 'utils/setupNavKeybinds'

initializeAnalytics()

const store = configureStore()
store.dispatch(initialize())

const rootElement = document.getElementById('root')

setupNavKeybinds(window, history)

function renderApp (RootComponent) {
  render(
    <AppContainer>
      <RootComponent
        history={history}
        store={store}
      />
    </AppContainer>,
    rootElement
  )
}

renderApp(Root)

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./components/Root/Root', () => {
      return renderApp(require('./components/Root/Root').default)
    })
  }
}
