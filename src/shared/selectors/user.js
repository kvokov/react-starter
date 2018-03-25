import { createSelector } from 'reselect'

export const accessTokenSelector = state => state.getIn(['user', 'accessToken'])

export const isLoggedSelector = createSelector([
  accessTokenSelector,
], accessToken => !!accessToken)
