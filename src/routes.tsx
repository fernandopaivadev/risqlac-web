import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import Login from './components/pages/Login/Login'
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword/ResetPassword'

import User from './components/pages/User/User'
import Users from './components/pages/Users/Users'

import Product from './components/pages/Product/Product'
import Products from './components/pages/Products/Products'

import storage from './services/storage'

const pages: { [key: string]: React.FC<RouteComponentProps> } = {
  Login,
  ForgotPassword,
  ResetPassword,

  User,
  Users,

  Product,
  Products
}

const routes = Object.keys(pages).map(key => ({
  component: key,
  name: `/${key.split(/(?=[A-Z])/).join('-').toLowerCase()}`
}))

const authenticated = storage.read('token') ?? false

const Routes: React.FC = () => <Router>
  <Switch>
    {routes.map((route, index) =>
      <Route
        key={index}
        path={route.name}
        exact component={pages[route.component]}
      />
    )}

    <Redirect to={
      authenticated ?
        '/products'
        :
        '/login'
    } />
  </Switch>
</Router>

export default Routes