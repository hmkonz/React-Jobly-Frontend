import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Routes.css";

// import components
import Home from "../home/Home";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import ProfileForm from "../profile/ProfileForm";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Some of the site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route results in a friendly message asking user to click one of the links in the navBar
 */

function Routes({ signup, login }) {
  return (
    <div className="Routes">
      <Switch>
        {/* Route renders Home component when path exactly matches "/" */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* Route renders SigninForm component when path exactly matches "/signin" */}
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        {/* Route renders LoginForm component when path exactly matches "/login" (with 'login' function defined in App component passed in as a prop) */}
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        {/* Route renders PrivateRoute CompanyList component when path exactly matches "/companies" and user is logged in */}
        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>

        {/* Route renders PrivateRoute CompanyDetail component when path matches "/company/:handle" and user is logged in */}
        <PrivateRoute path="/companies/:handle">
          <CompanyDetail />
        </PrivateRoute>

        {/* Route renders PrivateRoute JobList component when path matches "/jobs" and user is logged in */}
        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>

        {/* Route renders PrivateRoute ProfileForm component when path exactly matches "/profile" and user is logged in */}
        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>

        {/* if a user tries to go to a link that doesn’t work, this friendly message will show up */}
        <Route>
          <div>
            <p className="errorHandler1">
              Hmmm. I can't seem to find what you want.
            </p>
            <p className="errorHandler2">
              Please click on one of the links above.
            </p>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
export default Routes;
