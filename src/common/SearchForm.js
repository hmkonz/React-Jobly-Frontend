import React, { useState } from "react";
import "./SearchForm.css";

/**
 *
 * SearchForm is rendered in the CompanyList and JobList components with {search} passed in as a prop.
 *
 * This component renders the search form and calls the `search` function prop that is passed in to the parent components (CompanyList and JobList) to do the searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */
function SearchForm({ search }) {
  // intialize piece of state 'searchInput' to an empty string
  const [searchInput, setSearchInput] = useState("");

  // deconstruct searchName searchInput
  const { searchTerm } = searchInput;

  // when form is submitted, handleSubmit() executes the 'search' function defined in the parent component and resets piece of state 'searchInput"
  function handleSubmit(event) {
    event.preventDefault();
    // take care of accidentally trying to search for just spaces
    // 'search' function accepts trimmed piece of state 'searchInput' as a prop. It makes an api call and reloads companies or or jobs depending on what the searchInput passed in is.
    // .trim() removes the whitespace from the start and end of the string (searchInput)
    search(searchInput.trim() || undefined);
    // reset piece of state 'searchInput' with what was entered in the search form, trimmed.
    setSearchInput(searchInput.trim());
  }

  /** Update form fields */
  function handleChange(event) {
    // deconstruct name and value from event.target (input in form)
    const { value } = event.target;
    // update piece of state 'searchInput' with what was entered in the form
    setSearchInput(value);
  }
  return (
    <div>
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter Search Term ..."
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
