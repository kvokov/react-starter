import { Map } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = Map({
  location: null,
})

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({ location: action.payload })
  }
  return state
}
