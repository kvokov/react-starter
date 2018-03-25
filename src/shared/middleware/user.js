import {
  USER_SET_TOKEN,
  USER_LOGOUT,
  USER_LOGIN_ERROR,
  logoutUser,
} from '../actions/user'
import { cookiesSet, cookiesDelete } from '../actions/cookie'
import { ACCESS_TOKEN_COOKIE } from '../config'

// eslint-disable-next-line no-unused-vars
export default store => next => (action) => {
  switch (action.type) {
    case USER_SET_TOKEN:
      store.dispatch(cookiesSet(ACCESS_TOKEN_COOKIE, action.payload.access_token))
      return next(action)
    case USER_LOGIN_ERROR:
      store.dispatch(logoutUser())
      return next(action)
    case USER_LOGOUT:
      next(action)
      return store.dispatch(cookiesDelete(ACCESS_TOKEN_COOKIE))
    default:
      return next(action)
  }
}
