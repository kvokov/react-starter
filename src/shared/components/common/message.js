import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'
import { blockMarginBottom } from '../../helpers/common-styles'

const Message = ({
  type,
  message,
  description,
  showIcon,
  closable,
}) => (
  message || description ? (
    <div style={blockMarginBottom}>
      <Alert
        message={message}
        description={description}
        type={type}
        showIcon={showIcon}
        closable={closable}
      />
    </div>
  ) : null
)

Message.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
  message: PropTypes.string,
  description: PropTypes.string,
  showIcon: PropTypes.bool,
  closable: PropTypes.bool,
}

Message.defaultProps = {
  message: '',
  description: '',
  showIcon: false,
  closable: false,
}

export default Message
