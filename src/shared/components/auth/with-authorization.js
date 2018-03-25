import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { LOGIN_PATH } from '../../routes'
import { isLoggedSelector } from '../../selectors/user'

const WithAuthorizationHoc = (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const { isLogged } = props
    if (isLogged) {
      return <WrappedComponent {...props} />
    }
    return <Redirect to={LOGIN_PATH} />
  }

  WithAuthorization.propTypes = {
    isLogged: PropTypes.bool.isRequired,
  }

  const mapStateToProps = state => ({
    isLogged: isLoggedSelector(state),
  })

  return connect(mapStateToProps)(WithAuthorization)
}

export default WithAuthorizationHoc
