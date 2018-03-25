import React from 'react'
import { Spin } from 'antd'
import { fullHeight } from '../../helpers/common-styles'

const styles = {
  container: {
    ...fullHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
  },
}

const Splash = () => (
  <div style={styles.container}>
    <Spin size="large" />
  </div>
)

export default Splash
