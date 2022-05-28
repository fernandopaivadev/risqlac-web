import React, { ReactElement } from 'react'

import Login from './components/pages/Login/Login'
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword/ResetPassword'

import User from './components/pages/User/User'
import Users from './components/pages/Users/Users'

import Product from './components/pages/Product/Product'
import Products from './components/pages/Products/Products'

import Options from './components/pages/Options/Options'


export default (): ReactElement => {
  const routes: {
    [key: string]: any
  } = {
    '/login': () => <Login />,
    '/options': () => <Options />,
    '/forgot-password': () => <ForgotPassword />,
    '/reset-password': () => <ResetPassword />,
    '/users': () => <Users />,
    '/user': () => <User />,
    '/unit': () => <Product />,
    '/units': () => <Products />,
  }

  const path = location.pathname
  return routes[path] ? routes[path]() : <Login />
}
