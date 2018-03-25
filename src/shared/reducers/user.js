import { Map, fromJS } from 'immutable'
import {
  USER_SET_LOADING,
  USER_RESET_PROCESSING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_SET_TOKEN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
} from '../actions/user'

const initialState = Map({
  loading: false,
  success: false,
  error: null,
  accessToken: null,
  loggedUser: null,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_RESET_PROCESSING:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', null)
    case USER_SET_LOADING:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', null)
    case USER_REGISTER_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
    case USER_REGISTER_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.payload))
    case USER_SET_TOKEN:
      return state
        .set('loading', false)
        .set('success', true)
        .set('error', null)
        .set('accessToken', action.payload.access_token)
    case USER_LOGIN_ERROR:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', fromJS(action.payload))
    case USER_LOGOUT:
      return initialState
    default:
      return state
  }
}
