import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable'
import { CookiesProvider, Cookies } from 'react-cookie'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import configureStore from '../shared/store'
import Router from '../shared/components/router'

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)
const history = createBrowserHistory()
// eslint-disable-next-line no-underscore-dangle
const store = configureStore(new Cookies(), history, fromJS(window.__PRELOADED_STATE__))
delete window.__PRELOADED_STATE__ // eslint-disable-line no-underscore-dangle

const wrapApp = (Component, reduxStore) => (
  <Provider store={reduxStore}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <CookiesProvider>
          <Component />
        </CookiesProvider>
      </AppContainer>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.hydrate(wrapApp(Router, store), rootEl)

if (module.hot) {
  module.hot.accept('../shared/components/router', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/components/router').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
