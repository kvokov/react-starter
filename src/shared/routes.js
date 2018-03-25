import App from './components/app'

import Landing from './components/landing'

import Auth from './components/auth'
import Login from './components/auth/login'
import Register from './components/auth/register'
import RestorePassword from './components/auth/restore-password'
import WithAuthorization from './components/auth/with-authorization'

import Dashboard from './components/dashboard'

import NotFound from './components/not-found'

// Routes ---------------------------------------------------------------------

export const ROOT_PATH = '/'

export const AUTH_PATH = '/auth/:slug'
export const LOGIN_PATH = '/auth/login'
export const REGISTER_PATH = '/auth/register'
export const RESTORE_PASSWORD_PATH = '/auth/restore-password'

export const DASHBOARD_PATH = '/dashboard'

//-----------------------------------------------------------------------------

const authRoutes = {
  path: AUTH_PATH,
  component: Auth,
  routes: [
    {
      path: LOGIN_PATH,
      exact: true,
      component: Login,
    },
    {
      path: REGISTER_PATH,
      exact: true,
      component: Register,
    },
    {
      path: RESTORE_PASSWORD_PATH,
      exact: true,
      component: RestorePassword,
    },
  ],
}

const privateRoutes = {
  path: DASHBOARD_PATH,
  component: WithAuthorization(Dashboard),
}


const routes = [
  {
    component: App,
    routes: [
      {
        path: ROOT_PATH,
        exact: true,
        component: Landing,
      },
      privateRoutes,
      authRoutes,
      { component: NotFound },
    ],
  },
]

export default routes
