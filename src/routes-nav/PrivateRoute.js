import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Component for private routes (only can be rendered when user is logged in)
 *
 * In Routes component, use <PrivateRoute ...> instead of <Route ...> for those components that require user to be logged in. PrivateRoute component will check if there is a valid current user and only continues to the route if so. If no user is logged in, redirects to login form.
 */

function PrivateRoute({ exact, path, children }) {
  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);

  // if there is no currentUser (user has not logged in), redirect to login page
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
