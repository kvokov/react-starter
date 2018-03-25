import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { isProd } from './helpers/utils'
import rootReducer from './reducers'
import * as middleware from './middleware'

// eslint-disable-next-line
const composeEnhancers = ((isProd || typeof window !== 'object') ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

function configureStore(cookieProvider, history, state) {
  return createStore(
    rootReducer,
    state,
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
      middleware.cookie(cookieProvider),
      thunkMiddleware,
    )),
  )
}

export default configureStore
