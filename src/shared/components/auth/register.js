import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, Icon, Form, Input } from 'antd'
import { LOGIN_PATH } from '../../routes'
import Message from '../common/message'
import { fullWidth } from '../../helpers/common-styles'
import { registerUser, resetUserProcessing } from '../../actions/user'
import { formatErrors } from '../../helpers/utils'

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    const { userModel } = this.props
    if (!userModel.get('success') && nextProps.userModel.get('success')) {
      this.redirectTimer = setTimeout(() => (
        this.props.push(LOGIN_PATH)
      ), 5000)
    }
  }

  componentWillUnmount() {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer)
    }
    this.props.resetUserProcessing()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { validateFields } = this.props.form
    validateFields((err, values) => {
      if (!err) {
        this.props.registerUser(values)
      }
    })
  }

  render = () => {
    const { userModel } = this.props
    const { getFieldDecorator } = this.props.form

    if (userModel.get('success')) {
      return (
        <Message
          type="success"
          message="Success"
          description="You are successfully registered. You will be redirected to the login page in a moment"
        />
      )
    }
    return (
      <div>
        {userModel.get('error') && (
          <Message
            type="error"
            message={userModel.getIn(['error', 'message'])}
            description={formatErrors(userModel.getIn(['error', 'errors']))}
          />
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                { required: true },
              ],
            })(<Input placeholder="username" prefix={<Icon type="user" />} />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                { required: true },
                { type: 'email' },
              ],
            })(<Input placeholder="name@example.com" prefix={<Icon type="mail" />} />)}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true },
                { min: 6 },
                {
                  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(.*){6,}$',
                  message: 'password should contains at least one digit and both uppercase and lowercase characters',
                },
              ],
            })(<Input type="password" placeholder="password" prefix={<Icon type="lock" />} />)}
          </Form.Item>
          <Button htmlType="submit" type="primary" size="large" style={fullWidth} loading={userModel.get('loading')}>
            Sign up
          </Button>
        </Form>
      </div>
    )
  }
}

Register.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
  userModel: PropTypes.shape({
    get: PropTypes.func,
  }).isRequired,
  registerUser: PropTypes.func.isRequired,
  resetUserProcessing: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userModel: state.get('user'),
})

export default connect(mapStateToProps, {
  registerUser,
  resetUserProcessing,
  push,
})(Form.create()(Register))
