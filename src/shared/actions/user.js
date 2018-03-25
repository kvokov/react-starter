import api from '../helpers/api'

export const USER_SET_LOADING = 'USER_SET_LOADING'

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR'

export const USER_REQUEST_RESTORE_PASSWORD_SUCCESS = 'USER_REQUEST_RESTORE_PASSWORD_SUCCESS'
export const USER_REQUEST_RESTORE_PASSWORD_ERROR = 'USER_REQUEST_RESTORE_PASSWORD_ERROR'

export const USER_RESET_PROCESSING = 'USER_RESET_PROCESSING'

export const USER_SET_TOKEN = 'USER_SET_TOKEN'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'

export const USER_LOGOUT = 'USER_LOGOUT'

export const setLoading = payload => ({ type: USER_SET_LOADING, payload })
export const resetUserProcessing = () => ({ type: USER_RESET_PROCESSING })

export const registerUserSuccess = payload => ({ type: USER_REGISTER_SUCCESS, payload })
export const registerUserError = payload => ({ type: USER_REGISTER_ERROR, payload })
export const registerUser = payload => (dispatch) => {
  dispatch(setLoading(true))
  api('/v1/users', { method: 'post', body: payload })
    .then(data => dispatch(registerUserSuccess(data)))
    .catch(error => dispatch(registerUserError(error)))
}

export const setAccessToken = payload => ({ type: USER_SET_TOKEN, payload })
export const loginUserError = payload => ({ type: USER_LOGIN_ERROR, payload })
export const loginUser = payload => (dispatch) => {
  dispatch(setLoading(true))
  api('/v1/auth/token', { method: 'post', body: payload })
    .then(data => dispatch(setAccessToken(data)))
    .catch(error => dispatch(loginUserError(error)))
}

export const requestRestorePasswordSuccess = payload => ({ type: USER_REQUEST_RESTORE_PASSWORD_SUCCESS, payload })
export const requestRestorePasswordError = payload => ({ type: USER_REQUEST_RESTORE_PASSWORD_ERROR, payload })
export const requestRestorePassword = payload => (dispatch) => {
  dispatch(setLoading(true))
  api('/v1/auth/request-reset-password', { method: 'post', body: payload })
    .then(data => dispatch(requestRestorePasswordSuccess(data)))
    .catch(error => dispatch(requestRestorePasswordError(error)))
}

export const logoutUser = () => ({ type: USER_LOGOUT })
