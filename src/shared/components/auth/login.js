import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Icon, Form, Input } from 'antd'
import Message from '../common/message'
import Recaptcha from '../common/recaptcha'
import { fullWidth } from '../../helpers/common-styles'
import { RESTORE_PASSWORD_PATH } from '../../routes'
import { loginUser, resetUserProcessing } from '../../actions/user'
import { formatErrors } from '../../helpers/utils'

const styles = {
  bottom: {
    textAlign: 'center',
    marginTop: 24,
    paddingTop: 8,
    borderTop: '1px solid #d9d9d9',
  },
}

class Login extends Component {
  componentWillUnmount = () => {
    this.props.resetUserProcessing()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { validateFields } = this.props.form
    validateFields((err, values) => {
      if (!err) {
        this.props.loginUser(values)
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
          description="You are successfully logged in. You will be redirected to the dashboard in a moment"
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
              ],
            })(<Input type="password" placeholder="password" prefix={<Icon type="lock" />} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('recaptcha', {
              rules: [
                { required: true },
              ],
            })(<Recaptcha />)}
          </Form.Item>
          <Button htmlType="submit" type="primary" size="large" style={fullWidth} loading={userModel.get('loading')}>
            Sign in
          </Button>
          <p style={styles.bottom}>
            <Link to={RESTORE_PASSWORD_PATH}>Forgot password?</Link>
          </p>
        </Form>
      </div>
    )
  }
}

Login.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
  userModel: PropTypes.shape({}).isRequired,
  loginUser: PropTypes.func.isRequired,
  resetUserProcessing: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userModel: state.get('user'),
})

export default connect(mapStateToProps, {
  loginUser,
  resetUserProcessing,
})(Form.create()(Login))
