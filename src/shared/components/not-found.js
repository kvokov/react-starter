import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import Message from './common/message'


class NotFound extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape().isRequired,
  }

  componentWillMount() {
    const { router } = this.context
    if (router.staticContext) {
      router.staticContext.statusCode = 404
    }
  }

  render() {
    return (
      <Row>
        <Col xs={12} offset={6}>
          <Message
            message="404"
            description="Page not Found"
            type="error"
            showIcon
          />
        </Col>
      </Row>
    )
  }
}


export default NotFound
