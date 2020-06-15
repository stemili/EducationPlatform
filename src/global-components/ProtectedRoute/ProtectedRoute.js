import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../auth/AuthService";

const ProtectedRoute = ({ component: Component, name, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (AuthService.getCurrentUser()) {
          if (
            AuthService.getCurrentUser().role_id !== "administrator" &&
            name === "dashboard"
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            );
          }
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
