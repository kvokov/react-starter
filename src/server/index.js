import express from 'express'
import compression from 'compression'
import path from 'path'
import cookieMiddleware from 'universal-cookie-express'
import 'isomorphic-fetch'
import { STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/helpers/utils'
import ssr from './ssr'

const app = express()

app.use(compression())
app.use(cookieMiddleware())

app.use(STATIC_PATH, express.static(path.join(__dirname, '../../public')))

app.get('*', ssr)

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`
-------------------------------------------------------------------------------
Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development).\nKeep "yarn serve" running in an other terminal'}.
-------------------------------------------------------------------------------
`)
})
