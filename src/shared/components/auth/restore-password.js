import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon, Form, Input } from 'antd'
import { fullWidth } from '../../helpers/common-styles'
import { requestRestorePassword, resetUserProcessing } from '../../actions/user'
import Message from '../common/message'

const styles = {
  label: {
    textAlign: 'center',
    marginBottom: 24,
  },
}

class RestorePassword extends Component {
  componentWillUnmount() {
    this.props.resetUserProcessing()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { validateFields } = this.props.form
    validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line no-console
        this.props.requestRestorePassword(values)
      }
    })
  }

  render() {
    const { userModel } = this.props
    const { getFieldDecorator } = this.props.form

    if (userModel.get('success')) {
      return (
        <Message
          type="success"
          message="Success"
          description="Follow the instructions in the email to reset your password"
        />
      )
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <p style={styles.label}>
          Enter your email address and we will send you a link to reset your password.
        </p>
        <Form.Item hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please input your email' },
              { type: 'email', message: 'Invalid email format' },
            ],
          })(<Input placeholder="name@example.com" prefix={<Icon type="mail" />} />)}
        </Form.Item>
        <Button htmlType="submit" type="primary" size="large" style={fullWidth}>
          Send
        </Button>
      </Form>
    )
  }
}

RestorePassword.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
  userModel: PropTypes.shape({
    get: PropTypes.func,
  }).isRequired,
  requestRestorePassword: PropTypes.func.isRequired,
  resetUserProcessing: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userModel: state.get('user'),
})

export default connect(mapStateToProps, { requestRestorePassword, resetUserProcessing })(Form.create()(RestorePassword))
