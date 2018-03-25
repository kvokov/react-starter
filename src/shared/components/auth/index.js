import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Link, Redirect } from 'react-router-dom'
import { Layout, Row, Col, Card, Menu } from 'antd'
import { DASHBOARD_PATH, LOGIN_PATH, REGISTER_PATH } from '../../routes'
import { mainLayoutStyle, fullHeight, blockMarginTop } from '../../helpers/common-styles'
import { COPYRIGHT } from '../../config'
import { isLoggedSelector } from '../../selectors/user'

const { Content, Footer } = Layout

const styles = {
  footer: {
    textAlign: 'center',
    marginTop: -69,
    color: 'rgba(0,0,0,0.4)',
  },
}

const Auth = ({ isLogged, route, match }) => {
  const { slug } = match.params

  if (!isLogged) {
    return (
      <Layout style={mainLayoutStyle}>
        <Content>
          <Row type="flex" align="middle" justify="center" style={fullHeight}>
            <Col xs={20} sm={12} md={12} lg={8} xl={8} xxl={5}>
              <Card>
                <Menu
                  selectedKeys={[slug]}
                  mode="horizontal"
                >
                  <Menu.Item key="login">
                    <Link to={LOGIN_PATH}>Login</Link>
                  </Menu.Item>
                  <Menu.Item key="register">
                    <Link to={REGISTER_PATH}>Register</Link>
                  </Menu.Item>
                </Menu>
                <div style={blockMarginTop}>
                  {renderRoutes(route.routes)}
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={styles.footer}>{COPYRIGHT}</Footer>
      </Layout>
    )
  }

  return (<Redirect to={DASHBOARD_PATH} />)
}

Auth.propTypes = {
  route: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }).isRequired,
  isLogged: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
})

export default connect(mapStateToProps)(Auth)
