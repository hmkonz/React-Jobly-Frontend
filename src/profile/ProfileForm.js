import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./ProfileForm.css";

/** Profile editing form.
 *
 * Displays profile form and handles changes to piece of state 'formInputData.
 *
 * Confirmation of a successful save is a simple <Alert>
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
  // initialize piece of 'state currentUser' to the value of context (defined in App component).context.value={ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }
  const { currentUser, setCurrentUser } = useContext(UserContext);
  //initialize piece of state object ‘formInputData’ with key:value pairs. username, firstName, lastName and email are the keys and the values are those associated with a specific user
  const [formInputData, setFormInputData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  });

  // Initialize piece of state 'formErrors' (error message if 'signin' function is not successful) to an empty array
  const [formErrors, setFormErrors] = useState([]);

  // initialize piece of state "saveConfirmed" to false
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  // when a user makes a change to any of the form inputs, update piece of state 'formInputData' and clear piece of state 'formErrors'
  const handleChange = (event) => {
    // deconstruct name and value from event.target (inputs in form)
    const { name, value } = event.target;
    // update piece of state 'formInputData' with a new object including everything already in 'formInputData' as well as the name:value pair entered in the form input
    setFormInputData((formInputData) => ({ ...formInputData, [name]: value }));
    // clear piece of state 'formErrors' to an empty array after piece of state 'formInputData' has been updated to include what was changed in the form inputs
    setFormErrors([]);
  };

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(event) {
    event.preventDefault();
    // create 'profileData' object from what's in piece of state 'formInputData'
    let profileData = {
      firstName: formInputData.firstName,
      lastName: formInputData.lastName,
      email: formInputData.email,
      password: formInputData.password,
    };

    // set 'username' equal to the username in piece of state 'formInputData'. It is not included in 'profileData' above because 'username' needs to passed in to saveProfile method on JoblyApi class as a prop (below).
    let username = formInputData.username;

    // declare variable 'updatedUser'
    let updatedUser;

    try {
      // call 'saveProfile' method on JoblyApi class with 'username' (formInputData.username) and 'profileData' (defined above) passed in as props and the result of the API call is assigned to 'updatedUser'
      updatedUser = await JoblyApi.saveProfile(username, profileData);
      // if there are any errors, update piece of state 'formErrors' with 'errors'
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    // update piece of state 'formInputData' with what's already in 'formInputData' as well as the cleared 'password' property
    setFormInputData((formInputData) => ({ ...formInputData, password: "" }));
    // reset piece of state 'formErrors' to an empty array
    setFormErrors([]);
    // set piece of state 'saveConfirmed' to true
    setSaveConfirmed(true);

    // update piece of state 'currentUser' with the resulting object of the API call, 'updatedUser'. Since 'currentUser' is included in the 'values' of UserContext.Provider in the App component, 'currentUser' will be updated throughout the site
    setCurrentUser(updatedUser);
  }

  return (
    <div className="ProfileForm">
      <h1> Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formInputData.username}
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
            value={formInputData.firstName}
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
            value={formInputData.lastName}
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
            value={formInputData.email}
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
            value={formInputData.password}
            onChange={handleChange}
            style={{ width: "275px" }}
          />
        </div>

        {/* if piece of state 'formErrors' is not an empty array, render the Alert component with the messages in 'formErrors' passed in as a prop */}
        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}

        {/* if piece of state 'saveConfirmed' is true, render the Alert component with messages "Updated successfully" passed in  */}
        {saveConfirmed ? (
          <Alert type="success" messages={["Updated successfully!"]} />
        ) : null}

        <button className="profile-btn">Save Changes</button>
      </form>
    </div>
  );
}
export default ProfileForm;
