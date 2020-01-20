import React from 'react';
import {Redirect, Route,withRouter} from 'react-router-dom';
// 3.1
let state_of_state = localStorage['appState'];
if (!state_of_state){
  let appState = {
    isLoggedIn: false,
    user: {}
  };
  localStorage['appState'] = JSON.stringify(appState);
}
let state = localStorage['appState'];
let AppState = JSON.parse(state);
// 3.2
const Auth = {
  isLoggedIn: AppState.auth,
  user: AppState
};
// 3.3
const PrivateRoute = ({ layout: Layout,component: Component, path, ...rest }) => (
  <Route
    path={path}
    {...rest}
    render={props => Auth.isLoggedIn ? 
      (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : 
      (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              prevLocation: path,
              error: 'You need to login first!',
            },
          }}
        />
      )
    }
  />);

//export default PrivateRoute;
export default withRouter(PrivateRoute);
