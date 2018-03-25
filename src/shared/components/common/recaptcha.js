import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleRecaptcha from 'react-google-recaptcha'
import { RECAPTCHA_KEY } from '../../config'

class Recaptcha extends Component {
  handleChange = (value) => {
    this.props.onChange(value)
  }

  render() {
    return (<GoogleRecaptcha sitekey={RECAPTCHA_KEY} onChange={this.handleChange} />)
  }
}

Recaptcha.propTypes = {
  onChange: PropTypes.func,
}

Recaptcha.defaultProps = {
  onChange: () => ({}),
}

export default Recaptcha
