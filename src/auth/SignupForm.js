import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "./SignupForm.css";

function SignupForm({ signup }) {
  //initialize piece of state object ‘formInputData’ with key:value pairs. username, password, firstName, lastName and email are the keys and the values are empty strings
  const [formInputData, setFormInputData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  // Initialize piece of state 'formErrors' (error message if 'signin' function is not successful) to an empty array
  const [formErrors, setFormErrors] = useState([]);

  // deconstruct userame, password, firstName, lastName, email from formInputData object
  const { username, password, firstName, lastName, email } = formInputData;

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

  // when form is submitted, this function executes the 'signup' function (defined in the App component) and if property 'result.success' is true (if signup function was successful) then redirect to the homepage; otherwise update piece of state 'formErrors' to result.errors
  async function handleSubmit(event) {
    event.preventDefault();
    // 'signup' function accepts piece of state 'formInputData and updates piece of state 'token' with what's returned from the backend route POST request `auth/register`
    let result = await signup(formInputData);
    // if signup is successful, 'success' property, set to true, is returned from the 'signup' function
    if (result.success) {
      // redirect to homepage
      history.push("/");
    } else {
      // if signup was not successful ('success' property, set to false), set piece of state 'formErrors' to result.errors
      setFormErrors(result.errors);
    }
  }

  return (
    <div className="SignupForm">
      <h1 className="signup-header"> Sign Up</h1>
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
        <div>
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>
        <div>
          <label className="label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>
        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}

        <button className="signup-btn">Submit</button>
      </form>
    </div>
  );
}
export default SignupForm;
