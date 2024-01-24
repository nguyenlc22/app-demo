// import libs
import React from 'react'
import { lazy } from 'react'

// import components
import Loadable from '@src/common/components/Loadable'

// define pages with lazy loader
const Main = Loadable(lazy(() => import('@src/application/auth/main')))
const Register = Loadable(lazy(() => import('@src/application/auth/pages/Register')))
const Login = Loadable(lazy(() => import('@src/application/auth/pages/Login')))

// Initial authentication routes
const AuthRoutes = {
  path: '/',
  element: '',
  children: [
    { path: 'auth/register', element: <Register /> },
    { path: 'auth/login', element: <Login /> }
  ]
}

export default AuthRoutes
