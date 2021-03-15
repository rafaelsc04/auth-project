import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";

function authenticated() {
  if (localStorage.jwt) {
    return true;
  } else {
    return false;
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
