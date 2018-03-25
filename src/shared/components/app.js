import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { renderRoutes } from 'react-router-config'
import { APP_NAME } from '../config'

const App = ({ route }) => (
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    {renderRoutes(route.routes)}
  </div>
)

App.propTypes = {
  route: PropTypes.shape({}).isRequired,
}

export default App
