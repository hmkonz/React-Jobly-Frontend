import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes.js";
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage to be remembered when re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This is the way to tell if someone
 *   is logged in. This is passed around via 'context' throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {
  // set pieces of state to initial values
  const [infoLoaded, setInfoLoaded] = useState(false);
  // initialize applicationIds to an empty Set so can use the 'has' method below
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  // useEffect will make an API call everytime the token value changes
  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        // if user has a token:
        if (token) {
          try {
            // deconstruct 'username' from piece of state 'token' (jwt.token() returns an object with the user's information, captured when logging in - the payload)
            let { username } = jwt.decode(token);
            // store the token on the JoblyApi class so can use it to call the API.
            JoblyApi.token = token;
            // assign 'currentUser' to the result of the API call to get the current user with 'username' assigned to the token passed in as a prop
            let currentUser = await JoblyApi.getCurrentUser(username);
            // update piece of state 'currentUser' with the results of the API call
            setCurrentUser(currentUser);
            // if user does not have a token, show the error message and set piece of state 'currentUser' to null
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        // Once user data is fetched or if user does not have a token, change piece of state 'infoLoaded' to true to stop the spinner (LoadingSpinner component will not execute when infoLoaded=true)
        setInfoLoaded(true);
      }

      // set piece of state 'infoLoaded' to false while async function 'getCurrentUser' runs (LoadingSpinner component will execute when infoLoaded=false)
      // once the data is fetched (or even if an error happens), 'infoLoaded' will be set back to false to control the spinner
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout. */
  function logout() {
    // when logout, pieces of state 'currentUser' and 'token' are reset to null
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs users in (sets token) upon signup.
   *
   */
  async function signup(signupData) {
    try {
      // make API call to signup method and assign response to piece of state 'token'
      let token = await JoblyApi.signup(signupData);
      // update piece of state 'token' with the API response
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login  */
  async function login(loginData) {
    try {
      // make API call to login method and assign response to piece of state 'token'
      let token = await JoblyApi.login(loginData);
      // update piece of state 'token' with the API response
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    // The has() method of Set (on piece of state "applicationIds") returns a boolean indicating whether an element with the job 'id' passed in to this function exists in this set or not
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    // if the function 'hasAppliedToJob' with a specific job id passed in returns true, then do nothing; otherwise, make API call with currentUser.username and job 'id' passed in as props
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    // update piece of state 'applicationIds' to a new Set that includes everything that was already in the Set 'applicationsIds' as well as the job 'id' passed in to this function
    setApplicationIds(new Set([...applicationIds, id]));
  }

  // if piece of state 'infoLoaded' is false, render the LoadingSpinner component to show Loading ...
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      {/* wrap UserContext.Provider around all routes (which includes their children) that need access to context value (value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}) */}
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <div className="App">
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
