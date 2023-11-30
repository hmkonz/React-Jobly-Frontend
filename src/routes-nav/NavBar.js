import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import { Nav } from "reactstrap";
import UserContext from "../auth/UserContext";

// logout() function, defined in App component, is passed in as a prop which handles site-wide logout by resetting pieces of state 'currentUser' and 'token' to null
function NavBar({ logout }) {
  // deconstruct 'currentUser' from context value of UserContext declared in App component
  const { currentUser } = useContext(UserContext);

  function LoggedInUser() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function LoggedOutUser() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <Nav className="navBar navbar-expand-md">
      <NavLink className="navbar-brand" exact to="/">
        Jobly
      </NavLink>
      {currentUser ? <LoggedInUser /> : <LoggedOutUser />}
    </Nav>
  );
}
export default NavBar;
