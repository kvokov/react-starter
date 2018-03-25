import { COOKIE_GET, COOKIE_SET, COOKIE_DELETE } from '../actions/cookie'

// eslint-disable-next-line no-unused-vars
export default cookieProvider => store => next => (action) => {
  if (action.type === COOKIE_GET) {
    return cookieProvider.get(action.payload)
  } else if (action.type === COOKIE_SET) {
    const { name, value, options } = action.payload
    const opts = {
      path: '/',
      ...options,
    }
    return cookieProvider.set(name, value, opts)
  } else if (action.type === COOKIE_DELETE) {
    return cookieProvider.remove(action.payload, { path: '/' })
  }
  return next(action)
}
