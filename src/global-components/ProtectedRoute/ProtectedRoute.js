import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../auth/AuthService";

const ProtectedRoute = ({
  component: Component,
  name,
  setDashboard,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (AuthService.getCurrentUser()) {
          if (
            (AuthService.getCurrentUser().role_id !== "administrator" &&
              name === "dashboard") ||
            (AuthService.getCurrentUser().role_id !== "teacher" &&
              name === "createcourse") ||
            (AuthService.getCurrentUser().role_id !== "student" &&
              name === "lessons")
          ) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            );
          } else if (
            AuthService.getCurrentUser().role_id === "administrator" &&
            name === "dashboard"
          ) {
            return <Component {...props} setDashboard={setDashboard} />;
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
