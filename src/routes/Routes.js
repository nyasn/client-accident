import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { RouteWithLayout } from '../components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from '../views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/listes"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <PrivateRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRoute
        component={UserListView}
        exact
        layout={MainLayout}
        path="/listes"
      />
      <PrivateRoute
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <PrivateRoute
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRoute
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRoute
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <PrivateRoute
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      
      <PrivateRoute
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
