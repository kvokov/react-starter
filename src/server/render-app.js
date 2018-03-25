import Helmet from 'react-helmet'
import { APP_CONTAINER_ID, STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/helpers/utils'

/* eslint-disable indent */
const renderApp = (appHtml, store) => {
  const assetsPath = isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}`
  const head = Helmet.rewind()
  return (
    `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      ${head.title}
      ${head.meta}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="icon" href="${assetsPath}/img/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="${assetsPath}/css/bundle.css">
    </head>
    <body>
      <div id="${APP_CONTAINER_ID}">${appHtml}</div>
      <script>
        window.__LOCALE__ = '${'en'}';
        window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())};
      </script>
      <script crossorigin src="${assetsPath}/js/bundle.js"></script>
    </body>
  </html>`
  )
}
/* eslint-enable indent */

export default renderApp
