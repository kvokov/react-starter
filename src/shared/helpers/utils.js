import { Map } from 'immutable'
import { Cookies } from 'react-cookie'
import { BROWSER, NODE_ENV, DEFAULT_LOCALE, ACCESS_TOKEN_COOKIE } from '../config'

export const isBrowser = BROWSER

export const isProd = NODE_ENV === 'production'
export const isDev = !isProd

// eslint-disable-next-line
export const getLocale = () => (typeof window !== 'undefined' ? window.__LOCALE__ : DEFAULT_LOCALE)

export const ucfirst = string => (
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`
)

export const formatErrors = (items = Map()) => items.reduce((results, errors, field) => (`${results}${ucfirst(field)}: ${errors.join(', ')}. `), '')

// eslint-disable-next-line no-undef
export const getAccessToken = () => (typeof accessToken !== 'undefined' ? accessToken : new Cookies().get(ACCESS_TOKEN_COOKIE))

export const getWindowSize = () => {
  const width = window.innerWidth
  if (width >= 1600) {
    return 'xxl'
  } else if (width >= 1200) {
    return 'xl'
  } else if (width >= 992) {
    return 'lg'
  } else if (width >= 768) {
    return 'md'
  } else if (width >= 576) {
    return 'sm'
  }
  return 'xs'
}
