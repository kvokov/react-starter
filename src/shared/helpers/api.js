import qs from 'query-string'
import { API_URL } from '../config'
import { getAccessToken } from '../helpers/utils'

/**
 * Parses the JSON returned by a network request
 * @param  {object} response  A response from a network request
 * @return {object}           The parsed JSON, status from the response
 */
function parseJSON(response) {
  return new Promise(resolve => response.json()
    .then(json => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })))
}

/**
 * Requests a URL, returning a promise
 * @param  {string} uri       The API URI we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {Promise}          The request promise
 */
export default function request(uri, options = {}) {
  const opts = {
    headers: {
      Accept: 'application/json',
      'User-Agent': navigator.userAgent,
    },
    ...options,
    method: (options.method ? options.method.toUpperCase() : 'GET'),
  }
  let url = `${API_URL}`

  const token = getAccessToken()
  if (token) {
    opts.headers.Auth = `Bearer ${token}`
  }

  // TODO: improve url formation
  if (opts.body) {
    if (opts.method === 'GET' || opts.method === 'DELETE') {
      url += `${uri}${!uri.includes('?') ? '?' : '&'}${qs.stringify(opts.body)}`
      delete opts.body
    } else if (typeof opts.body === 'object') {
      url += `${uri}`
      opts.body = JSON.stringify(opts.body)
    }
  } else {
    url += `${uri}`
  }

  return new Promise((resolve, reject) => {
    fetch(url, opts)
      .then(parseJSON)
      .then(response => (response.ok ? resolve(response.json) : reject(response.json)))
      .catch(() => reject({ message: 'Network Error' })) // eslint-disable-line prefer-promise-reject-errors
  })
}
