import React from 'react'
import { Row, Col } from 'antd'
import Message from './common/message'


const NotFound = () => (
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


export default NotFound
