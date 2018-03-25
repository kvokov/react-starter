import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { CookiesProvider } from 'react-cookie'
import { createMemoryHistory } from 'history'
import { matchRoutes } from 'react-router-config'
import renderApp from './render-app'
import configureStore from '../shared/store'
import routes from '../shared/routes'
import Router from '../shared/components/router'
import { ACCESS_TOKEN_COOKIE } from '../shared/config'

const getPreloadMethod = (component) => {
  let preloadMethod = component.preload
  const decoratedComponent = (component.DecoratedComponent || component.WrappedComponent)
  if (!preloadMethod && decoratedComponent) {
    preloadMethod = decoratedComponent.preload
    if (!preloadMethod) {
      preloadMethod = decoratedComponent.DecoratedComponent && decoratedComponent.DecoratedComponent.preload
    }
  }
  return preloadMethod || (() => null)
}

const loadBranchData = (path, store) => {
  const branch = matchRoutes(routes, path)
  const promises = branch.map(({ route, match }) => getPreloadMethod(route.component)({ match, store }))
  return Promise.all(promises)
}

export default (req, res, next) => {
  global.navigator = { userAgent: req.get('user-agent') }
  global.accessToken = req.universalCookies.get(ACCESS_TOKEN_COOKIE)

  const history = createMemoryHistory()
  const store = configureStore(req.universalCookies, history)
  return loadBranchData(req.path, store)
    .then(() => {
      const routerContext = {}
      const appComponent = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            <CookiesProvider cookies={req.universalCookies}>
              <Router />
            </CookiesProvider>
          </StaticRouter>
        </Provider>
      )
      const appHtml = ReactDOMServer.renderToString(appComponent)

      // routerContext.url will contain the URL to redirect to if a <Redirect> was used
      if (routerContext.url) {
        res.redirect(302, routerContext.url)
      } else {
        res.send(renderApp(appHtml, store))
      }
    })
    .catch(next)
}
