import React from 'react'
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ auth, children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;
