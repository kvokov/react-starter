export const COOKIE_GET = 'COOKIE_GET'
export const COOKIE_SET = 'COOKIE_SET'
export const COOKIE_DELETE = 'COOKIE_DELETE'

export const cookiesGet = name => ({ type: COOKIE_GET, payload: name })

export const cookiesSet = (name, value, options) => ({
  type: COOKIE_SET,
  payload: {
    name,
    value,
    options,
  },
})

export const cookiesDelete = name => ({ type: COOKIE_DELETE, payload: name })
