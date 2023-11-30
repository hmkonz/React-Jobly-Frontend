import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "./LoginForm.css";

function LoginForm({ login }) {
  //initialize piece of state object ‘formInputData’ with key:value pairs. username and password are the keys and the values are empty strings
  const [formInputData, setFormInputData] = useState({
    username: "",
    password: "",
  });
  // Initialize piece of state 'formErrors' (error message if login function is not successful) to an empty array
  const [formErrors, setFormErrors] = useState([]);

  // deconstruct userame, password from formInputData object
  const { username, password } = formInputData;

  // The 'useHistory' hook gives access to the 'history' object, giving access to several functions to navigate the page (go forward, go backward, redirect to another page, etc)
  const history = useHistory();

  /* update piece of state 'formInputData' */

  // execute this function whenever a user makes a change to any of the form inputs.
  const handleChange = (event) => {
    // deconstruct name and value from event.target (inputs in form)
    const { name, value } = event.target;
    // update piece of state 'formInputData' with a new object including everything already in 'formInputData' as well as the name:value pair entered in form input
    setFormInputData((formInputData) => ({ ...formInputData, [name]: value }));
  };

  // when form is submitted, this function executes the 'login' function (defined in the App component) and if property 'result.success' is true (if 'login' function was successful) then redirect to the homepage; otherwise update piece of state 'formErrors' to result.errors
  async function handleSubmit(event) {
    event.preventDefault();
    // 'login' function accepts piece of state 'formInputData and updates piece of state 'token' with what's returned from the backend route POST request `auth/token'.
    let result = await login(formInputData);
    // if 'login' is successful, 'success' property, set to true, is returned from the 'login' function
    if (result.success) {
      // redirect to homepage
      history.push("/");
    } else {
      // if 'signup' was not successful ('success' property, set to false), set piece of state 'formErrors' to result.errors
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="LoginForm">
      <h1 className="login-header">Please Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>

        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}

        <button className="Login-btn">Submit</button>
      </form>
    </div>
  );
}
export default LoginForm;
