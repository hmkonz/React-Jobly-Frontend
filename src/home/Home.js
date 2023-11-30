import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Home.css";

function Home() {
  // destructure 'currentUser' from UserContext.Provider value declared in App component
  const { currentUser } = useContext(UserContext);
  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="title">Jobly</h1>
        <p className="header">All the jobs in one, convenient place!</p>
        {/* if piece of state 'currentUser' (kept track of in App component) is not null (user is logged in) show Welcome Back message; otherwise, show login and signup links in the nav bar */}
        {currentUser ? (
          <h2 className="welcome-back-msg">
            Welcome Back {currentUser.firstName || currentUser.username}!
          </h2>
        ) : (
          <p className="HomePage-buttons">
            <Link
              className="HomePage-btn btn-primary font-weight-bold mr-3"
              to="/login"
            >
              Log in
            </Link>
            <Link
              className="HomePage-btn btn-primary font-weight-bold"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
