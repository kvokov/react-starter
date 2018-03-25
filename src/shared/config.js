if (!process.env.BROWSER) {
  require('dotenv').config({ // eslint-disable-line global-require
    path: require('path').resolve(__dirname, '../.env'), // eslint-disable-line global-require
  })
}


export const BROWSER = process.env.BROWSER
export const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development'
export const WEB_PORT = process.env.WEB_PORT || 3000
export const WDS_PORT = process.env.WDS_PORT || 7000

export const STATIC_PATH = '/assets'

export const API_URL = process.env.API_URL || 'http://localhost'
export const RECAPTCHA_KEY = '6Le-TU4UAAAAAPZs7A5MIB6p6HRdm7slA-xRXyod'

export const APP_CONTAINER_ID = 'app-container'
export const APP_CONTAINER_SELECTOR = `#${APP_CONTAINER_ID}`
export const APP_NAME = 'React Application Starter'
export const COPYRIGHT = `© ${new Date().getFullYear()} Made by DK`

export const DEFAULT_LOCALE = 'en'
export const ACCESS_TOKEN_COOKIE = 'accessToken'
